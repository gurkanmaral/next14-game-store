import AddLike from './AddLike';
import { getCommentLikeByUser } from '@/data/comment/get-comments';
import Link from 'next/link';

interface CommentProp {
    comment:CommentProps;
    userId:string;
}

type CommentProps = {
    id:string;
    userId: string;
    gameId: string;
    review: string;
    parentId: string | null;
    likes: CommentLikes[] | [];
    createdAt: Date;
    user: CommentUser
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
const Comment = async({comment,userId}:CommentProp) => {

    const isLiked = await getCommentLikeByUser(userId,comment.id)
    console.log(comment)

  return (
    <div className='bg-black col-span-1 rounded-lg p-4 grid grid-cols-8 shadow-md shadow-white/15'>
        <div className='col-span-2 md:col-span-1  '>
            <img src={comment.user.image ? comment.user.image : "/char.svg"} alt=""  className='h-[50px]  md:h-[100px] w-[50px] md:w-[100px] rounded-full  object-cover'/>
        </div>
        <div className='col-span-6 md:col-span-7 flex flex-col w-full gap-2'>
            <Link href={`/${comment.user.id}`}>
                <h1 className='text-2xl font-bold'>{comment.user.name}</h1>
            </Link>
            <div>
               <p className='text-gray-400 text-base'>
               {comment.review}
               </p>
            </div>
           <div className='flex  gap-4 mt-2 items-center '>
              <div className='text-sm md:text-base'>
                  <span>{comment.numberOfLikes} Likes</span>
              </div>
              <div>
                  <AddLike commentId={comment.id} userId={userId} gameId={comment.gameId} isLiked={isLiked}/>
              </div>
              <div>
                <Link href={`/comments/${comment.id}`}>
                <p className='text-sm md:text-base'>{comment._count.children} Comment</p>
                </Link>
            </div>
            </div>           
        </div>
    </div>
  )
}

export default Comment