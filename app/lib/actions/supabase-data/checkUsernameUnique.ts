"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";

export default async function checkUsernameUnique(
  username: string | null | undefined
) {
  if (!username) return true;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  return !data && !error;
};