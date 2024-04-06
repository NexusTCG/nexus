"use client";

import React from "react";
// Utils
import Image from "next/image";
import { abbreviationIcons } from "@/app/utils/data/abbreviationIcons";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

export default function IconsAbbreviationMenu() {
  return (
    <Box
      id="icons-abbreviation-menu"
      className="
        flex 
        flex-col 
        justify-center 
        items-center 
        gap-1 
        w-full
      "
    >
      <Typography
        variant="body1"
      >
        Icon abbreviations
      </Typography>
      <Box
        className="
          flex 
          flex-wrap 
          justify-center 
          items-center 
          gap-1 
          p-4 
          rounded-md 
          bg-neutral-900/50
        "
      >
        {Object
          .entries(abbreviationIcons)
          .map(([key, { src, name }]) => (
          <Box
            key={key}
            className="
              flex 
              flex-row 
              justify-start 
              items-center 
              gap-1 
              w-20
            "
          >
            <Typography
              variant="body1"
            >
              {key}
            </Typography>
            <Tooltip title={name}>
              <Image
                src={src} 
                alt={key} 
                width={20} 
                height={20} 
              />
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
}