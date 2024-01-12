import HomeGameList from '@/components/browse/Home/HomeGameList'
import Slider from '@/components/browse/Home/Slider'
import SpecialOffers from '@/components/browse/Home/SpecialOffers'
import TopSellers from '@/components/browse/Home/TopSellers'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'

const Home = () => {

  const HomeSkeleton = () => {
    return (
      <Skeleton className='w-[1000px] h-[600px]' />
    )
  }
  

  return (
    <div className='pt-10 max-w-screen-2xl mx-auto gap-10 flex flex-col items-center '>
      <Suspense fallback={<HomeSkeleton />}>
       <Slider />
       <SpecialOffers />
       <TopSellers />
       <HomeGameList />
      </Suspense>
    </div>
  )
}

export default Home