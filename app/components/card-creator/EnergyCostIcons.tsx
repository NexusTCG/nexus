"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import { CardFormDataType } from "@/app/utils/types/types";
import Yellow from "@/public/images/card-parts/card-icons/card-cost/yellow.svg";
import Blue from "@/public/images/card-parts/card-icons/card-cost/blue.svg";
import Purple from "@/public/images/card-parts/card-icons/card-cost/purple.svg";
import Red from "@/public/images/card-parts/card-icons/card-cost/red.svg";
import Green from "@/public/images/card-parts/card-icons/card-cost/green.svg";

type EnergyCostIconsProps = {
  handleEnergyCostPopoverOpen: (
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

export default function EnergyCostIcons({
  handleEnergyCostPopoverOpen
}: EnergyCostIconsProps) {

  const { watch } = useFormContext<CardFormDataType>();
  const formCardData = watch();

  return (
    <>
      {((
        formCardData.cardEnergyValue === 0 &&
        formCardData.cardType &&
        formCardData.cardType.includes("node")) ||
        Object.values(formCardData.cardEnergyCost ?? {}
      ).every(value => value === 0)) ? (
        <IconButton
          aria-label="add cost"
          size="small"
          onClick={handleEnergyCostPopoverOpen}
          color="secondary"
          sx={{
            height: "20px !important",
            width: "20px !important",
            padding: "0",
          }}
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
            w-auto
            gap-0.25
            cursor-pointer
            hover:opacity-80
          "
        >
        {Object.entries(formCardData.cardEnergyCost ?? {})
          .map(([color, value]) =>
            color !== "void"
              ? Array.from({ length: value }, (_, i) => (
                  // <Image
                  //   key={`${color}-${i}`}
                  //   src={`/images/card-parts/card-icons/card-cost/${color}.PNG`}
                  //   width={21}
                  //   height={21}
                  //   alt={`${color} energy icon`}
                  // />
                  <Image
                    key={`${color}-${i}`}
                    src={
                      color === "yellow" ? Yellow :
                      color === "blue" ? Blue :
                      color === "purple" ? Purple :
                      color === "red" ? Red :
                      color === "green" ? Green :
                      null
                    }
                    width={21}
                    height={21}
                    alt={`${color} energy icon`}
                  />
                ))
              : value > 0
              ? (
                  <Image
                    key={`void-0`}
                    src={`/images/card-parts/card-icons/card-cost/void-${value}.PNG`}
                    width={21}
                    height={21}
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