"use client";

import AddLike from "@/app/(browse)/game-details/[id]/_components/AddLike";
import DeleteComment from "./DeleteComment";

interface ChildrenCommentsProps {
    review:string;
    user: ChildrenCommentUserProps;
    likeCount:number;
    isLiked:boolean;
    gameId:string;
    userId:string;
    id:string;
}

interface ChildrenCommentUserProps{
    id:string;
    image:string;
    name:string;
}

const ChildrenComments = ({review,user,likeCount,isLiked,gameId,userId,id}:ChildrenCommentsProps) => {



  return (
    <div className=''>
        <div className='bg-black  rounded-lg p-4 grid grid-cols-8 shadow-md shadow-white/15'>
        <div className='col-span-1  '>
            <img src={user.image ? user.image : "/assas1.jpg"} alt=""  className='h-[100px] w-[100px] rounded-full  object-cover'/>
        </div>
        <div className='col-span-7 flex flex-col w-full gap-2'>
            <div>
                <h1 className='text-2xl font-bold'>{user.name}</h1>
            </div>
            <div>
               <p className='text-gray-400'>
               {review}
               </p>
            </div>
            <div>
              <span>{likeCount}</span> 
            </div>
            <div>
              <AddLike commentId={id} userId={user.id} gameId={gameId} isLiked={isLiked} /> 
            </div>
            <div>
             {userId === user.id && (
              <DeleteComment commentId={id} userId={userId} isParent={false} />
             )}
            </div>
        </div>
        </div>

    </div>
  )
}

export default ChildrenComments