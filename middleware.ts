import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/middleware";

export async function middleware(
    request: NextRequest
  ) {
  const {
    supabase,
    response
  } = createClient(request);

  const publicUrls = [
    "/reset-password",
    "/login/complete-signup",
    "/dashboard/cards/[slug]",
    "/guidelines",
    "/policies",
    "/terms",
  ];
  if (publicUrls
      .includes(
        request.nextUrl.pathname
      )) {
    return response;
  }

  const {
    data: { session },
    error,
  } = await supabase
    .auth
    .getSession();

  const path = new URL(
    request.url).pathname;

  if (error) {
    console.log(error);
  }

  if (session && (
    path === "/" || 
    path === "/login"
  )) {
    return NextResponse
      .redirect(new URL(
        "/dashboard", 
        request.url
      ));
  }

  if (!session && 
    path !== "/" && 
    path !== "/login"
  ) {
    console.log("Middleware: Redirecting to login, no session found.") // For testing
    return NextResponse
      .redirect(new URL(
        "/login", 
        request.url
      ));
  }

  return response;
}

export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|images|favicon.ico|login).*)"],
};
