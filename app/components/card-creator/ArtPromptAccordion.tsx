"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
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
import { ArtPromptOptions } from "@/app/utils/data/artPromptOptions";

export type ArtPromptAccordionProps = {
  category: keyof typeof ArtPromptOptions;
  title: string;
  selectedOptions: string;
  onSelectionChange: (
    category: keyof typeof ArtPromptOptions,
    selectedOption: string
    ) => void;
};

const categoryIcons = {
  style: <Palette className="text-neutral-400" />,
  color: <InvertColors className="text-neutral-400" />,
  technique: <Brush className="text-neutral-400" />,
  subject: <People className="text-neutral-400" />,
  setting: <Landscape className="text-neutral-400" />,
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

  function handleChipClick(option: string) {
    const isAlreadySelected = selectedOptions === option;
    onSelectionChange(category, isAlreadySelected ? "" : option);
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
        {ArtPromptOptions[category].map((option, index) => (
          <Chip
            key={index}
            label={option}
            onClick={() => handleChipClick(option)}
            color={selectedOptions === option ? "success" : "default"}
            variant="outlined"
            className={`
              cursor-pointer
              ${selectedOptions.includes(option) ? 
              "opacity-100" : 
              "opacity-50 hover:opacity-100"}
            `}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}