"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (!formData.has('file')) {
    return new Response(JSON.stringify({ error: 'No file found in request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const file = formData.get('file') as File;
  const dynamicFilename = formData.get('filename') as string;

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error: uploadError } = await supabase
      .storage
      .from("avatars")
      .upload(dynamicFilename, file, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) {
      console.log(uploadError)
      throw new Error(`Failed to upload avatar image: ${uploadError.message}`);
    }

    const { data } = await supabase
      .storage
      .from("avatars")
      .getPublicUrl(dynamicFilename);

    console.log(`Data returned by Supabase: ${data.publicUrl}`);

    const publicUrl = data.publicUrl;
    
    return new Response(JSON.stringify({ data: publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}