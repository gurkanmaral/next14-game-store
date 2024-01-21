import { getUserbyId } from '@/data/auth/user';
import React from 'react'
import ProfileLink from '../_components/ProfileLink';
import { getGameDetailsInLibrary } from '@/data/game/get-details';
import LibraryItem from './_components/LibraryItem';
import { getOrderByUserId, getOrdersByUserId } from '@/data/order/get-order';

interface UserPageProps {
  params:{
    id:string;
  }
}


const LibraryPage = async({params}:UserPageProps) => {

  const user = await getUserbyId(params.id);

  if(!user) {
    return null
  }

  const orders = await getOrdersByUserId(user.id)

   const gamesDetails = await Promise.all(
    orders.map(id => getGameDetailsInLibrary(id))
 );




  return (


    <div className=' pt-10  max-w-screen-lg mx-auto gap-10 flex flex-col items-center backdropmask'>
          <div className="">
            <ProfileLink userId={user.id} />
          </div>
          <div className='w-full borderflex items-start'>
            <h1 className='text-3xl font-bold mt-2'>{user.name}&apos; library</h1>
          </div>
          <div className='grid  grid-cols-1 md:grid-cols-3- lg:grid-cols-4  gap-5'>
              {gamesDetails.length === 0 ? (
              <div className=' text-5xl font-bold text-center w-full col-span-1 md:col-span-3 lg:col-span-4 mt-10'>
                  <h1>No Games in users library.</h1>
              </div>) 
              : gamesDetails?.map((item)=>(
                <LibraryItem key={item?.id} item={item}  />
              ))}
          </div>
    </div>
  )
}

export default LibraryPage
