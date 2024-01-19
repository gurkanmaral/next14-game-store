import { getSearchedGames } from '@/data/search/search-game';
import React from 'react'
import DiscoverCard, { DiscoverCardSkeleton } from '../../discover/_components/discoverCard';
import { Skeleton } from '@/components/ui/skeleton';


interface ResultsProps {
    term?: string;
  };
  
const Results = async({term}:ResultsProps) => {

    const games = await getSearchedGames(term)

  

  return (
    <div className='w-full h-full items-center justify-center'>
        <h2 className='text-lg font-semibold mb-4 mt-10'>
            Results for term &quot;{term}&quot;
        </h2>
        {games.length === 0 && (
           <p className="text-muted-foreground text-sm">
           No results found. Try searching for something else
         </p>
        )}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-[15px]'>
        {games?.map((game)=>(
        <DiscoverCard
        key={game.id} 
        platforms={game.platforms} 
        image={game.allImages[0]}
        id={game.id}
        title={game.title}
        price={game.price}
        SpecialPrice={game.SpecialPrice}
        genres={game.Genres}
        />
      ))}
        </div>
    </div>
  )
}

export default Results

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <DiscoverCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};