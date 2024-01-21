import { db } from "@/lib/db"


export const isGameInWishlist = async(userId:string,gameId:string) => {

    const userWithWishlist = await db.user.findUnique({
        where: {
            id: userId
        },
        select: {
            wishlistGames: {
                select: {
                    id: true
                }
            }
        }
    });


    if(userWithWishlist) {
        const isFavorite = userWithWishlist.wishlistGames.some(wishlistGame => wishlistGame.id === gameId);
        return isFavorite;
    }
    
    
    return false;

}


export const userWishlist = async(userId:string) => {
    try {
        const wishlistGames = await db.user.findUnique({
            where:{
                id:userId,
            },
            include:{
                wishlistGames:{
                    select:{
                        allImages:true,
                        id:true,
                        title:true
                    }
                }
            }
        })
        if (wishlistGames) {
            return wishlistGames.wishlistGames;
          } else {
            
            return [];
          }
    } catch (error) {
        console.log(error)
    }
}