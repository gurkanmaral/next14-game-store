
import React from 'react'
import Logo from './Logo'
import Actions from './actions'
import Search from './Search'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex  items-center shadow-md'>
       <div className='flex justify-between pl-5 pr-5 mx-auto w-full items-center'>
         <Logo />
        <Search />
        <Actions />
       </div>
    </nav>
  )
}

export default Navbar