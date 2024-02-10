"use client";

import { createClient } from "@/app/lib/supabase/client";

export default async function uploadCardmage(
  imageDataUrl: string
) {
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();
    const fileName = `cards/${new Date().getTime()}.png`;

    const supabase = createClient();
  
    const {
      error: uploadError
    } = await supabase
      .storage
      .from("cards")
      .upload(fileName, blob, {
        contentType: "image/png",
        upsert: false
      });
  
    if (uploadError) {
      throw new Error(`Failed to upload card image: ${uploadError.message}`);
    }

    const {
      data: downloadData
    } = supabase
        .storage
        .from("cards")
        .getPublicUrl(fileName);
  
    return downloadData.publicUrl;
  };
