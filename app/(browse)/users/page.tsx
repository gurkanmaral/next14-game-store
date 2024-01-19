import React, { Suspense } from 'react'
import { getAllUsers } from '@/data/user/get-user'
import UserSearchResults, { UserResultsSkeleton } from './_components/userSearchResults'

const UsersPage = async() => {

    const users = await getAllUsers()

  
    
  return (
    
    <div className='h-full px-2 pt-10 max-w-screen-xl mx-auto gap-10 flex flex-col items-center'>
      <Suspense fallback={<UserResultsSkeleton />}>
       <UserSearchResults users={users} />
      </Suspense>
    </div>
  )
}

export default UsersPage