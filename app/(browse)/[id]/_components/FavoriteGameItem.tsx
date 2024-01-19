import Link from 'next/link';
import React from 'react'

interface FavoriteGameItemProps {
    image: string;
    id?: string;
}

const FavoriteGameItem = ({image,id}:FavoriteGameItemProps) => {
  return (
    <Link href={`/game-details/${id}`} className='col-span-1 rounded-lg overflow-hidden border-2 border-white/15 cursor-pointer hover:border-emerald-400 '>
      <img src={image} alt="" />
        
    </Link>
  )
}

export default FavoriteGameItem