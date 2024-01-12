import { Card,  CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const HomeGameCard = () => {
  return (
   <Card className='col-span-1 flex flex-col gap-3 border-none bg-transparent'>
       <CardContent className='p-0 m-0'>
        <div className='overflow-hidden rounded-md cursor-pointer hover:opacity-75 hover:shadow-md hover:shadow-white/15'>
            <img
            src="/assas1.jpg" 
            alt="card-image"
            className='w-full h-[300px] object-cover'
            />
        </div>
        </CardContent>
        <CardFooter className='p-0 m-0 w-full'>
            <div className='flex flex-col w-full gap-3'>
                <span>Assassin&apos;s Creed: Valhalla</span>
            <div className='flex w-full justify-between '>
                    <div className='bg-emerald-500 py-1 px-2 rounded-sm flex items-center justify-center'>
                        <span>-15%</span>
                    </div>
                    <div className='flex flex-col items-end justify-end'>
                       <span className='text-muted-foreground line-through text-sm'>30$</span>    
                       <span>40$</span>  
                    </div>
            </div>
            </div>
        </CardFooter>
   </Card>
  )
}

export default HomeGameCard