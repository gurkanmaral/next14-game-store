import Link from 'next/link';
import React from 'react'
import { PiArrowCircleUpRight } from "react-icons/pi";

interface TopSellersCardProps {
    item:string;
    active: number; 
    setActive: React.Dispatch<React.SetStateAction<number>>; 
    index: number;
  id: string;
  name: string;
}

const TopSellersCard = ({item,active,setActive,index,id,name}:TopSellersCardProps) => {


  return (
    <div 
    onClick={() => setActive(id)} 
    className={`relative flex items-center justify-center h-[700px] topSellerCardTransition cursor-pointer
     ${active === id ? "flex-[3.5]" : "flex-[0.5] "}`}>
       <img src={item} alt="" className={`absolute w-[100%] h-[100%] object-cover rounded-[24px] ${active === id ? "" : "opacity-75"}`} />
        {active !== id ? (
            <div className='absolute z-0 bottom-[100px]  left-[100px] w-[200px] transform rotate-90 h-[100px] transform-origin'>
                <h3 className='hidden md:flex md:text-2xl font-bold'>
                {name} 
                </h3>
            </div>
        ): (
            <div className='absolute bottom-0 flex w-[100%] justify-end md:justify-center h-[200px] md:h-[100px] rounded-[24px] items-center p-[5px] flex-col bg-black bg-opacity-50'>
                <div className='flex rounded-[24px] items-center justify-center self-end w-[60px] h-[60px] bg-rgba-25 box-shadow-custom
                backdrop-blur-4px webkit-backdrop-blur-4px border-1 border-rgba-18  z-[99]'>
                   <Link href={`game-details/${id}`}>
                        <PiArrowCircleUpRight className="w-8 h-8 hover:text-emerald-500" />
                   </Link>
                </div>
                <div className='absolute top-[50px] md:top-[30px]' >
                        <h2 className='text-base md:text-3xl font-bold'>
                            {name}
                        </h2>
                </div>
            </div>
        )}
    </div>
  )
}

export default TopSellersCard