"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { DashboardContext } from "@/app/context/DashboardContext";
import fetchUserProfiles from "@/app/lib/actions/supabase-data/fetchUserProfilesData";
import { UserProfilesTableType } from "@/app/utils/types/supabase/userProfilesTableType";
import useSession from "@/app/hooks/useSession";
import Sidebar from '@/app/components/navigation/Sidebar';
import AppBar from '@/app/components/navigation/AppBar';
import Box from '@mui/material/Box';

const supabase = createClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [
    userProfileData,
    setUserProfileData
  ] = useState<UserProfilesTableType | undefined>();
  const user = useSession()?.user;
  
  // Fetch user data
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

    // Subscribe to user credits changes
    const userId = user?.id;
    if (userId) {
      const channel = supabase
        .channel("user credits")
        .on("postgres_changes", {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`
          }, payload => {
            if (
              payload.new.id === userId && 
              payload.new.credits !== undefined
            ) {
              console.log(
                'Credit update received:', 
                payload.new.credits
              );
              setUserProfileData(
                prevState => prevState ? { 
                  ...prevState, 
                  credits: payload.new.credits 
                } : undefined
              );
            }
          })
        .subscribe()
        return () => {
          (async () => {await supabase
            .removeChannel(channel);
        })();
      };
    }

  }, [user?.id]);
  
  return (
    <Box
      id="dashboard-layout-container"
      className="
        flex
        lg:flex-row
        flex-col
        justify-start
        items-start
        w-full
      "
    >
      <Box
        id="sidebar-container"
        className="
          sticky
          top-0
          hidden
          lg:block
          h-screen
        "
      >
        {/* Sidebar */}
        <Sidebar />
      </Box>
      <Box
        id="appbar-container"
        className="
          sticky
          top-0
          lg:hidden
          block
          w-full
          z-10
        "
      >
        {/* AppBar */}
        <AppBar />
      </Box>
      <Box
        id="dashboard-content-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          h-full
          bg-neutral-900
        "
      >
         <DashboardContext.Provider
          value={{ userProfileData }}
        >
          {children}
         </DashboardContext.Provider>
      </Box>
    </Box>
  )
};