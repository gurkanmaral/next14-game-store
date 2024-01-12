import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getGameById } from '@/data/game/get-details'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa'
import DetailHeader from './_components/DetailHeader'
import AddCart from './_components/AddCart'

interface GameDetailsParams {
    params:{
        id:string;
    }
}

const GameDetails = async({params}:GameDetailsParams) => {

    const game = await getGameById(params.id);
    console.log(params.id)
    
    if(!game) {
        return (
            <div>
                asdasd
            </div>
        )
    }

    console.log(game)

  return (
    <div className='pt-10 w-full max-w-screen-xl mx-auto gap-4 flex flex-col items-center '>
        <div className='w-full items-center flex gap-4 justify-start'>
            <h1 className='text-5xl font-bold '>{game.title}</h1>
            <div className='flex gap-4'>
                <FaPlaystation className="w-5 h-5" />
                <FaWindows className="w-5 h-5" />
                <FaXbox className="w-5 h-5" />
            </div>
        </div>
        <Separator />
        <div className='w-full grid grid-cols-5 gap-5'>
          <DetailHeader allImages={game.allImages} />
        </div>
        <div className='w-full grid grid-cols-5 gap-5 mt-5'>
           <div className='col-span-4 flex flex-col gap-5'>
           <h1 className='text-4xl'>About</h1>
           <p>
            {game.description}
            </p>
            <div className='w-full grid grid-cols-2 gap-4'>
                <div className='col-span-1 flex flex-col border-r '>
                    <span className='text-gray-400 '>Genres</span>
                    <ul className='flex gap-4 underline'>
                        {game.Genres.map((genre)=>(
                            <li key={genre}>
                                {genre}
                            </li>
                        ))}
                    </ul>
                </div>  
                <div className='col-span-1'>
                    <span className='text-gray-400'>Platforms</span>
                    <ul className='flex gap-4 underline'>
                        {game.platforms.map((platform)=>(
                            <li key={platform}>
                                {platform}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='w-full grid grid-cols-2 gap-4'>
                <div className='col-span-1 flex flex-col border-r '>
                    <span className='text-gray-400 '>Release year</span>
                    <span>{game.released}</span>
                </div>  
                <div className='col-span-1 flex flex-col'>
                    <span className='text-gray-400'>Developer</span>
                    <span>{game.developer}</span>
                </div>
            </div>
            <div>
                User Ratings metacritic
            </div>
            <div>
                Comments
            </div>
            <div className='mb-20'>
                Recommended games
            </div>
           </div>
           <div className=''>
                <AddCart 
                price={game.price} 
                gameImage={game.allImages[0]} 
                gameTitle={game.title}
                gameId={game.id}
                
                />
           </div>
        </div>

    </div>
  )
}

export default GameDetails