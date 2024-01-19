import Link from 'next/link'
import React from 'react'

interface RecommendedCardProps{
  game:RecommendedCardGameProps;
}

interface RecommendedCardGameProps{
  allImages:string[];
  id:string;
  title:string;
  SpecialPrice:string;
  price:string;
}

const RecommendedCard = ({game}:RecommendedCardProps) => {
  return (
    <Link href={`/game-details/${game.id}`} className='col-span-4 md:col-span-1 grid grid-cols-1 gap-2'>
        <div className='col-span-1 overflow-hidden rounded-md'>
         <img src={game.allImages[0]} alt="" className='' />
        </div>
        <div className='col-span-1 flex justify-start items-start'>
            <span className='text-xl font-semibold'>{game.title}</span>
        </div>
    </Link>
  )
}

export default RecommendedCard