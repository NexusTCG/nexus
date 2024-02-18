"use server";

import { createClient } from "@/app/lib/supabase/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .auth
      .exchangeCodeForSession(code);

    if (error) {
      console.log(
        `Error when attempting to exchange code for session: ${error.message}`,
      );
      return NextResponse.redirect(
        `${url.origin}/login?error=${encodeURIComponent(error.message)}`,
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${url.origin}/login`);
}
