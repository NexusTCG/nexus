import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type TextSectionProps = {
  sectionId: string,
  overline: string,
  title: string,
  link?: string,
  linkLabel?: string,
  children: React.ReactNode,
};

export default function TextSection({
  sectionId,
  overline,
  title,
  link,
  linkLabel,
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
        bg-neutral-800
        shadow-xl
        shadow-neutral-950/20
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
      {link && (
        <Link
          href={link}
        >
          <Typography
            variant="caption"
            className="
              font-medium
              text-teal-500
              hover:text-teal-400
              w-full
            "
          >
            {linkLabel?.toUpperCase()}
          </Typography>
        </Link>
      )}
    </Box>
  )
};
