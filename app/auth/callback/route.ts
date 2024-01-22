import { createClient } from "@/app/utils/supabase/server";
import type { NextRequest } from 'next/server'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (code) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase
            .auth
            .exchangeCodeForSession(code);
    };

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(url.origin);
};