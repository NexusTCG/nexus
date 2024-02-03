"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { IconButton, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import { CardFormDataType } from "@/app/utils/types/types";

type EnergyCostIconsProps = {
    handleEnergyCostPopoverOpen: (event: React.MouseEvent<HTMLElement>) => void;
  };

export default function EnergyCostIcons({
    handleEnergyCostPopoverOpen
  }: EnergyCostIconsProps) {

    const {watch } = useFormContext<CardFormDataType>();
    const formCardData = watch();

    return (
      <>
        {((
            formCardData.cardEnergyValue === 0 &&
            formCardData.cardType === "node") ||
            Object.values(formCardData.cardEnergyCost ?? {}
        ).every(value => value === 0)) ? (
          <IconButton
            aria-label="add cost"
            size="large"
            onClick={handleEnergyCostPopoverOpen}
            color="primary"
            className="p-2 bg-gray-200"
          >
            <AddCircleIcon />
          </IconButton>
        ) : null}
  
        {Object.values(
            formCardData.cardEnergyCost ?? {}
        ).some(value => value > 0) && (
          <Box
            onClick={handleEnergyCostPopoverOpen}
            className="
                flex
                flex-row
                justify-end
                items-center
                w-full
                gap-0.25
                cursor-pointer
                hover:opacity-80
            "
          >
            {Object.entries(formCardData.cardEnergyCost ?? {})
              .map(([color, value]) =>
                color !== "void"
                  ? Array.from({ length: value }, (_, i) => (
                      <Image
                        key={`${color}-${i}`}
                        src={`/images/card-parts/card-icons/card-cost/${color}.png`}
                        width={30}
                        height={30}
                        alt={`${color} energy icon`}
                      />
                    ))
                  : value > 0
                  ? (
                      <Image
                        key={`void-0`}
                        src={`/images/card-parts/card-icons/card-cost/void-${value}.png`}
                        width={30}
                        height={30}
                        alt={`void energy icon`}
                      />
                    )
                  : null
              )}
          </Box>
        )}
      </>
    );
  };