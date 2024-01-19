import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createBoughtGame, createOrder } from '@/actions/order'
import { removeGameFromWishlistAfterBuy } from '@/actions/wishlist'


export async function POST(request:Request)  {
  
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

    try {
      if (!sig || !endpointSecret) return;
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
       // Handle the webhook event here
  console.log('Webhook event:', event);
    } catch (err:any) {
      console.log(`❌ Error message: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
     // Get the ID and type
  const eventType = event.type

   // CREATE
   if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;

    

    const gameIdsString = metadata && metadata.gameIds ? metadata.gameIds : '[]';

    let gameIds;
    try {
      gameIds = JSON.parse(gameIdsString);
    } catch (error) {
      console.error('Error parsing gameIds:', error);
      // Handle the error appropriately, maybe return an error response
    }
    const userId = metadata && metadata.userId ? metadata.userId : '';

     const order = {
        stripeId: id,
        userId: userId,
        purchaseDate: new Date(),
        total: amount_total ? (amount_total / 100).toString() : '0',
  };

    const newOrder = await createOrder(order);

    if(!newOrder) {
      console.error('Failed to create a new order.');
      // Handle the situation appropriately, maybe return an error response
      return NextResponse.json({ message: 'Failed to create a new order' }, { status: 500 });
    }

    console.log("Game IDs:", gameIds);
    console.log("User ID:", userId);

    let createdBoughtGames = [];

    for (const gameId of gameIds) {
        const boughtGame = {
          orderId: newOrder.id,
          gameId: gameId,
        };
       const createdBoughtGame = await createBoughtGame(boughtGame);

      if (!createdBoughtGame) {
      console.error('Failed to create a bought game record.');
      // Handle the situation appropriately, maybe return an error response
      return NextResponse.json({ message: 'Failed to create a bought game' }, { status: 500 });
    }
    createdBoughtGames.push(createdBoughtGame);
    await removeGameFromWishlistAfterBuy(userId,createdBoughtGame.gameId)
  }
  return NextResponse.json({ message: 'OK', order: newOrder, boughtGames: createdBoughtGames })
   }
  return new Response('', { status: 200 })
}