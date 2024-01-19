import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React from 'react'

interface UsersProps {
  user:UserCardProps;
}

interface UserCardProps{
  id:string;
  image:string;
  name:string;
}

const UserSearchResultCard = ({user}:UsersProps) => {

  return (
    <Link href={`/${user.id}`} className='col-span-1 grid grid-cols-10 items-center just-center gap-2 '>
      <div className='col-span-1 bg-black rounded-full overflow-hidden'>
        <img src={user.image ? user.image : "/char.svg"} alt="user-image" className='rounded-full aspect-square w-full h-full object-cover' />
      </div>
      <div className='col-span-9'>
          <h1>
            {user.name}
          </h1>
      </div>
    </Link>
  )
}

export default UserSearchResultCard

export const UserSearchResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
    <div className="relative h-[9rem] w-[16rem]">
      <Skeleton className="h-4 w-32" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
  )
}