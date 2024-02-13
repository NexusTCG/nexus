import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
 
export default function NotFound() {
  return (
    <Box
      className="
        flex
        flex-col
        justify-center
        items-start
        w-full
        p-24
        gap-4
        h-[100vh]
        bg-black
      "
      sx={{ position: "relative" }}
    >
      <Typography
        variant="h1"
        className="
          text-4xl
          font-bold
          text-lime-500
          z-10
        "
      >
        404: NOT FOUND
      </Typography>
      <Typography
        variant="h3"
        className="
          text-lg
          font-semibold
          z-10
        "
      >
        There was a glitch in the simulation
      </Typography>
      <Link
        href="/dashboard/create"
        className="
          text-xl
          text-lime-500/75
          hover:text-lime-500
          mt-4
          z-10
        "  
      >
        Return to Nexus
      </Link>
      <Image
        src="/images/nexus-404.png"
        fill
        alt="Nexus 404 Image"
        style={{ objectFit: "cover"}}
        className="
          opacity-25
          z-0
        "
      />
    </Box>
  )
}