import HomeGameList from '@/components/browse/Home/HomeGameList'
import Slider from '@/components/browse/Home/Slider'
import SpecialOffers from '@/components/browse/Home/SpecialOffers'
import TopSellers from '@/components/browse/Home/TopSellers'
import { Skeleton } from '@/components/ui/skeleton'
import { getSpecialGames } from '@/data/game/get-details'
import React, { Suspense } from 'react'


const Home = async() => {


  const HomeSkeleton = () => {
    return (
      <Skeleton className='w-[1000px] h-[600px]' />
    )
  }
  const games = await getSpecialGames();

  if(!games) {
    return null
  }
  return (
    <div className='pt-5 md:pt-10 max-w-screen-2xl mx-auto gap-10 flex flex-col items-center '>
      <Suspense fallback={<HomeSkeleton />}>
       <Slider games={games}/>
       <SpecialOffers games={games} />
       <TopSellers  games={games}  />
       <HomeGameList games={games} />
      </Suspense>
    </div>
  )
}

export default Home