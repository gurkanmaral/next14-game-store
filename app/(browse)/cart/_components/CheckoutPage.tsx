"use client";
import { useCartStore } from '@/lib/redux/store'
import React from 'react'
import CheckoutCard from './CheckoutCard';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {

  const {games,removeFromCart,totalItems,totalPrice} = useCartStore();



console.log(games)
  return (
    <div className='w-full flex flex-col'>
        <h1 className='text-2xl font-bold'>Checkout</h1>
        <div className='grid grid-cols-1 mt-10'>
          {games.map((game)=>(
              <CheckoutCard key={game.gameId} game={game} removeFromCart={removeFromCart}  />
          ))}
        </div>
        <div className='flex flex-col'>
          <span>Total items in cart: {totalItems}</span>
          <span>Total Price: {totalPrice}$</span>
        </div>
        <Button>
          Checkout
        </Button>
    </div>
  )
}

export default CheckoutPage