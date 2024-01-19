import Link from 'next/link'
import React from 'react'

const HomeListCard = ({game}) => {
  return (
    <Link href={`/game-details/${game.id}`} className=' hover:bg-[#1d1d1d] px-2 col-span-1 transition-all cursor-pointer grid grid-cols-3 gap-3 rounded-[10px] pl-6 py-2'>
       <div className='col-span-1 p-2 overflow-hidden '>
            <img src={game.allImages[0]} alt="" 
            className='w-full  object-cover rounded-[10px] aspect-4/3 shadow-md shadow-white/15'
            />
       </div>
       <div className='col-span-2 flex flex-col justify-center items-start gap-4 ml-3 '>
            <h1 className='text-base'>{game.title}</h1>
            <h3 className='text-sm text-emerald-300'>{game.price}$</h3>
       </div>

    </Link>
  )
}

export default HomeListCard