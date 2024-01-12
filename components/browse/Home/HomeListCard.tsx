import React from 'react'

const HomeListCard = () => {
  return (
    <div className=' hover:bg-rgb-18 px-2 col-span-1 transition-all cursor-pointer grid grid-cols-3 gap-3 rounded-[10px] pl-6 py-2'>
       <div className='col-span-1 p-2 overflow-hidden '>
            <img src="/assas1.jpg" alt="" 
            className='w-full  object-cover rounded-[10px] aspect-4/3 shadow-md shadow-white/15'
            />
       </div>
       <div className='col-span-2 flex flex-col justify-center items-start gap-4 ml-3 '>
            <h1>Sekiro</h1>
            <h3>300$</h3>
       </div>

    </div>
  )
}

export default HomeListCard