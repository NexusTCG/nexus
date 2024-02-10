"use client";

import React, { useEffect, useState } from "react";
import useSession from "@/app/hooks/useSession";
import SignOutButton from "@/app/components/auth/SignOutButton";
import SoMeButton from "@/app/components/sidebar/SoMeButton";
import fetchUserProfiles from "@/app/lib/actions/supabase-data/fetchUserProfilesData";
import {
  Box,
  Button,
  Typography
} from "@mui/material";
import {
  AccountCircle,
  Collections,
  DesignServices,
  Rule,
  Casino,
  Flag
} from '@mui/icons-material';

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

        const profile = data?.find(profile => profile.id === user.id);
        if (profile) {
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
            id="navigation-button-home"
            variant="outlined"
            href="/dashboard/create"
            startIcon={<DesignServices />}
            size="large"
            className="
              flex
              justify-start
              items-center
              w-full
              hover:cursor-pointer
            "
          >
            Create
          </Button>
          <Button
            id="navigation-button-cards"
            variant="outlined"
            href="/dashboard/cards"
            startIcon={<Collections />}
            size="large"
            className="
              flex
              justify-start
              items-center
              w-full
              hover:cursor-pointer
            "
          >
            Cards
          </Button>
          <Button
            id="navigation-button-cards"
            variant="outlined"
            href="/dashboard/rules"
            startIcon={<Rule />}
            size="large"
            className="
              flex
              justify-start
              items-center
              w-full
              hover:cursor-pointer
            "
          >
            Rules
          </Button>
          <Button
            id="navigation-button-cards"
            variant="outlined"
            href="/dashboard/game"
            startIcon={<Casino />}
            size="large"
            className="
              flex
              justify-start
              items-center
              w-full
              hover:cursor-pointer
            "
          >
            Game
          </Button>
          <Button
            id="navigation-button-cards"
            variant="outlined"
            href="/dashboard/roadmap"
            startIcon={<Flag />}
            size="large"
            className="
              flex
              justify-start
              items-center
              w-full
              hover:cursor-pointer
            "
          >
            Roadmap
          </Button>
        
          {/* Separate the below into its own container */}

          <Button
            id="navigation-button-profile"
            variant="outlined"
            startIcon={<AccountCircle />}
            href="/dashboard/profile"
            size="large"
            className="
              flex
              justify-start
              items-center
              w-full
              hover:cursor-pointer
            "
          >
            {userProfile}
          </Button>

          {/* Subscription */}
          {/* Settings button */}
          {/* Support */}

        </Box>
        
        {/* Add icon, replace?? */}
        <SignOutButton /> 

      </Box>
    </Box>
  );
}