import { db } from "@/lib/db"


export const isGameFavoriteByUser = async(userId:string,gameId:string) => {

    const userWithFavorites = await db.user.findUnique({
        where: {
            id: userId
        },
        select: {
            favoriteGames: {
                select: {
                    id: true
                }
            }
        }
    });

    if(userWithFavorites) {
        const isFavorite = userWithFavorites.favoriteGames.some(favoriteGame => favoriteGame.id === gameId);

        return isFavorite;
    }
    
  return false;

}