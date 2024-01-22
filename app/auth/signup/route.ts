import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const origin = headers().get("origin");
  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .auth
    .signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
      const errorMessage = encodeURIComponent(error.message);
      return NextResponse.redirect(
        `/login?error=${errorMessage}`
      );
    }

    return NextResponse.redirect(
      "/login?message=Check your email to continue sign in process!"
    );
};