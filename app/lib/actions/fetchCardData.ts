"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";

type FetchCardsOptions = {
  from: string;
  select?: string;
  sortBy?: { column: string, ascending?: boolean };
};

export default async function fetchCards(
  options: FetchCardsOptions
): Promise<CardsTableType[] | null> {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const query = supabase
    .from(options.from)
    .select(options.select || "*");

  if (options.sortBy) {
    query
      .order(
        options
        .sortBy
        .column, {
      ascending: options
        .sortBy
        .ascending ?? false
    });
  }

  const { data: cards, error } = await query;

  if (error) {
    console.error(`Error fetching ${options.from} data: ${error}`);
    return null;
  }
  
  return cards as unknown as CardsTableType[];
}
