import { CartItemType } from '@/lib/redux/store';
import { Trash2 } from 'lucide-react';
import React from 'react'

interface CheckoutCardProps {
    game:Game;
    removeFromCart: (item:CartItemType) => void; 
}

type Game = {
    gameId:string;
    gameTitle:string;
    gameImage:string;
    price:number;
}

const CheckoutCard = ({game,removeFromCart}:CheckoutCardProps) => {

    const handleDelete = () => {
        removeFromCart({
            gameId:game.gameId,
            gameImage:game.gameImage,
            gameTitle:game.gameTitle,
            price:game.price
        })
    }

  return (
    <div className='shadow-md shadow-white/15 col-span-1 p-4 gap-10 grid grid-cols-4 rounded-lg bg-black'>
        <div className='col-span-1 '>
         <img src={game.gameImage} alt="" className='w-full h-full rounded-lg object-cover' />
        </div>
        <div className='col-span-3 flex justify-between'>
        <div className=' justify-center flex flex-col'>
            <h1 className='text-3xl font-bold'>{game.gameTitle}</h1>
            <span className='text-xl text-gray-200'>{game.price}$</span>
        </div>
        <div className='flex items-center justify-center'>
            <Trash2 className='w-10 h-10 text-destructive cursor-pointer'
            onClick={handleDelete}
            />
        </div>
        </div>
    </div>
  )
}

export default CheckoutCard