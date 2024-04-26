"use server";

import { createClient } from "@/app/lib/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

// Insert a new card into the database
export async function POST(
  req: NextRequest
) {
    const cardData = await req.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    try {
      if (cardData) {
        console.log("Attempting to update card:", cardData)
        const { data, error } = await supabase
        .from("cards")
        .update({
          // id
          // user_id
          // cardCreator
          cardName: cardData?.cardName,
          cardEnergyValue: cardData?.cardEnergyValue,
          cardEnergyCost: cardData?.cardEnergyCost,
          cardEnergyAlignment: cardData?.cardEnergyAlignment,
          cardArt: cardData?.cardArt,
          cardType: cardData?.cardType,
          cardSuperType: cardData?.cardSuperType,
          cardSubType: cardData?.cardSubType,
          cardSpeed: cardData?.cardSpeed,
          cardGrade: cardData?.cardGrade,
          cardText: cardData?.cardText,
          cardLoreText: cardData?.cardLoreText,
          cardAttack: cardData?.cardAttack,
          cardDefense: cardData?.cardDefense,
          cardUnitType: cardData?.cardUnitType,
          cardPrompt: cardData?.cardPrompt,
          cardArtPrompt: cardData?.cardArtPrompt,
          cardRender: cardData?.cardRender,
          cardAnomalyModeName: cardData?.cardAnomalyModeName,
          cardAnomalyModeText: cardData?.cardAnomalyModeText,
          cardAnomalyModeLoreText: cardData?.cardAnomalyModeLoreText,
          cardAnomalyModeGrade: cardData?.cardAnomalyModeGrade,
          art_prompt_options: cardData?.art_prompt_options,
          // created_at
          updated_at: new Date().toISOString(),
        })
        .eq("id", cardData?.id)
        .select()
  
        if (error) {
          console.log("Supabase: Error updating card.")
          console.log("Error:", error);
          return new Response(JSON.stringify({ 
            error: error.message 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else if (data) {
          console.log("Inserted card:", data[0]);
          return new Response(JSON.stringify({ 
            data: data[0] 
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      } else {
        console.log("API: No card data.")
        console.log("Data error.");
        return new Response(JSON.stringify({ 
          error: "No data found to update."
        }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json'
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
    console.log("No response is returned");
    return new Response(JSON.stringify({ 
      error: 'No response is returned'
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json'
      },
    }
  );
}
