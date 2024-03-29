"use client";

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { IoHomeOutline } from "react-icons/io5";


interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isActive: boolean;
  };
  
const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive,
}:NavItemProps) => {
    const { collapsed } = useSidebar((state) => state);
    

  return (
    <Button asChild variant="sidebarButton" className={cn("w-full h-12", collapsed ? "justify-center":"justify-start",
    isActive && "bg-[#303030] shadow-sm shadow-black/20")}>
        <Link href={href}>
            <div className='flex items-center gap-x-4'>
                <Icon 
                className={cn(
                    "h-5 w-5",
                    collapsed ? "mr-0" : "mr-2"
                  )} 
                />
                {!collapsed && (
                    <span>
                        {label}
                    </span>
                )}
            </div>
        </Link>
    </Button>
  )
}

export default NavItem

export const NavItemSkeleton = () => {
    return (
        <li className='flex items-center gap-x-4 px-3 py-2'> 
            <Skeleton className='min-h-[48px] min-w-[48px] rounded-md' />
            <div className='flex-1 hidden lg:block'>
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};