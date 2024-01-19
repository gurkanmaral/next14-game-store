import { Button } from '@/components/ui/button'
import React from 'react'
import HomeListCard from './HomeListCard'
import Link from 'next/link'
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
  });
  

const NewGames = ({games}) => {
  return (
    <div className='col-span-1 border-r border-white/15 '>
        <div className='flex w-full justify-between pr-2 items-center'>
            <h1 className={cn("text-xl font-bold",font.className)}>New Releases</h1>
            <div >
                <Button variant="ghost" asChild>
                   <Link href="/discover">
                   VIEW MORE
                   </Link>
                </Button>
            </div>
        </div>
        <div className='w-full grid grid-cols-1 px-2 mt-2'> 
           {games.map((game)=>(
             <HomeListCard key={game.id} game={game} />
             
           ))}
        </div>
    </div>
  )
}

export default NewGames