"use client";

import React, { useState } from "react";
// Utils
import Image from "next/image";
import { abbreviationIcons } from "@/app/utils/data/abbreviationIcons";
import clsx from "clsx";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function IconsAbbreviationMenu() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setSnackbarOpen(true);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  function handleCloseSnackbar(
    event?: React.SyntheticEvent | Event, 
    reason?: string
  ) {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

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
      <Box
        className="
        relative
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
                hover:bg-neutral-800/80
              "
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => copyToClipboard(key)}
            >
              <Typography
                variant="body1"
                className={clsx("absolute transition-opacity duration-300 ease-in-out",
                  {
                    "opacity-100": hovered === key,
                    "opacity-0": hovered !== key
                  }
                )}
              >
                {key}
              </Typography>
              <Tooltip title={name}>
                <Image
                  src={src} 
                  alt={key} 
                  width={24} 
                  height={24}
                  className={clsx("relative z-10 transition-opacity duration-300 ease-in-out",
                    {
                      "opacity-0": hovered === key,
                      "opacity-100": hovered !== key
                    }
                  )}
                />
              </Tooltip>
            </Box>
          ))
        }
        
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {`Copied "${copiedText}" to clipboard!`}
        </Alert>
      </Snackbar>
    </Box>
  );
}