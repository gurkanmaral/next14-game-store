import { getUserFavoriteCount, getUserFavoriteGames, getUserGameCount, getUserReviewCount, getUserWishlistCount, getUserbyId } from "@/data/auth/user";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileLinks from "./_components/ProfileLinks";
import { notFound } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { isFollowingUser } from "@/data/follow/follow";
import ProfileLink from "./_components/ProfileLink";
import FavoriteGames from "./_components/FavoriteGames";
import ProfileGameCount from "./_components/ProfileGameCount";
import ProfileReviewCount from "./_components/ProfileReviewCount";
import ProfileWishlistCount from "./_components/ProfileWishlistCount";


interface UserPageProps {
  params:{
    id:string;
  }
}


const UserPage = async ({params}:UserPageProps) => {

  const self = await currentUser();
  const user = await getUserbyId(params.id);

 
if(!user) {
    notFound();
}

const isSelf = self ? user.id === self.id : false;

const isFollowing = await isFollowingUser(user?.id)


const [gameCount, wishlishCount, favoriteGamesCount, reviewCount] = await Promise.all([
  getUserGameCount(user?.id),
  getUserWishlistCount(user?.id),
  getUserFavoriteGames(user?.id),
  getUserReviewCount(user?.id)
]);

  return (
    <div className='pt-10 max-w-screen-lg mx-auto gap-10 flex flex-col items-center backdropmask'>
       <ProfileHeader 
       image={user.image} 
       name={user.name} 
       isSelf={isSelf} 
       isFollowing={isFollowing}
       userId={user.id}
       selfId={self?.id}
       />
       <div className="">
        <ProfileLink userId={user.id} />
       </div>
        <div className="flex gap-4">
         <ProfileGameCount  gameCount={gameCount}  userId={user.id} />
         <ProfileReviewCount commentCount={reviewCount} userId={user.id} />
         <ProfileWishlistCount wishlistGames={wishlishCount} userId={user.id}/>
        </div>
      <div className="max-w-[1000px] mt-5 mb-10">
        <FavoriteGames favorites={favoriteGamesCount} isSelf={isSelf}/>
      </div>
    </div>
  )
}

export default UserPage