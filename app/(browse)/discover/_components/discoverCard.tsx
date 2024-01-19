"use client";
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import React from 'react'
import { FaPlaystation } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { Tilt } from 'react-tilt'

interface DiscoverCardProps {
  id:string;
  title:string;
  platforms:string[];
  image:string;
  price:string;
  SpecialPrice:string;
  genres:string[];
}

const DiscoverCard = ({id,title,platforms,image,price,SpecialPrice}:DiscoverCardProps) => {
  return (
    <Tilt options={{
        max:45,
        scale:1,
        speed:10
      }}>
        <Card className='bg-black p-0 m-0 col-span-1 border-none grid grid-cols-1 cursor-pointer shadow-md shadow-white/5 '>
       <Link href={`/game-details/${id}`}>
       <div className='col-span-1 overflow-hidden rounded-t-md'>
            <img src={image} alt=""
            className='w-full object-cover h-full'
            />
        </div>
        <div className='col-span-1 pt-3 pb-4 px-3 grid grid-cols-1'>
            <div className='flex gap-4 col-span-1'>
            {platforms.includes('Playstation') && <FaPlaystation className="w-5 h-5" />}
            {platforms.includes('PC') && <FaWindows className="w-5 h-5" />}
            {platforms.includes('XBOX') && <FaXbox className="w-5 h-5" />}
            </div>
            <div className='col-span-1 min-h-[70px]'>
                <h1 className='font-bold text-2xl mt-2'>{title}</h1>
            </div>
        </div>
       </Link>
    </Card>
    </Tilt>
  )
}

export default DiscoverCard


export const DiscoverCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
    <div className="relative h-[9rem] w-[16rem]">
      <Skeleton className="h-4 w-32" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
  )
}