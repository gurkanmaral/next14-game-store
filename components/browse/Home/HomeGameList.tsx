import React from 'react'
import NewGames from './NewGames'
import TopRated from './TopRated'
import ComingSoon from './ComingSoon'
import { Separator } from '@/components/ui/separator'

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


const HomeGameList = ({ games }:SliderProps) => {
  return (
    <div className='w-full max-w-[1300px] grid md:grid-cols-3 grid-cols-1 gap-3 mb-20'>
        <NewGames games={games} />      
        <TopRated  games={games}/>
        <ComingSoon  games={games}/>
    </div>
  )
}

export default HomeGameList