import { getFollowing } from '@/data/follow/follow';
import React from 'react'
import ProfileLink from '../_components/ProfileLink';
import FollowCard from './_components/FollowCard';

interface UserPageProps {
  params:{
    id:string;
  }
}

const FollowingPage = async({params}:UserPageProps) => {

  const followers = await getFollowing(params.id)

  if(!followers) {
    return null;
  }

  return (
    <div className=' pt-10 max-w-screen-lg mx-auto gap-10 flex flex-col items-center backdropmask'>
      <div>
        <ProfileLink userId={params.id} />
      </div>
      <div className='grid grid-cols-5'>
        {followers?.length > 0 ? followers?.map((follow)=>(
          <FollowCard key={follow.id} image={follow.image} name={follow.name} id={follow.id} />
        )) : (
          <div className='col-span-5 flex items-center justify-center mt-10'>
             <span className='text-2xl font-bold'>
               No following
             </span>
          </div>
        )}
      </div>

    </div>
  )
}

export default FollowingPage