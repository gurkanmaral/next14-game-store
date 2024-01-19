import Link from "next/link";


interface ProfileGameCountProps {
    gameCount:number;
    userId?:string;
}

const ProfileGameCount = ({gameCount,userId}:ProfileGameCountProps) => {


  return (
    <Link href={`/${userId}/library`} className="bg-black p-3 rounded-md shadow-md shadow-white/15 gap-2 flex justify-end items-end">
        <span className="text-7xl font-bold">
        {gameCount}
        </span>
        <span className='text-xl'>
          GAMES
        </span>

    </Link>
  )
}

export default ProfileGameCount