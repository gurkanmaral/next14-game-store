"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import Checkout from './Checkout'
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

type GamesProps = {
    games: GameProps[];
    alreadyBought?:boolean;
    numberPrice?:number;
}

type GameProps = {
    gameId: string;
    gameImage:string;
    gameTitle:string;
    price:number;

}

const CheckoutButton = ({games,alreadyBought,numberPrice}:GamesProps) => {



    const user = useCurrentUser();
    
  

  return (
    <Button asChild disabled={alreadyBought}>
        <Checkout games={games}  userId={user?.id}  alreadyBought={alreadyBought ?? false}/>
    </Button>
  )
}

export default CheckoutButton