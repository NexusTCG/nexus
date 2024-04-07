"use client";

// Hooks
import React from "react";
// Utils
import { ArtPromptOptions } from "@/app/utils/data/artPromptOptions";
import { planetPrompts } from "@/app/utils/data/premadePrompts";
import Image from "next/image";
import clsx from "clsx";
// Components
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
// Icons
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import Palette from "@mui/icons-material/Palette";
import Brush from "@mui/icons-material/Brush";
import People from "@mui/icons-material/People";
import Landscape from "@mui/icons-material/Landscape";
import AccessTime from "@mui/icons-material/AccessTime";
import WbSunny from "@mui/icons-material/WbSunny";
import Mood from "@mui/icons-material/Mood";
import LocalSee from "@mui/icons-material/LocalSee";
import InvertColors from "@mui/icons-material/InvertColors";
import Public from "@mui/icons-material/Public";

export type ArtPromptAccordionProps = {
  category: keyof typeof ArtPromptOptions;
  title: string;
  selectedOptions: string;
  onSelectionChange: (
    category: keyof typeof ArtPromptOptions,
    selectedOption: string
    ) => void;
  isPlanetOption?: boolean;
};

const categoryIcons = {
  style: <Palette className="text-neutral-400" />,
  color: <InvertColors className="text-neutral-400" />,
  technique: <Brush className="text-neutral-400" />,
  subject: <People className="text-neutral-400" />,
  setting: <Landscape className="text-neutral-400" />,
  planet: <Public className="text-neutral-400" />,
  time: <AccessTime className="text-neutral-400" />,
  weather: <WbSunny className="text-neutral-400" />,
  mood: <Mood className="text-neutral-400" />,
  composition: <LocalSee className="text-neutral-400" />,
};

export const ArtPromptAccordionData = [
  { category: "style", title: "Style" },
  { category: "color", title: "Color" },
  { category: "technique", title: "Technique" },
  { category: "subject", title: "Subject" },
  { category: "planet", title: "Planet" },
  { category: "setting", title: "Setting" },
  { category: "time", title: "Time" },
  { category: "weather", title: "Weather" },
  { category: "mood", title: "Mood" },
  { category: "composition", title: "Composition" },
];

export function ArtPromptAccordion({
  category,
  title,
  onSelectionChange,
  selectedOptions,
}: ArtPromptAccordionProps) {

  function handleChipClick(
    option: string
  ) {
    const selectedPlanet = planetPrompts
      .find(p => p.planet === option);
    if (selectedPlanet) {
      const isAlreadySelected = selectedOptions === selectedPlanet.prompt;
      onSelectionChange(
        category, isAlreadySelected ? 
        "" : selectedPlanet.prompt
      );
    } else {
      const isAlreadySelected = selectedOptions === option;
      onSelectionChange(
        category, isAlreadySelected ? 
        "" : option
      );
    }
  };
  
  return (
    <Accordion
      className="
        w-full
        bg-transparent
        shadow-none
      "
    >
      <AccordionSummary
        expandIcon={
          <ArrowDownward
            className="
              text-neutral-400
              hover:text-neutral-300
            "
          />
        }
        aria-controls={`${title} content`}
        id={`${title}-header`}
      >
        {categoryIcons[category]}
        <Typography
          className="
            ml-4
            mr-2
          "
        >
          {title}
        </Typography>
        {selectedOptions && (
          <Check color="success" />
        )}
      </AccordionSummary>
      <AccordionDetails
        className="
          flex
          flex-wrap
          gap-2
        "
      >
        {ArtPromptOptions[category].map((option, index) => {
          let chipElement;
          let tooltipTitle;

          if (typeof option === "object") {
            const isSelected = selectedOptions.includes(option.prompt);
            
            tooltipTitle = (
              <Box
                id="planet-tooltip"
                sx={{
                  width: "250px",
                  height: "200px",
                }}
                className="
                  flex
                  flex-col
                  justify-start
                  items-start
                  gap-2
                  
                "
              >
                <Box
                  id="planet-tooltip-image"
                  sx={{
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="
                    flex
                    flex-col
                    justify-start
                    items-start
                    w-full
                    h-full
                    rounded-sm
                    mt-1
                  "
                >
                  <Image
                    src={option.image}
                    alt={option.planet}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  component="span"
                  className="
                    font-semibold
                  "
                >
                  {option.planet.toUpperCase()}
                  <Typography
                    variant="body2"
                    className="
                      text-xs
                      text-neutral-300
                    "
                  >
                    {option.description}
                  </Typography>
                </Typography>
              </Box>
            );
        
            chipElement = (
              <Chip
                key={option.id}
                label={option.planet}
                onClick={() => handleChipClick(option.planet)}
                color={isSelected ? "success" : "default"}
                variant="outlined"
                className={clsx(
                  "cursor-pointer",
                  { "opacity-100": isSelected },
                  { "opacity-50 hover:opacity-100": !isSelected }
                )}
              />
            );
        
            return (
              <Tooltip
                key={option.id}
                title={tooltipTitle}
                enterTouchDelay={0}
              >
                {chipElement}
              </Tooltip>
            );
          } else if (typeof option === 'string') {
            chipElement = (
              <Chip
                key={index}
                label={option}
                onClick={() => handleChipClick(option)}
                color={
                  selectedOptions.includes(option) ? 
                  "success" : "default"
                }
                variant="outlined"
                className={
                  `cursor-pointer ${selectedOptions.includes(option) ? 
                  "opacity-100" : "opacity-50 hover:opacity-100"}`
                }
              />
            );
          }

          return chipElement;
        })}
      </AccordionDetails>
    </Accordion>
  );
}