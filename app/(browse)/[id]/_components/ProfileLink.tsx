"use client";

import { usePathname } from "next/navigation";
import ProfileLinks from "./ProfileLinks";


interface ProfileLinkProps {
  userId?: string; 
}

const ProfileLink = ({userId}:ProfileLinkProps) => {

    const pathname = usePathname()


    const routes = [
        {
          label:"Overview",
          href: `/${userId}`,
      },
      {
          label:"Library",
          href:`/${userId}/library`,
      },
      {
          label:"Wishlist",
          href:`/${userId}/wishlist`,
      },
      {
        label:"Following",
        href:`/${userId}/following`,
      },
      {
        label:"Followers",
        href:`/${userId}/followers`,
      }
      ]
  return (
    <div className="mt-20 px-2 md:px-0 w-full flex gap-5">
      {routes.map((route)=>(
        <ProfileLinks 
        key={route.label}
        label={route.label}
        isActive={route.href === pathname}
        href={route.href}
        />
      ))}

    </div>
  )
}

export default ProfileLink