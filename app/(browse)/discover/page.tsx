import React from 'react'
import Filters from './_components/filters'
import DiscoverList from './_components/discoverList'
import PaginationComponent from './_components/Pagination'

const Discover = () => {
  return (
    <div className='pt-10 max-w-screen-2xl mx-auto gap-10 flex flex-col items-center'>
      <h1 className='text-5xl font-bold'>Discover</h1>
      <Filters />
      <DiscoverList />
      <PaginationComponent />
    </div>
  )
}

export default Discover