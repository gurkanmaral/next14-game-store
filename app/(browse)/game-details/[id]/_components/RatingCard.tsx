"use client";

import React, { useState, useTransition } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { onAddRating, onRemoveRating } from '@/actions/rating';
import { toast } from 'sonner';

interface RatingCardProps {
    gameId:string;
    rating?:number;
}

const RatingCard = ({gameId,rating}:RatingCardProps) => {

    const [selectedRating, setSelectedRating] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleRatingChange = (value:string) => {
        setSelectedRating(value);
    };

    const handleRate = () => {
        startTransition(()=>{
            onAddRating(gameId,parseInt(selectedRating))
            .then((data)=> toast.success(`Your rating added to ${data?.game.title}`))
            .catch(()=> toast.error("Something went wrong")) 
        })
    }
    const deleteRating = () => {
        startTransition(()=>{
            onRemoveRating(gameId)
                .then((data)=> toast.success(`Your rating deleted from ${data?.game.title}`))
                .catch(()=> toast.error("Something went wrong")) 
            
        })
    }
    const getRatingColorClass = (rating:number) => {
        if (rating > 7) {
          return 'text-emerald-500';
        } else if (rating >= 5 && rating <= 7) {
          return 'text-yellow-500';
        } else {
          return 'text-red-500';
        }
      };
      const colorClass = getRatingColorClass(rating);
    console.log(selectedRating)
  return (
    <div className='col-span-1 flex flex-col gap-5 px-4'>
        {rating ? (
           <div className='flex justify-between'>
              <span className={`text-3xl ${colorClass}`}>{rating}</span>
                <Button onClick={deleteRating} disabled={isPending}>
                    Remove Rating
                </Button>
           </div>
        ): (
            <div className='flex justify-between gap-2'>
             <Select onValueChange={handleRatingChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rate" />
                     </SelectTrigger>
                        <SelectContent>
                           {[...Array(10)].map((item,index)=>(
                                <SelectItem value={(index + 1).toString()} key={index} >
                                        {index + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
        </Select> 
             <Button onClick={handleRate} disabled={isPending}>
               Add rating
            </Button>
            </div>
        )}
    </div>
  )
}

export default RatingCard