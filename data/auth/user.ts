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
            include:{
                orders:{
                    include:{
                        boughtGames:{
                            select: {
                                gameId: true 
                            }
                        }
                    }
                },
                favoriteGames:{
                  select:{
                    id:true,
                    title:true,
                    allImages:true,
                  }
                },
                wishlistGames:{
                    select:{
                        id:true,
                        title:true,
                        allImages:true,
                      }
                }
            }
        })
       
        let gamesCount = 0;
        user?.orders.forEach(order => {
            gamesCount += order.boughtGames.length;
        });

        const commentsCount = await db.comment.count({
            where: { userId: id }
        });

        const wishlistGamesCount = await db.game.count({
            where:{
                usersWishlist:{
                    some:{
                        id:id
                    }
                }
            }
        })
        
        return {
            ...user,
            gamesCount,
            commentsCount,
            wishlistGamesCount,
        };
    } catch (error) {
        return null;
    }
}
