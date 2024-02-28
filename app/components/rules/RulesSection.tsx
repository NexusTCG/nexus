import React from "react";
import { Box, Typography } from "@mui/material";

type RulesSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function RulesSection({
  title,
  children
}: RulesSectionProps) {
  return (
    <Box
      id={`section-${title}-container`}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        bg-neutral-800
        border
        border-neutral-700
        rounded-md
        shadow-xl
        shadow-neutral-950/50
      "
    >
      <Typography
        id={`section-${title}`}
        variant="h4"
        className="
          w-full
        text-white
          font-semibold
          p-4
          border-b
          border-neutral-700
        "
      >
        {title}
      </Typography>
      <Box
        id={`section-${title}-content`}
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          p-4
          gap-6
        "
      >
        {children}
      </Box>
    </Box>
  )
}