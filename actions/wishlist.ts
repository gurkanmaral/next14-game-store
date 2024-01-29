"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const addToWishlist = async (userId:string,gameId:string) => {

    try {
     
        const updatedUser = await db.user.update({
             where:{
                id:userId,
             },
             data:{
                wishlistGames:{
                    connect:{
                        id:gameId,
                    }
                }
             }
        })
        revalidatePath("/")

        if(updatedUser) {
            revalidatePath(`/game-details/${gameId}`)
        }

        const game = await db.game.findUnique({
            where: {
                id: gameId
            },
            select: {
                title: true 
            }
        });
        if (game && game.title) {
            return game.title; 
           
        } else {
            throw new Error("Game not found");
        }
        
    } catch (error) {
        throw new Error("Interal Error");
    }

}



export const removeFromWishlist = async(userId:string,gameId:string) => {

    try {
        const user = await db.user.findUnique({
            where:{
                id:userId,
            },
            include:{
                wishlistGames:true,
            }
        })

        if(!user) {
            throw new Error("User not found");
        }
        // I will use another function to check if game is already in user's wishlist. This is just for safety.
        const isGameInWishlist = user.wishlistGames.some((game) => game.id === gameId);

        if (isGameInWishlist) {
          throw new Error("Game is already in the wishlist");
        }

        const updatedUser = await db.user.update({
             where:{
                id:userId,
             },
             data:{
                wishlistGames:{
                    disconnect:{
                        id:gameId,
                    }
                }
             }
        })
        revalidatePath("/")

        if(updatedUser) {
            revalidatePath(`/game-details/${gameId}`)
        }

        const game = await db.game.findUnique({
            where: {
                id: gameId
            },
            select: {
                title: true 
            }
        });
        if (game && game.title) {
            return game.title; 
           
        } else {
            throw new Error("Game not found");
        }  
        
    } catch (error) {
        throw new Error("Interal Error");
    }

}
export const removeGameFromWishlistAfterBuy = async (userId: string, gameId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                wishlistGames: true,
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

      
        const isGameInWishlist = user.wishlistGames.some(game => game.id === gameId);

    
        if (isGameInWishlist) {
            await db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    wishlistGames: {
                        disconnect: {
                            id: gameId,
                        }
                    }
                }
            });

        }

    
      

    } catch (error) {
        throw new Error("Internal Error");
    }
};
