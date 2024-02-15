"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";

type FetchCardsOptions = {
  from: string;
  select?: string;
  sortBy?: {
    column: string,
    ascending: boolean
  };
  filter?: {
    column: string,
    value: string | number,
    method?: 'eq' | 'ilike'
  };
};

export default async function fetchCards(
  options: FetchCardsOptions
): Promise<CardsTableType[] | null> {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const query = supabase
    .from(options.from)
    .select(options.select || "*");

  // Apply the filter if provided
  if (options.filter) {
    const filterMethod = options.filter.method || 'eq';
    if (filterMethod === 'eq') {
      query.eq(options.filter.column, options.filter.value);
    } else if (filterMethod === 'ilike') {
      query.ilike(options.filter.column, `%${options.filter.value}%`);
    }
  }

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
    console.error(`Error fetching ${options.from} data:`, error);
    return null;
  }
  
  return cards as unknown as CardsTableType[];
}
