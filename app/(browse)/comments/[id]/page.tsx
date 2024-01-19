import { getComment } from '@/data/comment/comment-details';
import { currentUser } from '@/lib/auth';
import Link from 'next/link';
import React from 'react'
import AddLike from '../../game-details/[id]/_components/AddLike';
import AddCommentToComment from './_components/AddCommentToComment';
import ChildrenComments from './_components/ChildrenComments';
import { Button } from '@/components/ui/button';
import DeleteComment from './_components/DeleteComment';


interface CommentDetailsProps {
    params:{
        id:string;
    }
}


const CommentPage = async({params}:CommentDetailsProps) => {

    const user = await currentUser()

    if(!user) {
        return null
    }
    const commentDetails = await getComment(params.id,user.id)

    if(!commentDetails) {
        return null
    }
    

    

  return (
    <div className='pt-10 w-full max-w-screen-lg mx-auto gap-4 flex flex-col items-center '>
        <div className='bg-black gap-4 rounded-lg p-4 grid grid-cols-1 md:grid-cols-8 shadow-md shadow-white/15 relative'>
          <div className='col-span-1 md:col-span-2  '>
              <img src={commentDetails?.user?.image ? commentDetails.user.image : "/assas1.jpg"} alt=""  className='h-[100px] w-[100px] rounded-full  object-cover'/>
          </div>
          <div className='col-span-1 md:col-span-6 flex flex-col w-full gap-2'>
              <div>
                  <h1 className='text-2xl font-bold'>{commentDetails?.user?.name}</h1>
              </div>
              <div>
                <p className='text-gray-400'>
                {commentDetails.review}
                </p>
              </div>
            <div className='flex gap-4 items-center'>
              <div>
                    <span>{commentDetails.numberOfLikes} Likes</span>
                </div>
                <div>
                    <AddLike commentId={commentDetails.id} userId={user.id} gameId={commentDetails.gameId} isLiked={commentDetails.userHasLiked} /> 
                </div>
            </div>
              <div className='absolute top-5 right-5'>
                {commentDetails.userId === user.id && (
                <DeleteComment commentId={commentDetails.id} userId={user.id} isParent={true} />
                )}
              </div>
            
          </div>
        </div>
        <div className='w-full flex items-center justify-center '>
          <AddCommentToComment userId={user.id} gameId={commentDetails.gameId} parentId={commentDetails.id} />
        </div>
        <div className='gap-4 flex flex-col'>
          {commentDetails.children.map((comment)=>(
            <ChildrenComments 
            key={comment.id}
            review={comment.review}
            user={comment.user}
           likeCount={comment._count.likes}
           isLiked={comment.userHasLiked}
            gameId={commentDetails.gameId}
            userId={user.id}
            id={comment.id}
            />
          ))}
        </div>
    </div>
  )
}

export default CommentPage