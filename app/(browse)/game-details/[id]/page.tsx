import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getGameById, recommendedGames } from '@/data/game/get-details'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa'
import DetailHeader from './_components/DetailHeader'
import AddCart from './_components/AddCart'
import { currentUser } from '@/lib/auth'
import { getOrderByUserId } from '@/data/order/get-order'
import { getBoughtGameByOrderId } from '@/data/boughtGame/get-bought-game'
import Ratings from './_components/Ratings'
import RatingCard from './_components/RatingCard'
import { getAverageRatingOfGame, getGameRatingByUser } from '@/data/rating/get-rating'
import Comments from './_components/Comments'
import { getCommentsByGameId } from '@/data/comment/get-comments'
import RecommendedGames from './_components/RecommendedGames'
import AddFavorites from './_components/AddFavorites'
import { isGameFavoriteByUser } from '@/data/favorites/get-favorites'
import { isGameInWishlist } from '@/data/wishlist/get-wishlist'
import AddWishlist from './_components/AddWishlist'


interface GameDetailsParams {
    params:{
        id:string;
    }
}

const GameDetails = async({params}:GameDetailsParams) => {

    const [game, user] = await Promise.all([
        getGameById(params.id),
        currentUser()
    ]);


    if(!game) {
        return (
            <div>
               No game found
            </div>
        )
    }
    const additionalData = user ? await Promise.all([
        getCommentsByGameId(params.id),
        isGameFavoriteByUser(user.id, params.id),
        isGameInWishlist(user.id, params.id),
        recommendedGames(params.id),
        getOrderByUserId(user.id, params.id),
        getGameRatingByUser(params.id)
    ]) : [];




    const [comments, isFavorite, isWishlist, recommendedGamesArray, order, rating] = additionalData;
   
    const averageRating = await getAverageRatingOfGame(params.id);




    let alreadyBought = false;

    if(order && order.length > 0 ) {
        alreadyBought = true;
    }

  return (
    <div className='pt-10 w-full max-w-screen-xl mx-auto gap-4 flex flex-col items-center '>
        <div className='w-full items-center flex gap-4 justify-start'>
            <h1 className='text-2xl md:text-5xl font-bold '>{game.title}</h1>
            <div className='flex gap-4'>
                <FaPlaystation className="w-5 h-5" />
                <FaWindows className="w-5 h-5" />
                <FaXbox className="w-5 h-5" />
            </div>
        </div>
        <Separator />
        <div className='w-full grid grid-cols-1 md:grid-cols-5 gap-5'>
          <DetailHeader allImages={game.allImages} />
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-5 gap-5 mt-5'>
           <div className='col-span-1 md:col-span-4 flex flex-col gap-5'>
           <h1 className='text-4xl'>About</h1>
           <p className='text-lg'>
            {game.description}
            </p>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
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
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='col-span-1 flex flex-col border-r '>
                    <span className='text-gray-400 '>Release year</span>
                    <span>{game.released}</span>
                </div>  
                <div className='col-span-1 flex flex-col'>
                    <span className='text-gray-400'>Developer</span>
                    <span>{game.developer}</span>
                </div>
            </div>
           <div className='w-full grid grid-cols-2 gap-4'>
            <div className='flex flex-col py-2 col-span-1'>
                    <span className='text-gray-400'>Metacritic</span>
                    <span className='text-emerald-500 font-bold text-xl'>{game.metacritic}</span>
                </div>
                <div className='col-span-1'>
                  <Ratings rating={averageRating.averageRating} count={averageRating.ratingCount} />
                </div>
           </div>
            <div>
               <Comments comments={comments} userId={user?.id} gameId={params.id}/>
            </div>
            <div className='mb-20'>
                    <RecommendedGames recommendedGamesArray={recommendedGamesArray || []} />
            </div>
           </div>
           <div className='col-span-1 flex flex-col gap-4 mb-4 md:mb-0'>             
                <div>
                    <AddCart 
                    price={game.price} 
                    gameImage={game.allImages[0]} 
                    gameTitle={game.title}
                    gameId={game.id}
                    alreadyBought={alreadyBought}
                    userId={user?.id}
                    />
                </div>
                <div>
                    <AddWishlist gameId={params.id} userId={user?.id} isWishlist={isWishlist} />
                </div>
                <div>
                    <AddFavorites gameId={params.id} userId={user?.id} isFavorite={isFavorite} />
                </div>
                <div>
                    <RatingCard gameId={params.id} rating={rating} />
                </div>
               
           </div>
        </div>

    </div>
  )
}

export default GameDetails