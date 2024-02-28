"use client";

import React from "react";
import TextSection from "@/app/components/content/TextSection";
import {
  Box,
  Typography,
} from "@mui/material"

export default function Roadmap() {
  

  return (
    <Box
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        h-full
        p-12
        gap-8
      "
    >
      {/* Section: Nexus Universe */}
      <TextSection
        sectionId="roadmap-card-creator"
        overline="step 1"
        title="Card Creator"
      >
        <Typography
          variant="body1"
          className="
            text-white
            font-medium
          "
        >
          The first step is to build and improve the Card Creator. {" "}
          It will let people start bringing their card ideas to life. {" "}
          We can then grow the community of people who enjoy making TCG cards. {""}
          With enough cards created, we can start playtesting the game. {" "}
        </Typography>
      </TextSection>
      <TextSection
        sectionId="roadmap-playtesting"
        overline="Step 2"
        title="Early Playtesting"
      >
        <Typography
          variant="body1"
          className="
          text-white
            font-medium
          "
        >
          The first step is to build and improve the Card Creator. {" "}
          It will let people start bringing their card ideas to life. {" "}
          With enough cards created, we can start playtesting the game. {" "}
          Then we can iterate on the game rules based on testing. {" "}
        </Typography>
      </TextSection>

      <TextSection
        sectionId="roadmap-playtesting"
        overline="Step 3"
        title="Game Development"
      >
        <Typography
          variant="body1"
          className="
          text-white
            font-medium
          "
        >
          When the game rules are solid, we can start building the game. {" "}
          Simultaneously we&apos;ll grow the community, and collection of cards. {""}
          Nexus will be a digital card game, so building it will take some time. {" "}
          But once its out, we can start playing our cards with other players. {" "}
        </Typography>
      </TextSection>
    </Box>
  );
}