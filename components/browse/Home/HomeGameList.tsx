import React from 'react'
import NewGames from './NewGames'
import TopRated from './TopRated'
import ComingSoon from './ComingSoon'
import { Separator } from '@/components/ui/separator'

const HomeGameList = () => {
  return (
    <div className='w-full max-w-[1300px] grid md:grid-cols-3 grid-cols-1 gap-3 mb-20'>
        <NewGames />      
        <TopRated />
        <ComingSoon />
    </div>
  )
}

export default HomeGameList