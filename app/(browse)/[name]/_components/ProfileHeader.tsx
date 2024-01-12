
import { Button } from '@/components/ui/button'
import React from 'react'

const ProfileHeader = () => {

    const user = "/assas1.jpg"

  return (
    <div className='w-full flex flex-col   h-[400px] bg-custom-image relative'>
        <div className='absolute bottom-[-75px] left-[50px] flex gap-5'>
          <div>
            <img src="/assas1.jpg" className='w-[150px] h-[150px] rounded-full object-cover' alt="" />
          </div>
          <div className='items-center flex justify-center flex-col gap-4'>
            <h1 className='text-3xl font-bold'>gurkanmaral</h1>
            <Button className='w-full'>
              Follow
            </Button>
          </div>
        </div>
    </div>
  )
}

export default ProfileHeader