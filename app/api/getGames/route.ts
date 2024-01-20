import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from "next/server";

type Game = {
    id: string;
    Genres: string[];
    allImages:string[];
    platforms:string[];
    price:string;
    SpecialPrice:string;
};


type Data = {
    games: Game[];
}
export async function GET( req: NextRequest,
    res: NextApiResponse<Data | { error: string }>) {
     
    try {
        
        //this doesnt work on vercel deployment
        // const {searchParams} = new URL(req.url)

        // const genre = searchParams.get("genre")
      

        // let games;

     
      const games = await db.game.findMany({
        select: {
          id: true,
          title: true,
          allImages: true,
          SpecialPrice: true,
          platforms: true,
          price: true,
        }
      });
    // } else {
    
    //   games = await db.game.findMany({
    //     where: {
    //       Genres: {
    //         has: genre
    //       }
    //     },
    //     select: {
    //       id: true,
    //       title: true,
    //       allImages: true,
    //       SpecialPrice: true,
    //       platforms: true,
    //       price: true,
    //       Genres:true,
    //     }
    //   });
    // }

    return NextResponse.json(games, {
      status: 200
    });
    } catch (error) {
         console.error('Failed to fetch games:', error);
         return NextResponse.json({ error: error });
    }
}