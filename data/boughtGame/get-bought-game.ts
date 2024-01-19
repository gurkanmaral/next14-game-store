import { db } from "@/lib/db";


export const getBoughtGameByOrderId = async (orderId:string) => {

    try {
        const boughtGame = await db.boughtGame.findMany({
            where:{
                orderId
            }
        })
        return boughtGame
    } catch (error) {
        return null;
    }
}