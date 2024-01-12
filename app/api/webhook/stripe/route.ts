import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createBoughtGame, createOrder } from '@/actions/order'

export async function POST(request:Request)  {
    
    const body = await request.text()
    
    const sig = request.headers.get('stripe-signature') as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event

    try {
        event = stripe.webhooks.constructEvent(body,sig,endpointSecret)
    } catch (err) {
        return NextResponse.json({message:'Webhook error', error:err})
    }
     // Get the ID and type
  const eventType = event.type

   // CREATE
   if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;


    const gameIds = JSON.parse(metadata.gameIds || '[]');
    const userId = metadata.userId || '';

     const order = {
        stripeId: id,
        userId: userId,
        purchaseDate: new Date(),
        total: amount_total ? (amount_total / 100).toString() : '0',
  };

    const newOrder = await createOrder(order);

    for (const gameId of gameIds) {
        const boughtGame = {
          orderId: newOrder.id,
          gameId: gameId,
        };
        await createBoughtGame(boughtGame);

    return NextResponse.json({ message: 'OK', order: newOrder })
  }

   }
  return new Response('', { status: 200 })
}