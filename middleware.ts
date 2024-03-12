import { 
  NextResponse, 
  NextRequest 
} from "next/server";
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
  ];

  const url = request.nextUrl;
  const path = new URL(
    request.url).pathname;

  if (publicUrls
      .includes(path)) {
    return response;
  }

  const {
    data: { session },
    error,
  } = await supabase
    .auth
    .getSession();

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
    return NextResponse
      .redirect(new URL(
        "/login", 
        request.url
      ));
  }

  // Redirect to /credits on succesful Stripe checkout
  if (session && 
    url.searchParams.get("success") === "true" && 
    url.searchParams.get("redirect") === "credits"
  ) {
    return NextResponse
      .redirect(new URL(
        "/dashboard/credits", 
        request.url
      ));
  }

  // Redirect to /credits on unsuccesful Stripe checkout
  if (session && 
    url.searchParams.get("canceled") === "true" && 
    url.searchParams.get("redirect") === "credits"
  ) {
    return NextResponse
      .redirect(new URL(
        "/dashboard/credits", 
        request.url
      ));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|login).*)"],
};
