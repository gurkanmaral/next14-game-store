"use client";
import { useSidebar } from '@/store/use-sidebar';
import NavItem, { NavItemSkeleton } from './NavItem'
import { cn } from '@/lib/utils';
import { Compass, Home, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';

const NavItems = () => {

    const pathname = usePathname();

    const { collapsed } = useSidebar((state) => state);

    const isClient = useIsClient();

     if(!isClient) {
         return (
             <ul className='space-y-2'>
                 {[...Array(4)].map((_, i) => (
                 <NavItemSkeleton key={i} />
                ))}
     </ul>
         )
 }

    const routes = [
        {
            label:"Home",
            href: "/",
            icon:Home
        },
        {
            label:"Profile",
            href:`/username`,
            icon:User,
        },
        {
            label:"Discover",
            href:"/discover",
            icon:Compass,
        }
    ]

  return (
    <ul className={cn(" flex flex-col p-2 space-y-10 w-full", collapsed ? "items-center justify-center" : "justify-start ")}>
       {routes.map((route)=>(
        <NavItem 
        key={route.href}
        label={route.label}
        icon={route.icon}
        href={route.href}
        isActive={pathname === route.href}
        />
       ))}
    </ul>
  )
}

export default NavItems