import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import Image from "next/image";

type RuleItemProps = {
  id?: string,
  title: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSide?: "left" | "right";
  children?: React.ReactNode;
};

export default function RuleItemWithImage({
  title,
  imageUrl,
  imageWidth,
  imageHeight,
  imageSide,
  children
}: RuleItemProps) {

  let flexRow = "flex-row";
  if (imageSide === "right") {
    flexRow = "flex-row-reverse";
  }

  return (
    <Box
      id={`rule-${title}-container`}
      className={`
        flex
        ${flexRow}
        justify-start
        items-start
        w-full
        gap-4
        bg-neutral-900/50
        rounded-sm
        p-3
      `}
    >
      {imageUrl && (<Image
        src={imageUrl}
        width={imageWidth}
        height={imageHeight}
        alt={`Image for ${title}`}
      />)}
      <Box
        id={`rule-${title}-content-container`}
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          gap-1
        "
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
            pl-3
          "
        >
          {children}
        </Box>}
      </Box>
    </Box>
  );
}