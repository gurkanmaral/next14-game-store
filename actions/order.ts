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
    gameImage: string;
  };



export const  createOrder = async (orderData:CreateOrderParams) => {

    try {
            const newOrder = await db.order.create({            
                 data:orderData,     
            })
            return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        console.log(error)
    }

}

export const createBoughtGame = async (boughtData:BoughtGameParams) => { 

    try {
        const newBoughtGame = await db.boughtGame.create({
            data:boughtData

        })
        return JSON.parse(JSON.stringify(newBoughtGame));
    } catch (error) {
        console.log(error)
    }

}

export const checkoutOrder = async (orders: CheckoutOrderParams,totalAmount:number) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
    // Convert the price to cents (Stripe expects prices in the smallest currency unit)
    const price = Number(totalAmount) * 100;
    
    try {
        const lineItems = orders.map(order => ({
          price_data: {
            currency: 'usd',
            unit_amount: order.price * 100, // Assuming price is in dollars, convert to cents
            product_data: {
              name: order.gameTitle,
            },
          },
          quantity: 1,
        }));
        console.log(lineItems)

        const gameIds = orders.map(order => order.gameId);

        console.log(gameIds)

        const session = await stripe.checkout.sessions.create({
          line_items: lineItems,
          metadata: {
            userId: orders[0].userId,
            gameIds: JSON.stringify(gameIds), 
          },
          mode: 'payment',
    
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
        });
    
        redirect(session.url!)
    } catch (error) {
      throw error;
    }
  };