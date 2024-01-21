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
    <div className='col-span-1 grid grid-cols-1 md:grid-cols-8 p-4 relative gap-4 items-center w-full bg-black shadow-md shadow-white/15'>    
        <div className='col-span-1 md:col-span-2  '>
            <img src={user.image ? user.image : "/assas1.jpg"} alt=""  className='h-[100px] w-[100px] rounded-full  object-cover'/>
        </div>
        <div className='col-span-1 md:col-span-6 flex flex-col w-full gap-2'>
            <div>
                <h1 className='text-2xl font-bold'>{user.name}</h1>
            </div>
            <div>
               <p className='text-gray-400'>
               {review}
               </p>
            </div>
           <div className="flex gap-4 items-center">
           <div>
              <span>{likeCount} Likes</span> 
            </div>
            <div>
              <AddLike commentId={id} userId={user.id} gameId={gameId} isLiked={isLiked} /> 
            </div>
           </div>
            <div>
              <div className='absolute top-5 right-5'>
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