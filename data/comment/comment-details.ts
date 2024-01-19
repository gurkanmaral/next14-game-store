import { db } from "@/lib/db";

export const getComment = async (commentId: string, userId: string) => {
    try {
        const commentDetails = await db.comment.findUnique({
            where: {
                id: commentId
            },
            include: {
                children: {
                    include:{
                        user:{
                            select:{
                                id:true,
                                image:true,
                                name:true,
                            }
                        },
                        likes: {
                            select: {
                                id: true,
                            }
                        },
                        _count: {
                            select: { likes: true }
                        }
                    }
                },
                user:{
                    select:{
                        id:true,
                        image:true,
                        name:true,
                    }
                },
                likes: {
                    select: {
                        id: true 
                    }
                },
                _count: {
                    select: { likes: true } 
                }
            },
        });

      // Adding checks for user likes on both parent and child comments
      const updatedChildren = await Promise.all(commentDetails.children.map(async child => {
        const userLike = await db.commentLike.findFirst({
            where: {
                commentId: child.id,
                userId: userId
            }
        });

        return {
            ...child,
            userHasLiked: !!userLike
        };
    }));

    const commentWithUserLike = {
        ...commentDetails,
        children: updatedChildren, // Updated children with user like info
        numberOfLikes: commentDetails._count.likes,
        userHasLiked: !!await db.commentLike.findFirst({
            where: {
                commentId: commentId,
                userId: userId
            }
        })
    };

    return commentWithUserLike;
    } catch (error) {
        console.error("Error in getComment:", error);
        throw new Error("Internal Error");
    }
}

