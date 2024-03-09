"use server";

import Stripe from "stripe";
import stripe from "@/app/lib/stripe/stripe";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

const relevantEvents = new Set([
  "checkout.session.completed",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return new Response('Webhook secret not found.', { 
        status: 400 
      });
    }
    event = stripe
      .webhooks
      .constructEvent(
        body, 
        sig, 
        webhookSecret
      );
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (error) {
    console.log(`❌ Error message: ${(error as Error).message}`);
    return new Response(`Webhook Error: ${(error as Error).message}`, { 
      status: 400 
    });
  }

  if (relevantEvents.has(event.type)) {
    const session = event.data.object as Stripe.Checkout.Session | null;

    if (
      session && 
      session.metadata
    ) {
      const userId =session.metadata.userId;
    
      if (
        session.line_items && 
        session.line_items.data.length === 1
      ) {
        const item = session.line_items.data[0];
        const { quantity } = item;
  
        if (quantity) {
          const creditsToAdd = quantity * 25;
  
          try {
            const { 
              data: userProfile, 
              error: userProfileError 
            } = await supabaseAdmin
              .from("profiles")
              .select("credits")
              .eq("id", userId)
              .single();
            
            if (userProfileError) throw userProfileError;

            const newCredits = userProfile?.credits + creditsToAdd;
            const {
              error: updateError
            } = await supabaseAdmin
              .from("profiles")
              .update({ credits: newCredits })
              .eq("id", userId);

            if (updateError) throw updateError;
  
          } catch (error) {
            console.log(error);
            return new Response(
              'Failed to update user credits. Please contact support.', 
              { status: 500 }
            );
          }
        }
      }
    } else {
      console.log(`❌ No user ID found in session metadata`);
      return new Response(
        `No user ID found in session metadata. Please contact support.`, 
        { status: 400 }
      );
    }
  } else {
    console.log(`❌ Unhandled event type: ${event.type}`);
  }
  return new Response(JSON.stringify({ 
    received: true 
  }), { 
    status: 200
  });
}