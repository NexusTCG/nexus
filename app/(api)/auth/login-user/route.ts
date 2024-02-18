"use server";

// If its the first time logging in, redirect to /login/complete-signup

import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url).origin;
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .auth
    .signInWithPassword({
      email,
      password,
    });

  if (error) {
    console.log(`Error when attempting sign in: ${error.message}`);
    const errorMessage = encodeURIComponent(error.message);
    return NextResponse.redirect(`${requestUrl}/login?error=${errorMessage}`);
  }

  return NextResponse.redirect(`${requestUrl}/dashboard`);
}
