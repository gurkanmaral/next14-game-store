"use server";

import { db } from "@/lib/db";
import Stripe from "stripe";

export type CreateOrderParams = {
    stripeId: string
    gameId: string
    userId: string
    totalAmount: string
    createdAt: Date
  }
  

export const  createOrder = async (order:CreateOrderParams) => {

    try {
        const newOrder = await db.boughtGame.create({
            ...order,
            gameId:order.gameId,
            userId:order.userId,
        })
    } catch (error) {
        
    }

}