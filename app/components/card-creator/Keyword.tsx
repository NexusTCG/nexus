"use client";

import React from "react";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

type KeywordType = {
  effect?: string;
  keyword: {
    name: string;
    reminder: string;
    type: string;
  }
}
export default function Keyword(
  { 
    effect, 
    keyword 
  }: KeywordType 
) {
  return (
    <Tooltip
      title={
        effect ? 
        `${keyword.name}: ${effect} ${keyword.reminder}` : 
        `${keyword.name}: ${keyword.reminder}`
      }
      placement="top"
    >
      <Typography
        variant="body2"
        component="span"
        className={clsx("font-bold italic",
          {
            "text-indigo-400 hover:text-indigo-300": keyword.type === "persistent",
            "text-rose-400 hover:text-rose-400": keyword.type === "active",
            "text-amber-400 hover:text-amber-400": keyword.type === "reactive",
          }
        )}
      >
        {keyword.name}: {""}
        <Typography
          variant="body2"
          component="span"
        >
          {effect}
        </Typography>
      </Typography>
    </Tooltip>
  )
}