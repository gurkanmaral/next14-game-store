"use client";
import { addGameToFavorite, removeGameFromFavorites } from '@/actions/favorites';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface AddFavoritesProps {
    isFavorite:boolean;
    userId:string;
    gameId:string;
}

const AddFavorites = ({isFavorite,userId,gameId}:AddFavoritesProps) => {
        const [isPending,startTranstition] = useTransition();
        const router = useRouter()

    const handleAddFavorite = () =>{
        startTranstition(()=>{
            addGameToFavorite(userId,gameId)
                .then((data)=> {
                    toast.success(`${data} added to your favorites`)
                   
                } )
                .catch((data)=> toast.error(data.message))
        })
    }
    const handleRemoveFavorite = () =>{
        startTranstition(()=>{
            removeGameFromFavorites(userId,gameId)
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

    if(isFavorite) {
        handleRemoveFavorite()
    }else{
        handleAddFavorite()
    }

}

  return (

    <div className='col-span-1 flex flex-col gap-5 px-4'>
        <Button onClick={toggleFavorite} disabled={isPending}>
            {isFavorite ? "Remove from favorite" : "Add to favorite"}
        </Button>
       
    </div>
  )
}

export default AddFavorites