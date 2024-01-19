"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addCommentToGame = async (userId:string,gameId:string,review:string) => {

    try {
        
        const comment = await db.comment.create({
            data:{
                userId,
                gameId,
                review,
                parentId: null,
                createdAt: new Date(), 
            },
            include:{
                game:{
                    select:{
                        title:true,
                    }   
                }
            }
        })
        revalidatePath("/");

        if(comment) {
            revalidatePath(`/game-details/${gameId}`) 
        }
        return comment
        
    } catch (error) {
    if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        throw new Error("You already commented on this game. Delete your comment to add again.");
      } else {
        throw new Error("Internal Error");
      }
    }
} 

export const addLikeToComment = async(userId:string,commentId:string,gameId:string) => {

    try {

        const existingLike = await db.commentLike.findFirst({
            where:{
                userId,
                commentId,
            }
        })
        if(existingLike) {
            throw new Error("Already liked");
        }
        const like = await db.commentLike.create({
            data:{
                userId,
                commentId,
                createdAt: new Date(),
            }
        })
        if(like) {
            revalidatePath(`/game-details/${gameId}`);
        }
        return like;
    } catch (error) {
        throw new Error("Internal Error");
    }
}

export const removeLikeFromComment = async(userId:string,commentId:string,gameId:String) => {

    try {

        const existingLike = await db.commentLike.findFirst({
            where:{
                userId,
                commentId,
            }
        })

        if(!existingLike) {
            throw new Error("Like does not exist");
        }

        const like = await db.commentLike.delete({
            where:{
                id:existingLike.id
            }
        })
        if(like) {
            revalidatePath(`/game-details/${gameId}`);
        }
        return like;
    } catch (error) {
        throw new Error("Internal Error");
    }
}

export const addCommentToComment = async (userId:string,parentId:string,gameId:string,review:string) => {

    try {
        const comment = await db.comment.create({
            data:{
                userId,
                review,
                parentId,
                gameId,
            }
        })
        revalidatePath("/");

        if(comment) {
            revalidatePath(`/comments/${gameId}`) 
        }
        return comment
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes("Unique constraint failed")
          ) {
            throw new Error("You already commented on this game. Delete your comment to add again.");
          } else {
            throw new Error("Internal Error");
          }
    }

}


export const deleteComment = async (commentId:string) => {

    try {
       const childComments = await db.comment.findMany({
        where:{
            parentId:commentId
        }
       })

       if (childComments.length > 0) {
        for (const child of childComments) {
            await deleteComment(child.id);
        }
    }
    revalidatePath("/")

    const rootParentId = await findRootParentId(commentId);

        await db.comment.delete({
        where:{
            id:commentId
        }
       })
      
       if (rootParentId && rootParentId !== commentId) {
        revalidatePath(`/comments/${rootParentId}`);
    } else {
        revalidatePath("/");
    }

       return { message: "Comment and its child comments deleted successfully" };
    } catch (error) {
         throw new Error("Internal Error");
    }

}

export const findRootParentId = async (commentId:string) => {

    try {
        let currentComment = await db.comment.findUnique({
            where: { id: commentId }
        });

        while (currentComment?.parentId) {
            currentComment = await db.comment.findUnique({ where: { id: currentComment.parentId } });
        }
        return currentComment?.id;
    } catch (error) {
        console.error("Error in findRootParentId:", error);
        throw new Error("Internal Error");
    }

}