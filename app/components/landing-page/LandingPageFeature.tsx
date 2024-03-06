import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type LandingPageFeatureProps = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function LandingPageFeature({
  id,
  title,
  description,
  icon,
}: LandingPageFeatureProps) {
  return (
    <Box
      id={id}
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        h-full
        z-10
        p-4
        pb-6
        gap-4
        bg-teal-500/20
        border
        border-teal-500/50
        rounded-md
        shadow-lg
        shadow-black/50
        backdrop-blur-sm
      "
    >
       {icon}
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
          variant="subtitle1"
          className="
            text-xl
            font-medium
            text-wrap
            text-white
          "
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          className="
            text-wrap
          "
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}
