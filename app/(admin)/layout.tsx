import React from 'react'

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full h-auto flex items-center justify-center'>
        {children}
    </div>
  )
}

export default AdminLayout