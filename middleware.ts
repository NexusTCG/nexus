import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    
    // const { supabase, response } = createClient(request);

    // const { data:
    //     { session }, error } = await supabase
    //         .auth
    //         .getSession();

    // console.log(`User session: ${session}`);
    // const path = new URL(request.url).pathname;

    // if (error) {
    //     console.log(error);
    // }

    // if (session && (
    //     path === '/' || path === '/login'
    // )) {
    //     return NextResponse.redirect(
    //         new URL('/dashboard', request.url
    //     ));
    // }

    // if (!session && path !== '/' && path !== '/login') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // };

    // return response;

    try {
        const { supabase, response } = createClient(request);
        const { data:
            { session }, error } = await supabase
                .auth
                .getSession();
        console.log(`User session: ${session}`);
        const path = new URL(request.url).pathname;

        // Redirect logged-in users trying to access
        // '/' or '/login' to '/dashboard'
        if (session && (
            path === '/' || path === '/login'
        )) {
            return NextResponse.redirect(
                new URL('/dashboard', request.url
            ));
        }

        // If there's no session and the path is not
        // '/login' or '/', redirect to '/login'
        if (!session && path !== '/' && path !== '/login') {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
    ]
}