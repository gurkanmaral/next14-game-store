import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { checkoutOrder } from '@/actions/order';


loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);



const Checkout = ({games,userId}) => {
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(()=>{
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }

        calculateTotalAmount();
    },[]);

    useEffect(() => {
 
        calculateTotalAmount();
      }, [games]);


      const calculateTotalAmount = () => {
        const total = games.reduce((acc, game) => acc + game.price, 0);
        setTotalAmount(total);
      };
    console.log(games)

    const orders = games.map((game) => ({
        gameTitle: game.gameTitle,
        gameId: game.gameId,
        price: game.price,
        userId: userId,
      }));
console.log(orders)

    const onCheckout = async (event) => {
        event.preventDefault(); 
        try {
          await checkoutOrder(orders,totalAmount);
        } catch (error) {
          console.error('Error during checkout:', error);
          // Handle errors as needed
        }
      };


  return (
    <form onSubmit={onCheckout} method="post">
        <Button type='submit' role='link' size="lg" > 
            buy
        </Button>
    </form>
  )
}

export default Checkout