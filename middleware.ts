import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const publicUrls = ["/reset-password", "/login/complete-signup"];
  if (publicUrls.includes(request.nextUrl.pathname)) {
    return response;
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // console.log(`User session: ${JSON.stringify(session, null, 2)}`);

  const path = new URL(request.url).pathname;

  if (error) {
    console.log(error);
  }

  if (session && (path === "/" || path === "/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && path !== "/" && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|images|favicon.ico|login).*)"],
};
