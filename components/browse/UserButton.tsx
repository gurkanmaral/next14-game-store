
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { FaUser } from 'react-icons/fa'
import LogoutButton from './LogoutButton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { currentUser } from '@/lib/auth'



const UserButton = async() => {
    const user = await currentUser();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""}  />
                <AvatarFallback className='bg-sky-500'>
                    <FaUser className="text-white" />
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40' align='end'>
            <LogoutButton>
               <DropdownMenuItem>
                <LogOut className='h-4 w-4 mr-2' />
                Logout
               </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton