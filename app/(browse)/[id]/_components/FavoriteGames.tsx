import { Plus } from 'lucide-react'
import React from 'react'
import AddFavoriteGames from './AddFavoriteGames'
import Link from 'next/link'
import FavoriteGameItem from './FavoriteGameItem';



interface FavoriteGamesProps{
  favorites:FavoriteGameProps[];
  isSelf:boolean;
}


interface FavoriteGameProps{
  id:string;
  title:String;
  allImages:String[];
 
}

const FavoriteGames = ({favorites,isSelf}:FavoriteGamesProps) => {
    const maxFavorites = 3;
  const addGameBlocks = maxFavorites - favorites?.length;


 
  return (
   <div className='grid grid-cols-3 gap-3 '>
            {favorites?.map((favorite) => (
                <FavoriteGameItem key={favorite.id} image={favorite.allImages[0]} id={favorite.id} />
            ))}
            {Array.from({ length: addGameBlocks }, (_, index) => (
                <div key={index} className='bg-black p-2 py-4 rounded-lg border-2 border-white/15 col-span-1'>
                    {isSelf ? (
                    <div className='flex flex-col justify-between '>
                      <Link href="/discover" className=''>
                        <Plus className='w-10 h-10' />
                    </Link>
                    <span className='text-3xl'>Add Game</span>
                    </div>): (
                      <div className='flex flex-col gap-2 items-center justify-center  w-full h-full text-center' >
                          <img src="/padlock.svg" alt="" className='w-[100px] h-[100px]' />
                          <span className='text-2xl'>No game added</span>
                      </div>
                    )}
                </div>
            ))}
        </div>
  )
}

export default FavoriteGames