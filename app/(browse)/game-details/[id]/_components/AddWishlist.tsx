"use client";
import { addToWishlist, removeFromWishlist } from '@/actions/wishlist';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface AddWishlistProps {
    isWishlist:boolean;
    userId:string;
    gameId:string;
}

const AddWishlist = ({isWishlist,userId,gameId}:AddWishlistProps) => {

    const [isPending,startTranstition] = useTransition();
    const router = useRouter()

    const handleAddFavorite = () =>{
        startTranstition(()=>{
            addToWishlist(userId,gameId)
                .then((data)=> {
                    toast.success(`${data} added to your favorites`)               
                } )
                .catch((data)=> toast.error(data.message))
        })
    }
    const handleRemoveFavorite = () =>{
        startTranstition(()=>{
            removeFromWishlist(userId,gameId)
                .then((data)=> {
                    toast.success(`${data} removed from your favorites`)
                   
                } )
                .catch((data)=> toast.error(data.message))
        })
    }

const toggleFavorite = () => {
    if (!userId) {
        return router.push("/auth/login");
      }

    if(isWishlist) {
        handleRemoveFavorite()
    }else{
        handleAddFavorite()
    }

}


  return (
    <div className='col-span-1 flex flex-col gap-5 px-4'>
        <Button onClick={toggleFavorite} disabled={isPending}>
        {isWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </Button>

    </div>
  )
}

export default AddWishlist