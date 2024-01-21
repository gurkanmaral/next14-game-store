"use client";
import { useCartStore } from '@/lib/redux/store'
import React from 'react'
import CheckoutCard from './CheckoutCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CheckoutButton from './CheckoutButton';

const CheckoutPage = () => {

  const {games,removeFromCart,totalItems,totalPrice} = useCartStore();


  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
  return (
    <div className='w-full flex flex-col'>
        <h1 className='text-2xl font-bold'>Checkout</h1>
        <div className='grid grid-cols-1 mt-10 gap-4'>
          {games.map((game)=>(
              <CheckoutCard key={game.gameId} game={game} removeFromCart={removeFromCart}  />
          ))}
        </div>
        <div className='flex flex-col gap-4 mt-4 mb-4'>
          <span className='text-xl font-bold'>Total items in cart: <span className='text-emerald-500'>{totalItems}</span></span>
          <span className='text-xl font-bold'>Total Price: <span className='text-emerald-500'>{roundedTotalPrice}$</span></span>
        </div>
        <CheckoutButton games={games} />
    </div>
  )
}

export default CheckoutPage