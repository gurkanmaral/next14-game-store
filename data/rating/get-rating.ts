import { getSelf } from "@/lib/auth";
import { db } from "@/lib/db";

export const getAverageRatingOfGame = async(gameId:string) => {

    try {
        const ratingsAggregate = await db.rate.aggregate({
            where: {
                gameId: gameId
            },
            _avg: {
                rate: true
            },
            _count: {
                rate: true
            }
        });

        if (!ratingsAggregate) {
            return { averageRating: 0, ratingCount: 0 };
        }

        
        const averageRating = ratingsAggregate._avg.rate ? parseFloat(ratingsAggregate._avg.rate.toFixed(1)) : 0;
        const ratingCount = ratingsAggregate._count.rate;

        return { averageRating, ratingCount };

    } catch (error) {
        console.error('Error fetching average game rating:', error);
        return { averageRating: 0, ratingCount: 0 };
    }
}


export const getGameRatingByUser = async(gameId:string) => {

    try {
        const self = await getSelf();

        const existingRating = await db.rate.findFirst({
            where:{
                userId:self.id,
                gameId:gameId
            }
        })

        if(!existingRating) return 

        return existingRating.rate

    } catch (error) {
        console.log(error)
    }

}

export const addRating = async(gameId:string,rate:number) => {

    const self = await getSelf();

    if (!self) {
        throw new Error("User not found");
    }

    try {
   
        const existingRating = await db.rate.findFirst({
            where:{
                userId:self.id,
                gameId:gameId
            }
        })
        if(existingRating) {
            throw new Error("Already rated ");
        }
        
        const newRating = await db.rate.create({
            data:{
                userId:self.id,
                gameId:gameId,
                rate:rate
            },
            include:{
                game:{
                    select:{
                        title:true,
                    }
                }
            }
        })
        return newRating
        
    } catch (error) {
        console.log(error)
    }

}

export const removeRating = async(gameId:string) => {
    try {
        const self = await getSelf();

        const existingRating = await db.rate.findFirst({
            where:{
                userId:self.id,
                gameId:gameId
            }
        })
        if(!existingRating) {
            throw new Error("No rating added to this game");
        }
        
        const deleteRating = await db.rate.delete({
           where:{
                id:existingRating.id,
           },
           include:{
            game:true,
           }
        })
        
        return deleteRating
        
    } catch (error) {
        console.log(error)
    }

}