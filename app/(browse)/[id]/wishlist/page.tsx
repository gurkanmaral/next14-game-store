import { getUserbyId } from '@/data/auth/user';
import React from 'react'
import ProfileLink from '../_components/ProfileLink';
import { getGameDetailsInLibrary } from '@/data/game/get-details';
import LibraryItem from '../library/_components/LibraryItem';
import { userWishlist } from '@/data/wishlist/get-wishlist';

interface UserPageProps {
  params:{
    id:string;
  }
}
const WishlistPage = async({params}:UserPageProps) => {

  const wishlistGames = await userWishlist(params.id);

if(!wishlistGames) {
  return  null;
}
console.log(wishlistGames,"wishlist")

  return (
    <div className=' pt-10 max-w-screen-lg mx-auto gap-10 flex flex-col items-center backdropmask'>
          <div className="">
            <ProfileLink userId={params.id} />
          </div>
          <div className='w-full borderflex items-start'>
            <h1 className='text-3xl font-bold mt-2'>Wishlist Games</h1>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {wishlistGames.length === 0 ? (
              <div className='text-5xl font-bold text-center w-full col-span-3 mt-10'>
                  <h1>No Games in users wishlist.</h1>
              </div>) 
              : wishlistGames?.map((item)=>(
                <LibraryItem key={item.id} item={item}  />
              ))}
          </div>

    </div>
  )
}

export default WishlistPage