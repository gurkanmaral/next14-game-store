import { db } from "@/lib/db";

export const getComment = async (commentId: string, userId: string) => {
    try {
        const commentDetails = await fetchCommentWithChildren(commentId);
        if (!commentDetails) return null;

       
        const childCommentIds = commentDetails.children.map(child => child.id);
        const likesForChildrenPromise = fetchLikesForComments(userId, childCommentIds);
        const userLikeForParentPromise = checkUserLikeOnComment(userId, commentId);

       
        const [likesForChildren, userLikeForParent] = await Promise.all([
            likesForChildrenPromise,
            userLikeForParentPromise
        ]);

       
        const updatedChildren = commentDetails.children.map(child => ({
            ...child,
            userHasLiked: likesForChildren.some(like => like.commentId === child.id)
        }));

        return {
            ...commentDetails,
            children: updatedChildren,
            numberOfLikes: commentDetails._count.likes,
            userHasLiked: !!userLikeForParent
        };
    } catch (error) {
        console.error("Error in getComment:", error);
        throw new Error("Internal Error");
    }
};
export const fetchCommentWithChildren = async (commentId:string) => {
    try {
        return await db.comment.findUnique({
            where: { id: commentId },
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
    } catch (error) {
        console.error("Error fetching comment:", error);
        throw new Error("Internal Error");
    }
}

export const checkUserLikeOnComment = async(userId:string, commentId:string) => {
    try {
        const like = await db.commentLike.findFirst({
            where: { commentId: commentId, userId: userId }
        });
        return !!like;
    } catch (error) {
        console.error("Error checking user like:", error);
        throw new Error("Internal Error");
    }
}

export const fetchLikesForComments = async(userId:string, commentIds:string) => {
    try {
        return await db.commentLike.findMany({
            where: { commentId: { in: commentIds }, userId: userId }
        });
    } catch (error) {
        console.error("Error fetching likes:", error);
        throw new Error("Internal Error");
    }
}

