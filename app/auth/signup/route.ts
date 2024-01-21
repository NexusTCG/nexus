import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import type { NextRequest } from 'next/server'

export default async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const cookieStore = cookies();

  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = createRouteHandlerClient({
      cookies: () => cookieStore
  });

  const response = await supabase
    .auth
    .signUp({
        email, password,
        options: {
            emailRedirectTo: `${url.origin}/auth/callback`
        }
    });

  return NextResponse.redirect(url.origin, {
    status: 301
  });
};