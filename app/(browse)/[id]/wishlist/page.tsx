import { getUserbyId } from '@/data/auth/user';
import React from 'react'
import ProfileLink from '../_components/ProfileLink';
import { getGameDetailsInLibrary } from '@/data/game/get-details';
import LibraryItem from '../library/_components/LibraryItem';

interface UserPageProps {
  params:{
    id:string;
  }
}
const WishlistPage = async({params}:UserPageProps) => {

  const user = await getUserbyId(params.id);

if(!user) {
  return  null;
}


  return (
    <div className=' pt-10 max-w-screen-lg mx-auto gap-10 flex flex-col items-center backdropmask'>
          <div className="">
            <ProfileLink userId={user.id} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3'>
          {user?.wishlistGames?.length === 0 ? (
              <div className='text-5xl font-bold text-center w-full col-span-3 mt-10'>
                  <h1>No Games in users wishlist.</h1>
              </div>) 
              : user?.wishlistGames?.map((item)=>(
                <LibraryItem key={item.id} item={item}  />
              ))}
          </div>

    </div>
  )
}

export default WishlistPage