// User session will be used in multiple pages
// So we create a common action for it

"use server";

import createSupabaseServerClient from "../supabase/server";

// Function will be called on the server.
 export default async function readUserSession() {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
};