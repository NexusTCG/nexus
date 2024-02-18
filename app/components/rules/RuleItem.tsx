import React from "react";
import { Box, Typography } from "@mui/material";

type RuleItemProps = {
  title: string;
  children?: React.ReactNode;
};

export default function RuleItem({
  title,
  children
}: RuleItemProps) {

  return (
    <Box
      id={`rule-${title}-container`}
      className={`
        flex
        flex-col
        justify-start
        items-start
        w-full
        bg-neutral-900/50
        rounded-sm
        py-2
        px-3
        gap-1
      `}
    >
      <Typography
        id={`rule-${title}`}
        variant="body1"
        className="
          title-white
          font-semibold
        "
      >
        {title}
      </Typography>
      {children && <Box
        id={`rule-${title}-content`}
        className="
          pl-4
        "
      >
        {children}
      </Box>}
    </Box>
  );
}