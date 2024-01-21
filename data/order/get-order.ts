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
        console.log(error)
    }
}


export const getOrdersByUserId = async(userId:string) => {

    try {
            const orders = await db.order.findMany({
                    where:{
                        userId                    
                    },                               
                    include:{
                        boughtGames:{
                            select:{
                                gameId:true,
                            }
                        }
                    }
            })

            const gameIds = orders.flatMap(order => 
                order.boughtGames.map(boughtGame => boughtGame.gameId)
            );
    
            return gameIds;
    } catch (error) {
        console.log(error)
        return []
    }
}
