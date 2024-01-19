"use client";
import { Input } from '@/components/ui/input'
import React from 'react'

const UserSearch = ({value,setValue}) => {

  return (
    <div className='mt-5 w-full items-center justify-center flex' >
        <Input 
        placeholder='Search users'
        onChange={(e)=>setValue(e.target.value)}
        value={value}
        className='bg-black text-white border border-white/15 w-full md:w-[50%]'
        />

    </div>
  )
}

export default UserSearch