"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";

// Make this a separate action function so we can call it from other routes
export async function uploadImage(imageUrl: string) {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch the image: ${response.statusText}`);
    }
    const imageBuffer = await response.arrayBuffer();

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const filename = `card-art/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.png`;

    const { error: uploadError } = await supabase
        .storage
        .from("card-art")
        .upload(filename, imageBuffer, {
            contentType: 'image/png',
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data } = supabase
        .storage
        .from("card-art")
        .getPublicUrl(filename);

    return data.publicUrl;
}