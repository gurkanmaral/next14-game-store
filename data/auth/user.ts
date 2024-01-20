import { db } from "@/lib/db";

export const getUserbyEmail = async (email:string) => {

    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })
        return user;
    } catch (error) {
        return null;
    }
}


export const getUserbyId = async (id:string) => {

    try {
        const user = await db.user.findUnique({
            where:{
                id
            },
        })
        if (!user) {
            return null;
        }
        
        return user;
        
    } catch (error) {
        return null;
    }
}

export const getUserGameCount = async (userId: string) => {
    try {
        const count = await db.order.count({
            where: { userId },
        });
        return count;
    } catch (error) {
        console.error("Error getting user game count:", error);
        return 0;
    }
};
export const getUserWishlistCount = async (userId: string) => {
    try {
       
        const count = await db.game.count({
            where: {
                usersWishlist: {
                    some: {
                        id: userId
                    }
                }
            }
        });
        return count;
    } catch (error) {
        console.error("Error getting user wishlist count:", error);
        return 0;
    }
};
export const getUserReviewCount = async (userId: string) => {
    try {
       
        const reviewCount = await db.comment.count({
            where: {
                userId: userId
            }
        });
        return reviewCount;
    } catch (error) {
        console.error("Error getting user review count:", error);
        return 0;
    }
};

export const getUserFavoriteGames = async (userId: string) => {
    try {
        const favoriteGames = await db.game.findMany({
            where: {
                usersFavorites: {
                    some: {
                        id: userId
                    }
                }
            },
            select: {
                id: true,
                title: true,
                allImages: true
            }
        });
        return favoriteGames;
    } catch (error) {
        console.error("Error getting user favorite games:", error);
        return [];
    }
};