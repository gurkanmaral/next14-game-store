import React from 'react'
import Wrapper from './Wrapper'
import Toggle, { ToggleSkeleton } from './toggle'
import NavItems from './NavItems'

const Sidebar = () => {
  return (
    <Wrapper>
        <Toggle />
        <div className='space-y-4 pt-4 lg:pt-0 '>
            <NavItems />
        </div>
    </Wrapper>
  )
}

export default Sidebar

export const SidebarSkeleton = () => {
    return (
        <aside className='fixed left-5 mt-10 rounded-[10px] flex flex-col w-[70px] lg:w-60 h-[70%] bg-background border-r border-[#2D2E35] z-50'>
            <ToggleSkeleton />
        </aside>
    )
}