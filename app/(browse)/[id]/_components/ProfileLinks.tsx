import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

interface ProfileLinksProps {
    label:string;
    isActive:boolean;
    href:string;
}


const ProfileLinks = ({label,isActive,href}:ProfileLinksProps) => {

  return (
    <Link href={href} className={cn("text-bold text-2xl hover:text-gray-300",isActive && "border-b border-white/15")}>
        {label}
    </Link>
  )
}

export default ProfileLinks