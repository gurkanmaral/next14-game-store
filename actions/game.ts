"use server";

import { db } from "@/lib/db";
import { Game } from "@prisma/client";

export const createGame = async(values:Omit<Game, 'id' | 'comments' | 'rate'>) => {

    const validData = {
        title: values.title,
        price:values.price,
        allImages:values.allImages,
        SpecialPrice:values.SpecialPrice,
        description:values.description,
        Genres:values.Genres,
        metacritic:values.metacritic,
        released:values.released,
        platforms:values.platforms,
        developer:values.developer,

    }

    await db.game.create({
        data:{ ...validData }
    });

    return {success:"Confirmation email sent!"};

}