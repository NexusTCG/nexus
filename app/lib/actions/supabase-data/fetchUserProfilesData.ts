"use server";

import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";
import { UserProfilesTableType } from "@/app/utils/types/supabase/userProfilesTableType";

type FetchUserProfileOptions = {
  from: string;
  select?: string;
  filter?: string;
};

export default async function fetchUserProfiles(
  options: FetchUserProfileOptions
): Promise<UserProfilesTableType[] | null> {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const query = supabase
    .from(options.from)
    .select(options.select || "*")
    .eq("id", options.filter);

  const { data: userProfiles, error } = await query;

  if (error) {
    console.error(`Error fetching ${options.from} data:`, error);
    return null;
  }
  
  return userProfiles as unknown as UserProfilesTableType[];
}