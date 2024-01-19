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

export const recommendedGames = async (id:string) => {

    try {
       
        const game = await db.game.findUnique({
            where: {
                id
            },
            select: {
                Genres: true
            }
        });

        if (!game) {
            return null; 
        }

      
        const recommendedGames = await db.game.findMany({
            where: {
                Genres: {
                    hasSome: game.Genres 
                },
                id: {
                    not: id
                }
            },
            select:{
                id:true,
                allImages:true,
                title:true,   
                price:true,
                SpecialPrice:true,
            },
            take: 4
        });

        return recommendedGames;
    } catch (error) {
        return null;
    }


}

export const getGameDetailsInLibrary = async (id:string) => {


    try {
        const game = await db.game.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                title:true,
                allImages:true,
            }
            
        })
        return game;
    } catch (error) {
        return null;
    }
}

export const getFilteredGames = async () => {

    try {
        

        const games = await db.game.findMany({
            
            select:{
                id:true,
                title:true,
                allImages:true,
                SpecialPrice:true,
                platforms:true,
                price:true,
            }
        })
        return games;
    } catch (error) {
        return null;
    }
}

export const getSpecialGames = async() => {
    try {
        
        const games = await db.game.findMany({
            select:{
                id:true,
                title:true,
                allImages:true,
                SpecialPrice:true,
                price:true,
                description:true,
            },
            take:5,
        })

        return games
    } catch (error) {
        return null;
    }
}