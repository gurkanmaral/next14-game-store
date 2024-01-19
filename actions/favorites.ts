"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const addGameToFavorite = async (userId:string,gameId:string) => {

    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                favoriteGames: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }
        
        if (user.favoriteGames && user.favoriteGames.length >= 3) {
            throw new Error("Favorite games limit reached");
        }

        const favorite = await db.user.update({
            where:{
                id:userId
            },
            data:{
                favoriteGames:{
                    connect:{
                        id:gameId
                    }
                }
            }

        })
        revalidatePath("/")

        if(favorite) {
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
        throw new Error("Internal Error");
    }
}

export const removeGameFromFavorites = async (userId:string,gameId:string) => {

    try {

        const favorite = await db.user.update({
            where:{
                id:userId
            },
            data:{
                favoriteGames:{
                    disconnect:{
                        id:gameId
                    }
                }
            }

        })
        revalidatePath("/")

        if(favorite) {
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
        throw new Error("Internal Error");
    }
}