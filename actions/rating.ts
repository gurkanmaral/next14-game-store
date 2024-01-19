"use server";

import { addRating, removeRating } from "@/data/rating/get-rating";
import { revalidatePath } from "next/cache";


export const onAddRating = async (gameId:string,rate:number) => {

    try {
        const rateGame = await addRating(gameId,rate);

        revalidatePath("/");

        if(rateGame) {
            revalidatePath(`/game-details/${gameId}`)
        }

        return rateGame;


    } catch (error) {
        throw new Error("Interal Error");
    }
}

export const onRemoveRating = async (gameId:string) => {

    try {

        const removeRate = await removeRating(gameId);
        
        revalidatePath("/");

        if(removeRate) {
            revalidatePath(`game-details/${gameId}`)
        }

        return removeRate;


    } catch (error) {
        throw new Error("Interal Error");
    }
}

