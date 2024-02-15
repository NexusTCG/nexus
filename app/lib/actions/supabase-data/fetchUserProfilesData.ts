"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";
import { UserProfilesTableType } from "@/app/utils/types/supabase/userProfilesTableType";

type FetchUserProfileOptions = {
  from: string;
  select?: string;
  filter?: {
    column: string,
    value: string | number,
    method?: 'eq' | 'ilike'
  };
};

export default async function fetchUserProfiles(
  options: FetchUserProfileOptions
): Promise<UserProfilesTableType[] | null> {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from(options.from)
    .select(options.select || "*")
    
    if (options.filter) {
      switch (options.filter.method) {
        case 'ilike':
          query = query.ilike(
            options.filter.column,
            `%${options.filter.value}%`
          );
          break;
        case 'eq':
        default:
          query = query.eq(
            options.filter.column,
            options.filter.value
          );
          break;
      }
    }

    const { data, error } = await query;

  if (error) {
    console.error(`Error fetching ${options.from} data:`, error);
    return null;
  }
  
  return data as unknown as UserProfilesTableType[];
}