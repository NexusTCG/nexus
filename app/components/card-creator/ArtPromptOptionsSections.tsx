"use client";

// Hooks
import React from "react";
// Data
import { ArtPromptOptionsData } from "@/app/utils/data/artPromptOptions";
// Utils
import Image from "next/image";
// import clsx from "clsx";
// Components
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

type ArtPromptOptionSectionsProps = {
  selectedOptions: { 
    [category: string]: string | null 
  };
  onSelectionChange: (
    category: string, 
    selectedOptionTitle: string | null
  ) => void;
};

export default function ArtPromptOptionsSections({
  onSelectionChange,
  selectedOptions,
}: ArtPromptOptionSectionsProps) {

  const handleChipClick = (
    category: string, 
    optionId: number
  ) => {
    const option = ArtPromptOptionsData[category].options.find(o => o.id === optionId);
    const isSelected = selectedOptions[category] === option?.title;
    onSelectionChange(category, isSelected ? null : option?.title || null);
  };
  
  return (
    <Box
      id="art-prompt-options-sections-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
      "
    >
      {Object
        .entries(ArtPromptOptionsData)
        .map(([category, { 
            section, 
            icon: Icon, 
            options 
          }]) => (
        <Box
          id={`${category}-options-container`}
          key={category}
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-4
            p-4
            border-b
            border-neutral-700
          "
        >
          <Typography
            variant="subtitle2"
            className="
              flex
              items-center
              font-semibold
              gap-2
              text-white
            "
          >
            <Icon />
            {section.toUpperCase()}
          </Typography>
          <Box
            id={`${category}-options-chips-container`}
            className="
              flex
              flex-wrap
              justify-start
              items-start
              gap-1
            "
          >
            {options.map((option) => (
              <Tooltip
                key={option.id}
                title={
                  <>
                    <Box
                      id="tooltip-header"
                      className="
                        flex
                        flex-col
                        justify-start
                        items-start
                        gap-1
                        mb-2
                      "
                    >
                      <Typography
                          variant="body1"
                          className="
                            text-white
                            font-semibold
                          "
                        >
                          {option.title}
                        </Typography>
                        {option.image && 
                        option.description && (
                          <Typography
                            variant="body2"
                          >
                            {option.description}
                          </Typography>
                        )}
                    </Box>
                    {option.image && (
                      <Image
                        src={option.image}
                        alt={`${option.title} image`}
                        width={300}
                        height={200}
                      />
                    )}
                  </>
                }
              >
                <Chip
                  label={option.title}
                  variant="outlined"
                  onClick={
                    () => handleChipClick(
                      category, 
                      option.id
                    )}
                  color={
                    selectedOptions[category] === option.title ? 
                    "primary" : "default"
                  }
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};