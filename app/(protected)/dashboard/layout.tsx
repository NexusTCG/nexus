"use client";

import React, {
  useState,
  useEffect
} from "react";
import { DashboardContext } from "@/app/context/DashboardContext";
import useSession from "@/app/hooks/useSession";
import fetchUserProfiles from "@/app/lib/actions/supabase-data/fetchUserProfilesData";
import { UserProfilesTableType } from "@/app/utils/types/supabase/userProfilesTableType";
import Sidebar from '@/app/components/sidebar/Sidebar';
import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [userProfileData, setUserProfileData] = useState<UserProfilesTableType | undefined>();
  const user = useSession()?.user;
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const data = await fetchUserProfiles({
          from: "profiles",
          select: "*",
          filter: {
            column: "id",
            value: user?.id as string
          }
        });
  
        if (data && data.length > 0) {
          const profile = data[0];
          setUserProfileData(profile);
        } else {
          console.error("No user profile data found.");
        }
      }
    };
  
    fetchUserData();
  }, [user?.id]);
  
  return (
    <Box
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        z-30
      "
    >
      <Box
        className="
          sticky
          top-0
          hidden
          lg:block
          h-screen
        "
      >
        <Sidebar />
      </Box>
      <Box
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
        "
      >
         <DashboardContext.Provider value={{ userProfileData }}>
          {children}
         </DashboardContext.Provider>
      </Box>
    </Box>
  )
};