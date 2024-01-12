import Link from 'next/link'
import React from 'react'


const AdminHome = () => {
  return (
    <div className='border border-white w-full h-full max-w-[1440px]'>
        
        <Link href="/admin/create-game">
            Create Game
        </Link>

    </div>
  )
}

export default AdminHome