import Link from 'next/link';
import React from 'react'

interface ProfileReviewCount {
  commentCount:number;
  userId?:string;

}

const ProfileReviewCount = ({commentCount,userId}:ProfileReviewCount) => {
  return (
    <Link href={`/${userId}/reviews`}  className="bg-black p-3 rounded-md shadow-md shadow-white/15 gap-2 flex justify-end items-end">
     <span className="text-7xl font-bold">
       {commentCount} 
     </span>
      <span className='text-xl'>
       Reviews
      </span>
    </Link>
  )
}

export default ProfileReviewCount