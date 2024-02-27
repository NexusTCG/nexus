import React from "react";
import Image from "next/image";
import {
  Box,
  Typography,
} from "@mui/material"

type TextSectionProps = {
  sectionId: string,
  imageUrl: string,
  imageSide: "left" | "right",
  overline: string,
  title: string,
  children: React.ReactNode,
};

export default function TextSection({
  sectionId,
  imageUrl,
  imageSide,
  overline,
  title,
  children,
}: TextSectionProps) {
  let imagePlacement = "md:flex-row";
  if (imageSide === "right") {imagePlacement = "md:flex-row-reverse"};

  return (
    <Box
      id={sectionId}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        p-6
        pb-8
        gap-4
        rounded-lg
        bg-neutral-900
      "
    >
      <Box
        className={`
          flex
          ${imagePlacement}
          flex-col
          justify-start
          items-start
          w-full
          lg:gap-8
          md:gap-6
          gap-4
        `}
      >
        <Box
          sx={{
            position: "relative",
            overlow: "hidden",
            height: 400,
          }}
          className="
            flex
            justify-start
            items-start
            w-full
          "
        >
          <Image
            src={imageUrl}
            alt="placeholder"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </Box>
        <Box
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-4
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
      </Box>
    </Box>
  )
};
