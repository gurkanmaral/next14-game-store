"use client";

import { useState } from "react";
import TopSellersCard from "./TopSellersCard";
import { Separator } from "@/components/ui/separator";

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

const TopSellers = () => {
    const [active,setActive] = useState(2);


  return (
    <div className='w-full max-w-[1300px] flex flex-col gap-3'>
        <div>
            <h1>Top Sellers</h1>
        </div>
        <Separator />
        <div className='mt-5 flex flex-row min-h-[70vh] gap-3'>
            {data.map((item,index)=>(
                <TopSellersCard 
                key={item.id}
                item={item.image}
                index={index}
                active={active}
                setActive={setActive}
                id={item.id}
                name={item.name}
                />
            ))}
        </div>

    </div>
  )
}

export default TopSellers