
import { Button } from '@/components/ui/button'
import React from 'react'
import FollowButton from './followButton';
import { currentUser } from '@/lib/auth';
import { getUserbyId } from '@/data/auth/user';
import EditModal from './EditModal';

interface ProfileHeaderProps {
    image?:string;
    name:string;
    isSelf:boolean;
    isFollowing:boolean;
    userId:string;
    selfId?:string;
}

const ProfileHeader = async({image,name,isSelf,isFollowing,userId,selfId}:ProfileHeaderProps) => {



  return (
    <div className='w-full flex flex-col   h-[400px] bg-custom-image relative'>
        <div className='absolute bottom-[-75px] left-[50px] flex gap-5'>
          <div className='bg-black rounded-full'>
            <img src={image ? image : "/char.svg"} className='w-[150px] h-[150px] rounded-full object-cover' alt="" />
          </div>
          <div className='items-center flex justify-center flex-col gap-4 '>
            <h1 className='text-3xl font-bold'>{name}</h1>
            {isSelf ?
            <EditModal 
            initialImage={image}
            initialName={name}
            /> : (
                <FollowButton 
                isFollowing={isFollowing} 
                userId={userId}
                selfId={selfId}
                />
            )}
          </div>
        </div>
    </div>
  )
}

export default ProfileHeader