"use client"
import React from 'react'
import HomeGameCard from './HomeGameCard'
import { Separator } from '@/components/ui/separator'
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

interface SliderProps {
  games:SliderGameProps[];
}

interface SliderGameProps {
  id:string;
  title:string;
  allImages:string[];
  description:string;
  SpecialPrice:string;
  price:string;
}

const SpecialOffers = ({games}:SliderProps) => {


  return (
   
    <div className='mt-[50px]'>
      <div>
        <p className={cn('text-2xl font-bold',font.className)}>Special Offers</p>
      </div>
      <Separator className="my-2 "  />
      <div className='grid  grid-col-1 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full max-w-[1300px] pt-2' >
       {games.map((game)=>(
         <HomeGameCard key={game.id} game={game} />       
        
       ))}
    </div>
    </div>

    
  )
}

export default SpecialOffers