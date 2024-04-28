"use client";

import React from "react";
import useSession from "@/app/hooks/useSession";
// Utils
import Image from "next/image";
import Link from "next/link";
// Custom components
import SoMeButton from "@/app/components/navigation/SoMeButton";
import NavigationButton from "@/app/components/navigation/NavigationButton";
import SignOutButton from "@/app/components/auth/SignOutButton"
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const legalLinks = {
  "terms": "https://app.termly.io/document/terms-of-service/ed073254-9c41-4933-b15f-884e216e16de",
  "privacy": "https://app.termly.io/document/privacy-policy/ad50ccf1-c965-4b23-8bdb-77a1bca4cb54",
  "cookies": "https://app.termly.io/document/cookie-policy/a25f2c19-179e-41dd-90d1-a797291d8669",
  "guidelines": "https://docs.google.com/document/d/1Pojoxyo1YZPLi7ZEuIzG9-RcTAUSO-C86HvU_NplY9I/edit?usp=sharing",
}

const soMeChannels = [
  "github",
  "discord",
  "x",
  "linkedin"
]

const primaryNavigation = [
  { path: "create", requiresSession: false },
  { path: "cards", requiresSession: false },
  { path: "rules", requiresSession: false },
  { path: "request", requiresSession: true },
];

const secondaryNavigation = [
  { path: "profile", requiresSession: true },
  { path: "contact", requiresSession: true },
  { path: "credits", requiresSession: true },
];

export default function Sidebar() {
  const session = useSession();

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
              href="/dashboard"
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
            {soMeChannels.map(
              (channel, index) => {
              return (
                <SoMeButton
                  key={index}
                  channel={channel}
                />
              )
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
          {primaryNavigation.map(
              (route, index) => {
                if (route.requiresSession && !session) {
                  return null;
                } else {
                  return (
                    <NavigationButton
                      key={index}
                      route={route.path}
                      type="sidebar"
                    />
                  )
                }
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
          {secondaryNavigation.map(
              (route, index) => {
                if (route.requiresSession && !session) {
                  return null;
                } else {
                  return (
                    <NavigationButton
                      key={index}
                      route={route.path}
                      type="sidebar"
                    />
                  )
                }
            })}
          {session && (
            <SignOutButton />
          )}
        </Box>
        <Box
          id="legal-links"
          className="
            flex
            flex-row
            justify-between
            items-center
            gap-2
            mb-2
          "
        >
          <Link href={legalLinks.terms}>
            <Typography
              variant="caption"
              className="
                text-neutral-500
                hover:text-neutral-400
              "
            >
              Terms
            </Typography>
          </Link>
          <Link href={legalLinks.privacy}>
            <Typography
              variant="caption"
              className="
                text-neutral-500
                hover:text-neutral-400
              "
            >
              Privacy
            </Typography>
          </Link>
          <Link href={legalLinks.cookies}>
            <Typography
              variant="caption"
              className="
                text-neutral-500
                hover:text-neutral-400
              "
            >
              Cookies
            </Typography>
          </Link>
          <Link href={legalLinks.guidelines}>
            <Typography
              variant="caption"
              className="
                text-neutral-500
                hover:text-neutral-400
              "
            >
              Guidelines
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}