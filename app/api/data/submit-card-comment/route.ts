"use server";

import { createClient } from "@/app/lib/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

export async function POST(
  req: NextRequest
) {
  try {
    const commentData = await req.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase
      .from("card_comments")
      .insert({
        card_id: commentData.card_id,
        user_id: commentData.user_id,
        user: commentData.user,
        comment: commentData.comment,
      })
      .select()

    if (error) {
      console.log("Error:", error);
      return new Response(JSON.stringify({ 
        error: error.message 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (data && data.length > 0) {
      console.log("Inserted card comment:", data[0]);
      return new Response(JSON.stringify({ 
        data: data[0] 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  } catch (error) {
    console.log("Catch zod error:", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ 
        error: error.flatten 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    console.log("Catch error:", error);
    return new Response(JSON.stringify({ 
      error: 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json'
      },
    });
  }

  // Add a return statement here to handle the case when no response is returned
  console.log("No response is returned");
  return new Response(JSON.stringify({ 
    error: 'No response is returned'
  }), {
    status: 500,
    headers: { 
      'Content-Type': 'application/json'
    },
  });
}
