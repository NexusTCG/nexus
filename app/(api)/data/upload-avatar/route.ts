"use server";

import { createClient } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const { file } = await req.json();

    try {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);

      console.log('Uploading file:', file.filename); // Debug log

      const { error: uploadError } = await supabase
          .storage
          .from("avatars")
          .upload(file.filename, file, {
              contentType: 'image/png',
              cacheControl: '3600',
              upsert: false
          });

      if (uploadError) {
        throw new Error(`Failed to upload card art image: ${uploadError.message}`);
      }

      console.log('File uploaded successfully'); // Debug log

      const { data } = await supabase
          .storage
          .from("avatars")
          .getPublicUrl(file.filename);

      console.log('Public URL:', data.publicUrl); // Debug log

      return new Response(JSON.stringify({ data: data.publicUrl }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('An error occurred:', error); // Debug log

      if (error instanceof Error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
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
  } else {
    return new NextResponse(null, { status: 405 });
  }
}