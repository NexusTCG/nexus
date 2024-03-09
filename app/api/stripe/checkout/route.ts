"use server";

// import Stripe from "stripe";
import stripe from "@/app/lib/stripe/stripe";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split('Bearer ')[1];

  if (!token) {
    return new Response('No token provided', { 
      status: 401 
    });
  }

  try {
    const { 
      data: { user }, 
      error 
    } = await supabaseAdmin
      .auth
      .getUser(token)

    if (error || !user) {
      return new Response('Unauthorized', { 
        status: 401 
      });
    }
  
    if (user) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID as string,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${new URL(req.url).origin}/?success=true`,
        cancel_url: `${new URL(req.url).origin}/?canceled=true`,
        automatic_tax: {enabled: true},
        metadata: {
          userId: user.id,
        },
      });

      return new Response(JSON.stringify({ 
        url: session.url 
      }), { 
        status: 200, headers: { 
          'Content-Type': 'application/json' 
        } 
      });
    }

  } catch (error) {
    console.log(error);
    return new Response(
      'An unexpected error occurred', { 
        status: 500 
      });
  }
}