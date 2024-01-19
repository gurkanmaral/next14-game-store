import React from 'react'
import Filters from './_components/filters'
import DiscoverList from './_components/discoverList'
import PaginationComponent from './_components/Pagination'
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { getFilteredGames } from '@/data/game/get-details';

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
  });
  
const Discover = async() => {


  // const games = await getFilteredGames()

  // console.log(games)

  return (
    <div className='px-2 pt-10 max-w-screen-2xl mx-0 md:mx-auto gap-10 flex flex-col items-center'>
      <h1 className={cn('text-5xl font-bold',font.className)}>Discover</h1>
      <DiscoverList />
      
    </div>
  )
}

export default Discover

