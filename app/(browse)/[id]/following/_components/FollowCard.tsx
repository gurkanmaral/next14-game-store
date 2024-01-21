import Link from 'next/link';
import React from 'react'

interface FollowCardProps {
    id:string;
    name:string;
    image:string;
}

const FollowCard = ({id,name,image}:FollowCardProps) => {


  return (
    <Link href={`/${id}`} className='col-span-5 grid grid-cols-10 gap-4 items-center justify-center bg-black border border-white/15 rounded-md p-2'>
        <div className='col-span-1'>
            <img src={image ? image : "/char.svg"} alt="" className='aspect-square rounded-full w-full h-full object-cover' />
        </div>
        <div className='col-span-9'>
            <h1 className='text-3xl font-bold'>
              {name}
            </h1>
        </div>
    </Link>
  )
}

export default FollowCard