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
          im_name: cardData.im_name,
          im_type: cardData.im_type,
          im_sub_type: cardData.im_sub_type,
          im_super_type: cardData.im_super_type,
          im_grade: cardData.im_grade,
          im_text: cardData.im_text,
          im_lore_text: cardData.im_lore_text,
          im_card_prompt: cardData.im_card_prompt,
          im_art_prompt: cardData.im_art_prompt,
          im_art_prompt_options: cardData.im_art_prompt_options,
          im_art: cardData.im_art,
          im_render: cardData.im_render,
          im_energy_value: cardData.im_energy_value,
          im_energy_cost: cardData.im_energy_cost,
          im_energy_alignment: cardData.im_energy_alignment,
          im_unit_attack: cardData.im_unit_attack,
          im_unit_defense: cardData.im_unit_defense,
          im_unit_range: cardData.im_unit_range,
          im_speed: cardData.im_speed,
          am_name: cardData.am_name,
          am_type: cardData.am_type,
          am_sub_type: cardData.am_sub_type,
          am_super_type: cardData.am_super_type,
          am_grade: cardData.am_grade,
          am_text: cardData.am_text,
          am_lore_text: cardData.am_lore_text,
          am_card_prompt: cardData.am_card_prompt,
          am_art_prompt: cardData.am_art_prompt,
          am_art_prompt_options: cardData.am_art_prompt_options,
          am_art: cardData.am_art,
          am_render: cardData.am_render,
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
