import React from "react";
import NavigationButton from "@/app/components/navigation/NavigationButton";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Toolbar,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { FaDiscord } from "react-icons/fa";

export default function AppBarLandingPage() {
  return (
    <Box
      id="appbar-container"
      sx={{
        position: "sticky",
        top: 0,
        height: "96px"
      }}
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        bg-teal-500/20
        border-b
        border-teal-500/50
        shadow-lg
        shadow-black/50
        backdrop-blur-sm
      "
    >
      <Toolbar
        id="appbar-toolbar"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
          gap-4
          px-12
          border
            border-sky-500
        "
      >
        {/* Logo */}
        <Image
          src="/images/nexus-logo.png" // Repace with SVG
          alt="Nexus Logo Placeholder"
          width={150}
          height={36}
        />
        <Box
          id="appbar-logo-navigation-container"
          className="
            flex
            flex-row
            justify-end
            items-center
            gap-6
            border
            border-yellow-500
          "
        >
          <Link href="https://discord.gg/8t6XjdUuqH">
            <FaDiscord
              style={{
                fontSize: "24px"
              }}
              className="
                text-white
                hover:opacity-80
              "
            />
          </Link>
          <Link href="https://github.com/NexusTCG">
            <GitHub
              style={{
                fontSize: "24px"
              }}
              className="
                text-white
                hover:opacity-80
              "
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