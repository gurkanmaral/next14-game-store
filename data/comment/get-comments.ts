import { db } from "@/lib/db";

export const getCommentsByGameId = async (gameId: string) => {

    try {
        const comments = await db.comment.findMany({
            where:{
                gameId:gameId,
                parentId:null,
            },
            include:{
                user:{
                    select:{
                        id:true,
                        image:true,
                        name:true
                    }
                },
                likes: true,
                _count: {
                    select: { children: true }  
                }
            },
            
            
        })
        const commentsWithLikes = comments.map((comment) => ({
            ...comment,
            numberOfLikes: comment.likes.length,
          }));
        return commentsWithLikes

    } catch (error) {
        throw new Error("Internal Error");
    }
}

export const getCommentLikeByUser = async (userId:string,commentId:string) => {

    try {
        const existingLike = await db.commentLike.count({
            where:{
                userId:userId,
                commentId:commentId,
            }
        })

        return existingLike > 0;
    } catch (error) {
        console.error("Error in getCommentLikeByUser:", error);
        throw new Error("Internal Error");
    }
}