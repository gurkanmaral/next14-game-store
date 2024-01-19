
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { FaUser } from 'react-icons/fa'
import LogoutButton from './LogoutButton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

import { currentUser } from '@/lib/auth'
import { LogOut } from 'lucide-react'



const UserButton = async() => {
    const user = await currentUser();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""} className='w-full object-cover' />
                <AvatarFallback className='bg-red-500'>
                    <FaUser className="text-white" />
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='cursor-pointer w-40 bg-black border border-white/15' align='end'>
            <LogoutButton>
               <DropdownMenuItem className=''>
                <LogOut />
                Logout
               </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton