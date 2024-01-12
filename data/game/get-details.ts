import { db } from "@/lib/db";


export const getGameById = async(id:string) => {

    try {
        const game = await db.game.findUnique({
            where:{
                id
            }
        })
        return game;
    } catch (error) {
        return null;
    }

}