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
            <aside className="shadow-md mt-10 rounded-[10px] left-5 fixed flex flex-col w-[70px] lg:w-60 h-[70%] bg-background border-r border-[#2D2E35] z-50">
                <ToggleSkeleton />
                <NavItemSkeleton />
                <NavItemSkeleton />
                <NavItemSkeleton />
            </aside>
        )
    }
    

  return (
    <aside className={cn("shadow-md transition-width mt-10 rounded-[10px] fixed left-5 w-60 h-[70%] bg-background border border-[#2D2E35] z-50",
    collapsed ? "w-[70px] transition-all" : "w-60 transition-all")}>
        {children}
    </aside>
  )
}

export default Wrapper