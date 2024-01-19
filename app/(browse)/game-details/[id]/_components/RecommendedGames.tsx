import RecommendedCard from "./RecommendedCard"

interface RecommendedCardProps{
  recommendedGamesArray:RecommendedCardGameProps[];
}

interface RecommendedCardGameProps{
  allImages:string[];
  id:string;
  title:string;
  SpecialPrice:string;
  price:string;
}

const RecommendedGames = ({recommendedGamesArray}:RecommendedCardProps) => {
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        Recommended Games
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {recommendedGamesArray.map((game)=>(
          <RecommendedCard key={game.id} game={game} />
        ))}

    </div>
    </div>
  )
}

export default RecommendedGames