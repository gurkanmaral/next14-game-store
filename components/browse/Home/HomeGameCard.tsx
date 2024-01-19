import { Card,  CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeGameCard = ({game}) => {

    const calculatePercangate = (num1:string,num2:string) => {

        const normalPrice = parseFloat(num1); 
        const specialPrice = parseFloat(num2);

        if (isNaN(normalPrice) || isNaN(specialPrice)) {
          
            return null;
          }

          const discount = normalPrice - specialPrice;
          const percentageOff = (discount / normalPrice) * 100;
          return percentageOff.toFixed(0); 
    }
  return (
   <Card className='col-span-1 flex flex-col gap-3 border-none bg-transparent'>
       <CardContent className='p-0 m-0'>
        <Link href={`/game-details/${game.id}`} className='overflow-hidden rounded-md cursor-pointer hover:opacity-75 hover:shadow-md hover:shadow-white/15'>
            <img
            src={game.allImages[0]}
            alt="card-image"
            className='w-full aspect-4/3 object-cover'
            />
        </Link>
        </CardContent>
        <CardFooter className='p-0 m-0 w-full'>
            <div className='flex flex-col w-full gap-3'>
                <span>{game.title}</span>
            <div className='flex w-full justify-between '>
                    <div className='bg-emerald-500 py-1 px-2 rounded-sm flex items-center justify-center'>
                        <span>{calculatePercangate(game.price,game.SpecialPrice)}%</span>
                    </div>
                    <div className='flex flex-col items-end justify-end'>
                       <span className='text-muted-foreground line-through text-sm'>{game.price}$</span>    
                       <span>{game.SpecialPrice}$</span>  
                    </div>
            </div>
            </div>
        </CardFooter>
   </Card>
  )
}

export default HomeGameCard