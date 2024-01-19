"use client";
import React, { useState } from 'react'
import UserSearch from './userSearch'
import UserSearchResultCard, { UserSearchResultCardSkeleton } from './userSearchResultCard'
import { Skeleton } from '@/components/ui/skeleton';

interface UsersProps {
  users:UserCardProps[];
}

interface UserCardProps{
  id:string;
  image:string;
  name:string;
}
const UserSearchResults = ({users}:UsersProps) => {

    const [value, setValue] = useState("");

    const filteredUsers = value ? users.filter(user=> user.name.toLowerCase().includes(value.toLowerCase())) : users;


  return (
    <div className='flex flex-col gap-4'>
         <div className=''>
         <UserSearch value={value} setValue={setValue} />
         </div>
        <div>
            {filteredUsers.length === 0 && (
                <p>
                    No users found
                </p>
            )}
            <div className='grid grid-cols-1 gap-5'>
                {filteredUsers.map((user)=>(
                    <UserSearchResultCard user={user} key={user.id} />
                ))}
            </div>
        </div>

    </div>
  )
}

export default UserSearchResults



export const UserResultsSkeleton = () => {
    return (
      <div>
        <Skeleton className="h-8 w-[290px] mb-4" />
        <div className="flex flex-col gap-y-4">
          {[...Array(4)].map((_, i) => (
            <UserSearchResultCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  };