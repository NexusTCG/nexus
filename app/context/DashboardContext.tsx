"use client";

import { createContext } from 'react';
import { UserProfilesTableType } from "@/app/utils/types/supabase/userProfilesTableType";

type DashboardContextType = {
  userProfileData?: UserProfilesTableType;
};

export const DashboardContext = createContext<DashboardContextType>({});