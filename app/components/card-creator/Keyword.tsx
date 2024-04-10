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
        `${keyword.name} (${keyword.type}): ${effect} ${keyword.reminder}` : 
        `${keyword.name} (${keyword.type}): ${keyword.reminder}`
      }
      placement="top"
    >
      <Typography
        variant="body2"
        component="span"
        className={clsx("font-semibold",
          {
            "text-indigo-600 hover:text-indigo-500": keyword.type === "persistent",
            "text-rose-600 hover:text-rose-500": keyword.type === "active",
            "text-amber-600 hover:text-amber-500": keyword.type === "reactive",
          }
        )}
        sx={{
          minWidth: "2em",
          display: "inline-block",
        }}
      >
        {keyword.name + " "}
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