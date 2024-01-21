import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });

    await supabase
        .auth
        .signOut();

    return NextResponse.redirect(`${url.origin}/login`, {
        status: 301
    });
}