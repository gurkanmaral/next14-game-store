
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, useTransition } from 'react'
import Comment from './Comment';
import { addCommentToGame } from '@/actions/comment';
import { toast } from 'sonner';
import AddComment from './AddComment';
import { Separator } from '@/components/ui/separator';

interface CommentsProps {
    userId:string;
    gameId:string;
    comments:CommentProps[];
}

type CommentProps = {
  id:string;
  userId: string;
  gameId: string;
  review: string;
  parentId: string | null;
  likes: CommentLikes[] | [];
  createdAt: Date;
  user: CommentUser,
  numberOfLikes:number;
}

type CommentUser ={
  id:string;
  image:string | null;
  name:string;
}

type CommentLikes = {
  id:string;
  userId:string;
  commentId:string;
  createdAt: string;

}

const Comments = ({userId,gameId,comments}:CommentsProps) => {

 
  return (
    <div className='flex flex-col mt-10 gap-4'>       
       <AddComment userId={userId} gameId={gameId} />
       <Separator />
        <div className='grid grid-cols-1 px-0 md:px-10'>
           {comments.map((comment)=>(
            <Comment 
            key={comment.id}
            comment={comment}
            userId={userId}
            />
           ))}
        </div>
    </div>
  )
}

export default Comments