import stripe from 'stripe'
import { NextResponse } from 'next/server'

export async function POST(request:Request)  {
    
    const body = await request.text()
    
    const sig = request.headers.get('stripe-signature') as string

    
}