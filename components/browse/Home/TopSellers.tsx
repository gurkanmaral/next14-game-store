"use client";

import { useState } from "react";
import TopSellersCard from "./TopSellersCard";
import { Separator } from "@/components/ui/separator";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
  });
  
const data = [
    {
        id:0,
        image:"/assas1.jpg",
        name:"Assassins Creed"
    },
    {
        id:1,
        image:"/assas1.jpg",
        name:"Sekiro",
    },
    {
        id:2,
        image:"/assas1.jpg",
        name:"Sekiro",
    },
    {
        id:3,
        image:"/assas1.jpg",
        name:"Sekiro",
    },
    {
        id:4,
        image:"/assas1.jpg",
        name:"Sekiro",
    },
]

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

const TopSellers = ({ games }:SliderProps) => {
    const [active,setActive] = useState(2);


  return (
    <div className='w-full max-w-[1300px] flex flex-col '>
        <div>
            <h1 className={cn("text-2xl font-bold",font.className)}>Top Sellers</h1>
        </div>
        <Separator className="my-2" />
        <div className='flex flex-row min-h-[70vh] gap-3 pt-2'>
            {games.map((item,index)=>(
                <TopSellersCard 
                key={item.id}
                item={item.allImages[0]}
                index={index}
                active={active}
                setActive={setActive}
                id={item.id}
                name={item.title}
                />
            ))}
        </div>

    </div>
  )
}

export default TopSellers