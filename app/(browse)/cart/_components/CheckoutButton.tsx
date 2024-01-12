"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import Checkout from './Checkout'
import { useCurrentUser } from '@/hooks/useCurrentUser';

type GamesProps = {
    games: GameProps[]
}

type GameProps = {
    gameId: string;
    gameImage:string;
    gameTitle:string;
    price:number;

}

const CheckoutButton = ({games}:GamesProps) => {



    const user = useCurrentUser();

    console.log(user)
    

  return (
    <Button asChild>
        <Checkout games={games}  userId={user?.id} />
    </Button>
  )
}

export default CheckoutButton