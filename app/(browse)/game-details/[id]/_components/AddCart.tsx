"use client";


import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/redux/store';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { number } from 'zod';

interface AddCartProps {
    price:string;
    gameImage:string;
    gameTitle:string;
    gameId:string
}

const AddCart = ({price,gameImage,gameTitle,
gameId}:AddCartProps) => {

    const {addtoCart,games,removeFromCart} = useCartStore();

    useEffect(()=>{

    },[])

    const numberPrice = parseFloat(price)
console.log(games)
    
    const isAlreadyInCart = games.some((game)=>game.gameId === gameId)

    console.log(isAlreadyInCart)
    const handleCart = () => {

       if(isAlreadyInCart) {
            removeFromCart({
                gameId:gameId,
                gameTitle:gameTitle,
                gameImage:gameImage,
                price:numberPrice,
            })
       }else {
        addtoCart({
            gameId:gameId,
            gameTitle:gameTitle,
            gameImage:gameImage,
            price:numberPrice,
        })
        toast.success("The game added to cart")
       }
    }


  return (
    <div className='col-span-1 flex flex-col gap-5 px-4'>
        <h1 className='text-3xl font-bold'>
                    {price}$
                </h1>
               <Button size="lg" >
                Buy Now
               </Button>
                <Button size="lg" onClick={handleCart} >
                   Add to cart
                </Button>       
                <Button size="sm" onClick={handleCart} >
                    Add to wishlist
                </Button>      
        
    </div>
  )
}

export default AddCart