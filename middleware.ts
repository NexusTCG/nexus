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

  const url = request.nextUrl;
  const path = new URL(request.url).pathname;
  
  const publicUrls = [
    "/reset-password",
    "/login",
    "/dashboard/create",
    "/dashboard/cards",
    "/dashboard/cards/[slug]",
  ];

  const isPublic = publicUrls.some(publicUrl => 
    path === publicUrl || 
    path.startsWith(publicUrl.replace('[slug]', ''))
  );

  const isPublicUserProfile = path
    .startsWith('/dashboard/profile/') && 
    path !== '/dashboard/profile';

  if (isPublic || isPublicUserProfile) {
    return response;
  }

  const {
    data: { user: session},
    error,
  } = await supabase
    .auth
    .getUser();

  if (error) {
    console.log(error);
  }

  if (
    !session && 
    path === "/dashboard/profile"
  ) {
    console.log("Route requires you to be logged in.")
    return NextResponse
      .redirect(
        new URL(
          "/login", 
          request.url
        )
      );
  } else if (
    !session &&
    (
      path.toLowerCase().includes("credits") || 
      path.toLowerCase().includes("contact")
    ) 
  ) {
    console.log("Route requires you to be logged in.")
    return NextResponse
      .redirect(
        new URL(
          "/login", 
          request.url
        )
      );
  }

  if (session && (
    path === "/" || 
    path === "/login"
  )) {
    return NextResponse
      .redirect(new URL(
        "/dashboard", 
        request.url
      )
    );
  }

  // Redirect to /credits after Stripe checkout
  if (
    session && 
    url.searchParams.get("redirect") === "credits" && 
    (
      url.searchParams.get("success") === "true" || 
      url.searchParams.get("canceled") === "true"
    )
  ) {
    const destination = new URL(
      "/dashboard/credits", 
      request.url
    );
    destination.search = url.search; 
    return NextResponse.redirect(destination);
}

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|login).*)"],
};
