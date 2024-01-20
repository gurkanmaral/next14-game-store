
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { checkoutOrder } from '@/actions/order';
import { useCartStore } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';


loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
  alreadyBought:boolean;
  userId?:string;
  games:GameProps[];
}
type GameProps = {
    gameId: string;
    gameImage:string;
    gameTitle:string;
    price:number;

}

const Checkout = ({games,userId,alreadyBought}:CheckoutProps) => {
    const [totalAmount, setTotalAmount] = useState(0);

    const {resetCart} = useCartStore()
  const router = useRouter();

    useEffect(()=>{
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }

    },[]);

    useEffect(() => {
 
        calculateTotalAmount();
      }, [games]);


      const calculateTotalAmount = () => {
        const total = games.reduce((acc, game) => acc + game.price, 0);
        setTotalAmount(total);
      };

    const orders = games.map((game) => ({
        gameTitle: game.gameTitle,
        gameId: game.gameId,
        price: game.price,
        userId: userId,
      }));

     

    const onCheckout = async () => {

      

        try {
          
            if(!userId) {
              router.push("/auth/login")
            }

          await checkoutOrder(orders,totalAmount);
          resetCart();
        } catch (error) {
          console.error('Error during checkout:', error);
        }
      };


  return (
    <form action={onCheckout}>
        <Button disabled={alreadyBought} type='submit' role='link' size="lg" className='w-full bg-emerald-500 text-white hover:bg-emerald-400 shadow-sm shadow-white/15' > 
            {alreadyBought ? "You own this game" : "Buy"}
        </Button>
    </form>
  )
}

export default Checkout