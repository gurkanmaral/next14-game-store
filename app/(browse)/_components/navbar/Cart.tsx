"use client";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useCartStore } from "@/lib/redux/store";
import { ShoppingCart, Trash2 } from 'lucide-react'
import Link from "next/link";
import React from 'react'
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
  });

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
            <PopoverContent className="flex flex-col text-center bg-black shadow-md shadow-black border-none" align="end" sideOffset={20}>
                <h1 className={cn("font-bold text-xl",font.className)}>Games in your Cart</h1>
                <div className="flex flex-col"> 
                   {games.map((game)=>(
                    <div key={game.gameId} className="flex mt-5 bg-[#303030] rounded-lg p-2 gap-4">
                        <img src={game.gameImage} alt="" className="w-[100px] h-[100px] object-cover rounded-md" />
                       <div className="flex flex-col gap-2 w-full items-center justify-center">
                        <span className="text-lg">
                                {game.gameTitle}
                        </span>
                        <Button variant="ghost" size="sm" onClick={()=>handleCart(game)} >
                            <Trash2 className="w-5 h-5 text-red-500"  />
                        </Button>
                       </div>
                    </div>
                   ))}
                </div>
                <div>
                   <Button asChild className="mt-5">
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