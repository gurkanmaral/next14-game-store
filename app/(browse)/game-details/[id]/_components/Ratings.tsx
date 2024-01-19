import React from 'react'

interface AverageRatingProps {
  rating:number;
  count:number;
}

const Ratings = ({rating,count}:AverageRatingProps) => {
  

  
  return (
    <div className='flex flex-col'>
        <span className='text-gray-400'>User&apos;s average</span>
       <div className='flex items-center  gap-2'>
        <span className='text-emerald-500 font-bold text-xl'>{rating}</span>
          <span className='text-sm'>
            {count} ratings
          </span>
       </div>
    </div>
  )
}

export default Ratings