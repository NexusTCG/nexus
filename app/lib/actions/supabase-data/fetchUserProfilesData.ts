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

  const query = supabase
    .from(options.from)
    .select(options.select || "*")
    
    if (options.filter) {
      if (options.filter.method === 'eq') {
        query.eq(options.filter.column, options.filter.value);
      } else {
        query.ilike(options.filter.column, `%${options.filter.value}%`);
      }
    }

  const { data: userProfiles, error } = await query;

  if (error) {
    console.error(`Error fetching ${options.from} data:`, error);
    return null;
  }
  
  return userProfiles as unknown as UserProfilesTableType[];
}