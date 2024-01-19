import { db } from "@/lib/db"

export const getOrderByUserId = async(userId:string,gameId:string) => {

    try {
        const order = await db.order.findMany({
            where:{
                userId,
                boughtGames:{
                    some:{
                        gameId:gameId
                    }
                }
            },
            include:{
                boughtGames:{
                    select:{
                        gameId:true,
                    }
                }
            }
        })
        return order
    } catch (error) {
        
    }
}