import React from "react";
import {
  Box,
  Typography,
} from "@mui/material"

type TextSectionProps = {
  sectionId: string,
  overline: string,
  title: string,
  children: React.ReactNode,
};

export default function TextSection({
  sectionId,
  overline,
  title,
  children,
}: TextSectionProps) {
  return (
    <Box
      id={sectionId}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-4
        p-6
        pb-8
        rounded-lg
        bg-neutral-900
      "
    >
      <Box
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-2
        "
      >
        <Typography
          variant="overline"
          className="
            font-medium
            w-full
            text-teal-500
          "
        >
          {overline}
        </Typography>
        <Typography
          variant="h3"
          className="
            font-semibold
            w-full
            text-teal-300
          "
        >
          {title.toUpperCase()}
        </Typography>
      </Box>
      <Typography
        variant="subtitle1"
        className="
          font-medium
          w-full
        "
      >
        {children}
      </Typography>
    </Box>
  )
};
