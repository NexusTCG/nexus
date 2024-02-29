import React from "react";
import NavigationButton from "@/app/components/navigation/NavigationButton";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Toolbar,
} from "@mui/material";

export default function AppBarLandingPage() {
  return (
    <Box
      id="appbar-container"
      sx={{
        position: "sticky",
        top: 0,
        height: "60px"
      }}
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        bg-neutral-900/50
        border-b
        border-neutral-800
        shadow-md
        shadow-neutral-950/50
      "
    >
      <Toolbar
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
          gap-4
        "
      >
        <Box
          id="appbar-logo-navigation-container"
          className="
            flex
            flex-row
            justify-between
            items-center
            gap-6
            w-full
          "
        >
          {/* Logo */}
          <Link href="/dashboard">
            <Image
              src="/images/nexus-logo.png" // Repace with SVG
              alt="Nexus Logo Placeholder"
              width={150}
              height={36}
            />
          </Link>
          <NavigationButton
            route={"login"}
            type="appbar"
          />
        </Box>
      </Toolbar>  
    </Box>
  );
}