"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";

export default async function fetchCards() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: cards
  } = await supabase
    .from("cards")
    .select("*")
    .order("created_at", {
      ascending: false
    });
  return cards;
}
