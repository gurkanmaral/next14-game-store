import { Button } from '@/components/ui/button'
import React from 'react'
import HomeListCard from './HomeListCard'

const TopRated = () => {
  return (
    <div className='col-span-1 border-r '>
    <div className='flex w-full justify-between pr-2 items-center'>
        <h1>Top Rated</h1>
        <div >
            <Button variant="ghost">
                VIEW MORE
            </Button>
        </div>
    </div>
    <div className='w-full grid grid-cols-1 px-2'> 
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
        <HomeListCard />
    </div>
</div>
  )
}

export default TopRated