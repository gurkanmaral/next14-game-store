import { db } from "@/lib/db";


export const getSearchedGames = async(term?:string) => {

    try {
        const gameTitles = await db.game.findMany({
            where:{
                title:{
                    contains:term,
                    mode: 'insensitive'
                }
            }
        })
        return gameTitles
    } catch (error) {
        console.log(error)
        throw new Error("Internal Error");
    }

}