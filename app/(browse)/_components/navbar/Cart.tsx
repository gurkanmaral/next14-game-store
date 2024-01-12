"use client";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useCartStore } from "@/lib/redux/store";
import { ShoppingCart } from 'lucide-react'
import Link from "next/link";
import React from 'react'

type CartGameProps = {
    gameId:string;
    gameTitle:string;
    gameImage:string;
    price:number;
}

const CartBox = () => {

    const {games,removeFromCart} = useCartStore();


    const handleCart = (game:CartGameProps) => {

        removeFromCart({
            gameId:game.gameId,
            gameTitle:game.gameTitle,
            gameImage:game.gameImage,
            price:game.price,
        })
    }
  return (
        <Popover>
            <PopoverTrigger>
                <ShoppingCart className='w-5 h-5 cursor-pointer' />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col text-center" align="end" sideOffset={20}>
                <h1 className="font-bold text-lg">Games in your Cart</h1>
                <div className=""> 
                   {games.map((game)=>(
                    <div key={game.gameId} className="flex mt-5 bg-black rounded-lg p-2 gap-2">
                        <img src={game.gameImage} alt="" className="w-[100px] h-[100px] object-cover rounded-md" />
                       <div className="flex flex-col gap-2">
                        <span>
                                {game.gameTitle}
                        </span>
                        <Button variant="ghost" size="sm" onClick={()=>handleCart(game)} >
                            Remove from cart
                        </Button>
                       </div>
                    </div>
                   ))}
                </div>
                <div>
                   <Button asChild>
                    <Link href="/cart">
                        Checkout
                    </Link>
                   </Button>
                </div>
            </PopoverContent>
        </Popover>

  )
}

export default CartBox