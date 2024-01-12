import React from 'react'
import DiscoverCard from './discoverCard'

const DiscoverList = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-[15px]'>
       <DiscoverCard />
       <DiscoverCard />
       <DiscoverCard />
       <DiscoverCard />
       <DiscoverCard />
    
    </div>
  )
}

export default DiscoverList