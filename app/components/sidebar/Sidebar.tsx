"use client";

import React from "react";
import SoMeButton from "@/app/components/sidebar/SoMeButton";
import NavigationButton from "@/app/components/sidebar/NavigationButton";
import SignOutButton from "@/app/components/auth/SignOutButton"
import Image from "next/image";
import { Box } from "@mui/material";
import Link from "next/link";

const soMeChannels = [
  "github",
  "discord",
  "x",
  "linkedin"
]

const primaryNavigation = [
  "create",
  "cards",
  "rules",
  "game",
  "roadmap",
]

const secondaryNavigation = [
  "profile",
  "subscription",
  "settings",
  "support"
]

export default function Sidebar() {
  return (
    <Box
      id="sidebar-container"
      className="
        flex
        flex-col
        justify-between
        items-center
        w-[240px]
        h-[100vh]
        bg-neutral-800
        border-r
        border-neutral-700
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
        <Box
          id="sidebar-logo-social-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            py-4
            gap-6
            border-b
            border-neutral-700
          "
        >
          <Box
            id="sidebar-logo-container"
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
              px-4
              py-1
            "
          >
            <Link
              href="/dashboard/create" // Replace with actual route
              className="
                flex
                flex-col
                justify-center
                items-center
                w-full
                hover:opacity-80
              "  
            >
              <Image
                src="/images/nexus-logo.png" // Repace with SVG
                alt="Nexus Logo Placeholder"
                width={160}
                height={34}
              />
            </Link>
          </Box>
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
            {soMeChannels.map((channel, index) => {
              return <SoMeButton key={index} channel={channel} />
            })}
          </Box>
        </Box>
        

        <Box
          id="sidebar-navigation-primary"
          className="
            flex
            flex-col
            justify-between
            items-center
            w-full
            gap-2
            px-2
          "
        >
          {primaryNavigation.map((route, index) => {
            return (
              <NavigationButton key={index} route={route} />
            )
          })}
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
          pb-2
        "
      >
        <Box
          id="sidebar-navigation-secondary"
          className="
            flex
            flex-col
            justify-between
            items-center
            w-full
            px-2
            gap-2
          "
        >
          {secondaryNavigation.map((route, index) => {
            return (
              <NavigationButton key={index} route={route} />
            )
          })}
          <SignOutButton /> 
        </Box>
      </Box>
    </Box>
  );
}