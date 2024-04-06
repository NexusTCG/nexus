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
        gap-2 
        w-full
        mt-4
      "
    >
      <Box
        id="icons-abbreviation-title"
        className="
          flex 
          flex-col 
          justify-center 
          items-center
          gap-2
          px-[5%]
          md:px-[10%]
          w-full
          mb-4
        "
      >
        <Typography
          variant="subtitle2"
          className="
            font-semibold
          "
        >
          ICON ABBREVIATION
        </Typography>
        <Typography
          variant="body2"
          className="text-center"
        >
          The abbreviations below will render the corresponding icons when used in the card creator.
        </Typography> 
      </Box>
      <Box
        className="
          flex 
          flex-wrap 
          justify-center 
          items-center 
          gap-2 
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
                justify-center 
                items-center 
                gap-1 
                w-20
                py-2
                px-3
                rounded-md
                hover:bg-neutral-900/50
              "
            >
              <Typography
                variant="body1"
              >
                {key}: {""}
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
          ))
        }
        <Typography
          variant="body1"
          component="span"
          className="
            flex 
            flex-row 
            gap-2
            text-white
            font-semibold
            py-2
            px-3
            rounded-md
            hover:bg-neutral-900/50
          "
        >
          ~ {" "}
          <Typography
            variant="body1"
            className="
              text-neutral-300
              hover:text-neutral-300/50
            "
          >
            renders the card name
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}