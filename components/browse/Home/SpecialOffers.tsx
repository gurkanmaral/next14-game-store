"use client"
import React from 'react'
import HomeGameCard from './HomeGameCard'
import { Separator } from '@/components/ui/separator'


const SpecialOffers = () => {
  return (
   
    <div className='mt-[50px]'>
      <div>
        <p>Special Offers</p>
      </div>
      <Separator className="my-2 "  />
      <div className='grid grid-cols-5 gap-5 w-full max-w-[1300px]'>
        <HomeGameCard />
        <HomeGameCard />
        <HomeGameCard />
        <HomeGameCard />
        <HomeGameCard />
    </div>
    </div>

    
  )
}

export default SpecialOffers