"use client";

import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Typography
} from "@mui/material";
import {
  ArrowDownward,
  Check,
  Palette,
  Brush,
  People,
  Landscape,
  AccessTime,
  WbSunny,
  Mood,
  LocalSee
} from "@mui/icons-material"
import { ArtPromptOptions } from "@/app/utils/data/artStyleOptions";

type ArtPromptAccordionProps = {
  category: keyof typeof ArtPromptOptions;
  title: string;
  selectedOptions: string;
  onSelectionChange: (
    category: keyof typeof ArtPromptOptions,
    selectedOption: string
    ) => void;
};

const categoryIcons = {
  style: <Palette className="text-neutral-500" />,
  technique: <Brush className="text-neutral-500" />,
  subject: <People className="text-neutral-500" />,
  setting: <Landscape className="text-neutral-500" />,
  time: <AccessTime className="text-neutral-500" />,
  weather: <WbSunny className="text-neutral-500" />,
  mood: <Mood className="text-neutral-500" />,
  composition: <LocalSee className="text-neutral-500" />,
};

export default function ArtPromptAccordion({
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
      className="w-full"
    >
      <AccordionSummary
        expandIcon={
          <ArrowDownward
            className="
              text-neutral-500
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