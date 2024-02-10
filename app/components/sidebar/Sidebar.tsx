"use client";

import React, { useEffect, useState } from "react";
import useSession from "@/app/hooks/useSession";
import SignOutButton from "@/app/components/auth/SignOutButton";
import SoMeButton from "@/app/components/sidebar/SoMeButton";
import { Box, Button, Typography } from "@mui/material";
import fetchUserProfiles from "@/app/lib/actions/supabase-data/fetchUserProfilesData";

export default function Sidebar() {
  const [userProfile, setUserProfile] = useState<string>("profile");
  const user = useSession()?.user;

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await fetchUserProfiles({
          from: "profiles",
          select: "*",
          filter: user.id
        });
        console.log(data);

        const profile = data?.find(profile => profile.id === user.id);
        if (profile) {
          console.log(profile);
          setUserProfile(profile.username);
        }
      }
    };

    fetchData();
  }, [user?.id])

  return (
    <Box
      id="sidebar-container"
      className="
        flex
        flex-col
        justify-between
        items-center
        p-2
        gap-4
        w-[240px]
        h-[100vh]
        bg-zinc-700
        border-r
        border-zinc-600
        top-0
      "
    >
      <Box
        id="sidebar-section-top"
        className="
          flex
          flex-col
          justify-between
          items-center
          gap-4
          w-full
        "
      >
        <Typography
          variant="body1"
          className="
            text-center
            w-full
            bg-zinc-800
            py-4
            rounded
          "
        >
          Nexus Logo Placeholder
        </Typography>

        <Box
          id="social-media-buttons"
          className="
            flex
            flex-row
            justify-between
            items-center
            gap-4
          "
        >
          <SoMeButton channel="github" />
          <SoMeButton channel="discord" />
          <SoMeButton channel="x" />
          <SoMeButton channel="linkedin" />
        </Box>
      </Box>

      <Box
        id="sidebar-section-bottom"
        className="
          flex
          flex-col
          justify-between
          items-center
          gap-4
          w-full
        "
      >
        <Box
          id="sidebar-navigation"
          className="
            flex
            flex-col
            justify-between
            items-center
            w-full
            gap-2
          "
        >
          <Button
              variant="outlined"
              href="/dashboard/cards"
              className="
                w-full
                hover:cursor-pointer
              "
            >
              Cards
          </Button>
          <Button
              variant="outlined"
              href="/dashboard/cards"
              className="
                w-full
                hover:cursor-pointer
              "
            >
              Cards
          </Button>
          <Button
              variant="outlined"
              href="/dashboard/cards"
              className="
                w-full
                hover:cursor-pointer
              "
            >
              {/* {user?.email} */}
              {userProfile}
          </Button>
        </Box>

        <SignOutButton />

      </Box>
    </Box>
  );
}