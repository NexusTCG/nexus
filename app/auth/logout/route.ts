"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const url = new URL(req.url).origin;
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);
    await supabase
        .auth
        .signOut();

    return NextResponse.redirect(`${url}/login`);
}