
import React from 'react'
import Logo from './Logo'
import Actions from './actions'
import Search from './Search'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-20 z-[49] bg-[#0f0d0d] px-2 lg:px-4 flex  items-center shadow-md shadow-black'>
       <div className='flex justify-between md:pl-5 md:pr-5 mx-auto w-full items-center'>
         <Logo />
        <Search />
        <Actions />
       </div>
    </nav>
  )
}

export default Navbar