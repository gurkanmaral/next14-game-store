import React from 'react'
import ProfileHeader from './_components/ProfileHeader'
import ProfileLinks from './_components/ProfileLinks'

const UserPage = () => {
  return (
    <div className='pt-10 max-w-screen-xl mx-auto gap-10 flex flex-col items-center backdropmask'>
       <ProfileHeader />
       <ProfileLinks />

    </div>
  )
}

export default UserPage