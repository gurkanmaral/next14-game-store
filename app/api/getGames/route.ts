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

    return NextResponse.json(games, {
      status: 200
    });
    } catch (error) {
         console.error('Failed to fetch games:', error);
         return NextResponse.json({ error: error });
    }
}