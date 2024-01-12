import Link from 'next/link';
import React from 'react'
import { PiArrowCircleUpRight } from "react-icons/pi";

interface TopSellersCardProps {
    item:string;
    active: number; 
    setActive: React.Dispatch<React.SetStateAction<number>>; 
    index: number;
  id: number;
  name: string;
}

const TopSellersCard = ({item,active,setActive,index,id,name}:TopSellersCardProps) => {


  return (
    <div 
    onClick={() => setActive(id)} 
    className={`relative flex items-center justify-center h-[700px] topSellerCardTransition cursor-pointer
     ${active === id ? "flex-[3.5]" : "flex-[0.5]"}`}>
       <img src={item} alt="" className='absolute w-[100%] h-[100%] object-cover rounded-[24px]' />
        {active !== id ? (
            <div className='absolute z-0 bottom-[1%] left-[20px] transform rotate-90 w-[200px] transform-origin text-[15px]
            h-[75px]'>
                <h3 className='text-[20px] font-bold'>
                {name}
                </h3>
            </div>
        ): (
            <div className='absolute bottom-0 flex w-[100%] justify-center h-[100px] rounded-[24px] items-center p-[5px] flex-col bg-black bg-opacity-50'>
                <div className='flex rounded-[24px] items-center justify-center self-end w-[60px] h-[60px] bg-rgba-25 box-shadow-custom
                backdrop-blur-4px webkit-backdrop-blur-4px border-1 border-rgba-18  z-[99]'>
                   <Link href="/">
                        <PiArrowCircleUpRight className="w-8 h-8" />
                   </Link>
                </div>
                <div className='absolute top-[30px]' >
                        <h2>
                            {name}
                        </h2>
                </div>
            </div>
        )}
    </div>
  )
}

export default TopSellersCard