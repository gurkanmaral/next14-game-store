"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { NavItemSkeleton } from "./NavItem";

interface WrapperProps {
    children: React.ReactNode;
  };

const Wrapper = ({children}:WrapperProps) => {
    const isClient = useIsClient();
    const {collapsed} = useSidebar((state)=>state);

    if(!isClient) {
        return (
            <aside className="shadow-md shadow-black  md:mt-10 rounded-[10px] md:left-5 fixed flex flex-col w-[70px] lg:w-60 h-[100%] md:h-[70%] bg-[#0f0d0d] border-r border-[#2D2E35] z-50">
                <ToggleSkeleton />
                <NavItemSkeleton />
                <NavItemSkeleton />
                <NavItemSkeleton />
            </aside>
        )
    }
    

  return (
    <aside className={cn("shadow-md shadow-black border-none bg-[#0f0d0d] transition-width md:mt-10 rounded-[10px] fixed left-0 md:left-5 w-60 h-[100%] md:h-[70%]  z-50",
    collapsed ? "w-[70px] transition-all" : "w-60 transition-all")}>
        {children}
    </aside>
  )
}

export default Wrapper