"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import {useMediaQuery} from "usehooks-ts";


interface ContainerProps {
    children: React.ReactNode;
  };

const Container = ({children}:ContainerProps) => {

    const matches = useMediaQuery("(max-width: 1024px)");

    const {collapsed,onCollapse,onExpand} = useSidebar((state)=>state);

    useEffect(()=>{
        if(matches) {
            onCollapse();
        }else {
            onExpand();
        }
    },[matches,onCollapse,onExpand])

    return (
        <div className={cn("flex-1",
        collapsed ? "ml-[90px] transition-all": "ml-[90px] md:ml-[260px]  transition-all")}>    
             {children}     
        </div>
    )


}

export default Container

