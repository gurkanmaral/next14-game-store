import { db } from "@/lib/db";



export const getBoughtGamesByUserId = async () => {

    try {
        const boughtGames = await db.boughtGame
        
    } catch (error) {
        throw new Error("Internal Error");
    }
}