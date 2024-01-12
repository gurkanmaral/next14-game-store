"use client";
import { Card } from '@/components/ui/card'
import React from 'react'
import { FaPlaystation } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { Tilt } from 'react-tilt'

const DiscoverCard = () => {
  return (
    <Tilt options={{
        max:45,
        scale:1,
        speed:10
      }}>
        <Card className='bg-black p-0 m-0 col-span-1 border-none grid grid-cols-1 cursor-pointer shadow-md shadow-white/5 '>
        <div className='col-span-1 overflow-hidden rounded-t-md'>
            <img src="/assas1.jpg" alt=""
            className='w-full object-cover'
            />
        </div>
        <div className='col-span-1 pt-3 pb-4 px-3 flex flex-col'>
            <div className='flex gap-4'>
                <FaPlaystation className="w-5 h-5" />
                <FaWindows className="w-5 h-5" />
                <FaXbox className="w-5 h-5" />
            </div>
            <div>
                <h1 className='font-bold text-2xl mt-2'>Sekiro</h1>
            </div>
        </div>
    </Card>
    </Tilt>
  )
}

export default DiscoverCard