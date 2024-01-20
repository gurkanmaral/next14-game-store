"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export type CreateOrderParams = {
    stripeId: string
    userId: string
    total: string
    purchaseDate: Date
  }
  export type BoughtGameParams = {
    orderId: string;
    gameId:string;
  }
  export type CheckoutOrderParams = GameInfo[];

export type GameInfo = {
    gameTitle: string;
    gameId: string;
    price: number;
    userId: string;
  };



export const  createOrder = async (orderData:CreateOrderParams) => {

    try {
            const newOrder = await db.order.create({            
                 data:orderData,     
            })
            return newOrder
    } catch (error) {
        console.log(error)
        return null; // Indicate failure
    }

}

export const createBoughtGame = async (boughtData:BoughtGameParams) => { 

    try {
        const newBoughtGame = await db.boughtGame.create({
            data:boughtData

        })
        return newBoughtGame
    } catch (error) {
        console.log(error)
        return null; // Indicate failure
    }

}

export const checkoutOrder = async (orders: CheckoutOrderParams,totalAmount:number) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
    
   
    
    try {
        const lineItems = orders.map(order => ({
          price_data: {
            currency: 'usd',
            unit_amount: Math.floor(order.price * 100),
            product_data: {
              name: order.gameTitle,
            },
          },
          quantity: 1,
        }));

        const gameIds = orders.map(order => order.gameId);
        
        const session = await stripe.checkout.sessions.create({
          line_items: lineItems,
          metadata: {
            userId: orders[0].userId,
            gameIds: JSON.stringify(gameIds), 
          },
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        });
        redirect(session.url!)
    } catch (error) {
      throw error;
    }
  };