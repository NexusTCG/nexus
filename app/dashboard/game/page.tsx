import React from "react";
import {
  Box,
  Typography,
} from "@mui/material"
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
          h-full
          p-12
          gap-8
        "
      >
        {/* Section: Nexus Universe */}
        <TextImageSection
          sectionId="game-story"
          imageUrl="/images/content/nexus_team.jpg"
          imageSide="left"
          overline="The World of Nexus"
          title="Battle across the Universe"
        >
          <Typography
            variant="body1"
            className="
              title-white
              font-medium
            "
          >
            Nexus is a simulated universe filled with unique worlds to explore, {""}
            inhabited by all kinds of entities. From fantasy staples like Elves and Vampires, {" "}
            to sci-fi beings like Cyborgs and Technomancers. Recruit them to join you in battle.
          </Typography>
        </TextImageSection>

        {/* Section: Gameplay */}
        <TextImageSection
          sectionId="game-gameplay"
          imageUrl="/images/content/nexus_merc.jpg"
          imageSide="right"
          overline="Gameplay and Strategy"
          title="Competitive core, casual"
        >
          <Typography
            variant="body1"
            className="
              title-white
              font-medium
            "
          >
            The core game mode of Nexus will be 1vs1 competitive. {" "}
            That said, try out your cards and experience chaotic matches in the casual game mode. {" "}
            Join the Discord to help shape the gameplay.
          </Typography>
        </TextImageSection>

        {/* Section: Feedback */}
        <TextImageSection
          sectionId="game-feedback"
          imageUrl="/images/content/nexus_brain.jpg"
          imageSide="right"
          overline="Feedback and Playtesting"
          title="Wanted: Your brain"
        >
          <Typography
            variant="body1"
            className="
              title-white
              font-medium
            "
          >
            Interesting in trying Nexus? {" "}
            We want to hear what you think! Starting in early 2024, {" "}
            we&apos;ll be hosting IRL playtests in Stockholm, Sweden. {" "}
            Join the Discord for event announcements.
          </Typography>
        </TextImageSection>

        {/* Section: Origin */}
        <TextImageSection
          sectionId="game-origin"
          imageUrl="/images/content/nexus_nils.jpg"
          imageSide="left"
          overline="Origin of Nexus"
          title="I wanted to play the cards I made"
          link="/dashboard/profile/nils"
          linkLabel="Nils's profile"
        >
          <Typography
            variant="body1"
            className="
              title-white
              font-medium
            "
          >
            Nexus is my brainchild and passion project. {""}
            I&apos;ve played trading card games since the 90s. {" "}
            I&apos;ve made hundreds of custom MTG and Hearthstone cards. {""}
            But I&apos;ve never played them. With Nexus I want everyone to be able play cards they create.
          </Typography>
        </TextImageSection>
      </Box>
    );
}