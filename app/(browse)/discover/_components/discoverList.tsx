"use client";
import React, { useEffect, useState } from 'react'
import DiscoverCard from './discoverCard'
import { getFilteredGames } from '@/data/game/get-details';
import Filters from './filters';
import { Loader } from 'lucide-react';
import qs from 'query-string';
import { useRouter } from 'next/navigation';
interface DiscoverListProps {
  games:DiscoverListGameProps[];
 
}
interface DiscoverListGameProps {
  id:string;
  allImages:string[];
  SpecialPrice:string;
  price:string;
  title:string;
  platforms:string[];
  Genres:string[];
}



const DiscoverList = ({games}:DiscoverListProps) => {

 

  // const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); 
const [genres,setGenres] = useState("All"); 
const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
const [sortOption, setSortOption] = useState<'Alpha' | 'lowToHigh' | 'highToLow'>('Alpha');


  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(games)

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

const handleGenreChange = (newGenre) => {
  setGenres(newGenre)
  const url = qs.stringifyUrl({
    url: '/discover',
    query: { genre: newGenre },
  }, { skipEmptyString: true });

 
  router.push(url);
};

//   useEffect(() => {
//     const fetchGames = async () => {
//         setLoading(true);
//         try {
//           const response = await fetch(`${baseUrl}/api/getGames?genre=${genres}`,{ cache: 'no-store' });
//           if (!response.ok) {
//             throw new Error(`Request failed with status: ${response.status}`);
//           }
//           const data = await response.json();
//           console.log(data,"data")        
//             setGames(data);         
//         } catch (error) {
//           console.error('Error fetching games:', error);
//         } finally {
//           setLoading(false);
//         }
//     };

//     fetchGames();
// }, [genres,baseUrl]);



const sortGames = (games:DiscoverListGameProps[], sortOption: 'Alpha' | 'lowToHigh' | 'highToLow') => {
  switch(sortOption) {
    case 'Alpha':
      return [...games].sort((a, b) => a.title.localeCompare(b.title));
    case 'lowToHigh':
      return [...games].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case 'highToLow':
      return [...games].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    default:
      return games;
  }
}


const filteredGames = games?.filter(game =>
  selectedPlatforms.length === 0 || game.platforms.some((platform: string) => selectedPlatforms.includes(platform))
);

const sortedAndFilteredGames = sortGames(filteredGames, sortOption);


 


  return (
    <div className='w-full flex flex-col gap-7'>
      <Filters 
      setSortOption={setSortOption} 
      sortOption={sortOption}
      setGenres={setGenres}
      genres={genres}
      selectedPlatforms={selectedPlatforms}
      setSelectedPlatforms={setSelectedPlatforms}
      handleGenreChange={handleGenreChange}
      />
      <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-[20px]'>
      {loading ? (
       <div className='w-full h-full items-center justify-center flex col-span-4'>
        <Loader />
       </div>
      ): 
      sortedAndFilteredGames?.map((game)=>(
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

export default DiscoverList

