"use client";
import { addLikeToComment, removeLikeFromComment } from '@/actions/comment';
import { Button } from '@/components/ui/button';
import { getCommentLikeByUser } from '@/data/comment/get-comments';
import React, { useEffect, useState, useTransition } from 'react'
import { Heart } from "lucide-react";
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AddLikeToCommentProps {
    commentId:string;
    userId:string;
    gameId:string;
    isLiked:boolean;
}

const AddLike = ({commentId,userId,gameId,isLiked}:AddLikeToCommentProps) => {
    const [isPending, startTransition] = useTransition();
   
  
  const router = useRouter(); 

   const handleAddLike = () => {
    startTransition(()=>{
        addLikeToComment(userId,commentId,gameId)
    })
   }

   const handleRemoveLike = () => {
    startTransition(()=>{
        removeLikeFromComment(userId,commentId,gameId)
    })
   }

   const toggleFollow = () => {
   
    if (!userId) {
      return router.push("/auth/login");
    }
    
    if (isLiked) {
        handleRemoveLike();
    } else {
        handleAddLike();
    }
  }

  return (
    <Button
    disabled={isPending }
    onClick={toggleFollow}
    size="sm"
    variant="ghost"
    className="w-full lg:w-auto"
  >
    <Heart className={cn(
      "h-4 w-4 mr-2",
      isLiked
        ? "fill-red-500"
        : "fill-none"
    )} />
    {isLiked
      ? "Unlike"
      : "Like"
    }
  </Button>
  )
}

export default AddLike