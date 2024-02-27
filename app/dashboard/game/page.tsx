import React from "react";
import {
  Box,
  Typography,
} from "@mui/material"
import TextSection from "@/app/components/content/TextSection";
import TextImageSection from "@/app/components/content/TextImageSection";

export default function Game() {
    return (
      <Box
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          h-[100vh]
          p-12
          gap-8
          bg-neutral-950
        "
      >
        <Typography
          variant="h3"
          className="
            title-white
            font-medium
          "
        >
          Game
        </Typography>

        {/* Section: Create */}
        <TextSection
          sectionId="story"
          overline="Lorem ipsum"
          title="Section title"
        >
          <Typography
            variant="body1"
            className="
              title-white
              font-medium
            "
          >
            Lorem ipsum dolor
          </Typography>
        </TextSection>

        {/* Section: Get Involved */}
        <TextImageSection
          sectionId="story"
          imageUrl="/images/auth-bg/nexus-auth-bg-1.jpg"
          imageSide="left"
          overline="Lorem ipsum"
          title="Section title"
        >
          <Typography
            variant="body1"
            className="
              title-white
              font-medium
            "
          >
            Lorem ipsum dolor
          </Typography>
        </TextImageSection>
      </Box>
    );
}