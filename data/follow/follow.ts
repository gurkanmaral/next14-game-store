import { getSelf } from "@/lib/auth"
import { db } from "@/lib/db";


export const isFollowingUser = async (id:string) => {

    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where :{id},
        })
        if(!otherUser) {
            throw new Error("User not found");
        }
        if(otherUser.id === self.id) {
            return true;
        }

        const existingFollow = await db.follow.findFirst({
            where:{
                followerId: self.id,
                followingId: otherUser.id,
            },
        });

        return !!existingFollow;

    } catch (error) {
        return false;
    }
}


export const followUser = async (id:string) => {

    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where:{id},
    });

    if(!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: otherUser.id,
        },
      });
    
      if(existingFollow) {
        throw new Error("Already following");
      }
    
      const follow = await db.follow.create({
        data:{
            followerId:self.id,
            followingId:otherUser.id,
        },
        include:{
            following:true,
            follower:true,
        },
      });

      return follow;

};

export const unfollowUser = async (id:string) => {

    const self = await getSelf();
  
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
  
    if (!otherUser) {
        throw new Error("User not found");
      }
    
      if (otherUser.id === self.id) {
        throw new Error("Cannot unfollow yourself");
      }

      const existingFollow = await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: otherUser.id,
        },
      });
    
    if (!existingFollow) {
      throw new Error("Not following");
    }
  
    const follow = await db.follow.delete({
        where:{
            id:existingFollow.id,
        },
        include:{
            following:true,
        },
    });
    return follow;
}


export const getFollowing = async(userId:string) => {
  try {

    const following = await db.follow.findMany({
        where:{
          followerId:userId
        },
        include:{
          following:{
            select:{
              id:true,
              name:true,
              image:true,
            }
          }
        }
    })

    let followingArray:any[] = [];

    if(following) {
      followingArray = following.map((follow)=>follow.following)
    }

    return followingArray
  } catch (error) {
    console.log(error)
  }
}

export const getFollowers = async(userId:string) => {
  try {

    const followers = await db.follow.findMany({
        where:{
          followingId:userId
        },
        include:{
          follower:{
            select:{
              id:true,
              name:true,
              image:true,
            }
          }
        }
    })

    let followersArray:any[] = [];

    if(followers) {
      followersArray = followers.map((follow)=> follow.follower)
    }
    return followersArray
  } catch (error) {
    console.log(error)
  }
}