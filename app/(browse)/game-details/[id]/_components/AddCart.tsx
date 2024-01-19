"use client";


import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/lib/redux/store';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { number } from 'zod';
import RatingCard from './RatingCard';

import CheckoutButton from '@/app/(browse)/cart/_components/CheckoutButton';

interface AddCartProps {
    price:string;
    gameImage:string;
    gameTitle:string;
    gameId:string;
    alreadyBought:boolean;
    userId:string;
}

const AddCart = ({price,gameImage,gameTitle,
gameId,alreadyBought,userId}:AddCartProps) => {

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

const game = [
    {
        gameId:gameId,
        gameImage:gameImage,
        gameTitle:gameTitle,
        price:numberPrice,
    }
]
   

  return (
    <div className='col-span-1 flex flex-col gap-5 px-4'>
                <h1 className='text-3xl font-bold'>
                    {price}$
                </h1>
                <CheckoutButton games={game}  alreadyBought={alreadyBought}/>
                <Button size="lg" onClick={handleCart} disabled={alreadyBought} className='bg-red-500 text-white hover:bg-red-400 shadow-sm shadow-white/15' >
                {alreadyBought ? "You own this game" :"Add to Cart"}
                </Button>
    </div>
  )
}

export default AddCart