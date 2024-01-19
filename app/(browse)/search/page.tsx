import { getSearchedGames } from '@/data/search/search-game'
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { string } from 'zod';
import Results, { ResultsSkeleton } from './_components/results';


interface SearchPageProps {
    searchParams: {
      term?: string;
    };
  };
const SearchPage = async({searchParams}:SearchPageProps) => {

    if (!searchParams.term) {
        redirect("/");
      }

    

  return (
    <div className='px-2 md:px-0 pt-10 max-w-screen-xl mx-auto gap-10 flex flex-col items-center'>
        <Suspense fallback={<ResultsSkeleton />}>
          <Results term={searchParams.term} />
        </Suspense>
        
    </div>
  )
}

export default SearchPage