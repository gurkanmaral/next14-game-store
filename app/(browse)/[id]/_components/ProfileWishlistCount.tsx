import Link from 'next/link';
import React from 'react'

interface ProfileWishlistCount {
  wishlistGames:number;
  userId?:string;
}

const ProfileWishlistCount = ({wishlistGames,userId}:ProfileWishlistCount) => {


  return (
    <Link href={`/${userId}/wishlist`}  className="bg-black p-3 rounded-md shadow-md shadow-white/15 gap-2 flex justify-end items-end">
     <span className='text-7xl font-bold'>
       {wishlistGames}
     </span>
      <span className='text-xl'>
        Wishlist 
      </span>

    </Link>
  )
}

export default ProfileWishlistCount