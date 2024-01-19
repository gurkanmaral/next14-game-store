"use client";


import { addCommentToGame } from '@/actions/comment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner';

interface AddCommentProps {
    userId:string;
    gameId:string;
}

const AddComment = ({userId,gameId}:AddCommentProps) => {

    const [comment, setComment] = useState("");
    const [isPending,startTransition] = useTransition();


    const handleAddingComment = () => {
        startTransition(()=>{
            addCommentToGame(userId,gameId,comment)
                .then((data)=> {
                    toast.success(`Your comment added to ${data?.game.title}`)
                    setComment("");
                } )
                .catch((data)=> toast.error(data.message))
        });
    };
    
    

  return (
    <div className='space-y-4'>
    <h1 className='text-2xl'>Add comment</h1>
  <Textarea
  value={comment}
  onChange={(e)=>setComment(e.target.value)}
  className='border border-white/15 bg-black text-white'
  />
  <Button onClick={handleAddingComment} size="lg" disabled={isPending}>
    Send
  </Button>
</div>  
  )
}

export default AddComment