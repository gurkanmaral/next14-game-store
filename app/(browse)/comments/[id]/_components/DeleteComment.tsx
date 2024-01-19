"use client";
import { deleteComment } from '@/actions/comment';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface DeleteCommentProps {
    commentId:string;
    userId:string;
    isParent:boolean;
}

const DeleteComment = ({commentId,userId,isParent}:DeleteCommentProps) => {

    const router = useRouter();
    const [isPending,startTransition] = useTransition();


    const handleDeleteComment = () => {
        startTransition(()=>{
            deleteComment(commentId)
            .then((data)=>{toast.success("comment is deleted")})
        })
        if(isParent) {
            router.push("/")
        }
    }

  return (
    <Button onClick={handleDeleteComment}>
       <Trash className='w-4 h-4 text-red-500' />
    </Button>
  )
}

export default DeleteComment