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

import Void0 from "@/public/images/card-parts/card-icons/card-cost/void-1.svg";
import Void1 from "@/public/images/card-parts/card-icons/card-cost/void-1.svg";
import Void2 from "@/public/images/card-parts/card-icons/card-cost/void-2.svg";
import Void3 from "@/public/images/card-parts/card-icons/card-cost/void-3.svg";
import Void4 from "@/public/images/card-parts/card-icons/card-cost/void-4.svg";
import Void5 from "@/public/images/card-parts/card-icons/card-cost/void-5.svg";
import Void6 from "@/public/images/card-parts/card-icons/card-cost/void-6.svg";
import Void7 from "@/public/images/card-parts/card-icons/card-cost/void-7.svg";
import Void8 from "@/public/images/card-parts/card-icons/card-cost/void-8.svg";
import Void9 from "@/public/images/card-parts/card-icons/card-cost/void-9.svg";
import Void10 from "@/public/images/card-parts/card-icons/card-cost/void-10.svg";
import Void11 from "@/public/images/card-parts/card-icons/card-cost/void-11.svg";
import Void12 from "@/public/images/card-parts/card-icons/card-cost/void-12.svg";
import Void13 from "@/public/images/card-parts/card-icons/card-cost/void-13.svg";
import Void14 from "@/public/images/card-parts/card-icons/card-cost/void-14.svg";
import Void15 from "@/public/images/card-parts/card-icons/card-cost/void-15.svg";

type EnergyCostIconsProps = {
  handleEnergyCostPopoverOpen: (
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

const voidEnergyIcons = [
  Void0,
  Void1,
  Void2,
  Void3,
  Void4,
  Void5,
  Void6,
  Void7,
  Void8,
  Void9,
  Void10,
  Void11,
  Void12,
  Void13,
  Void14,
  Void15,
];

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
                // <Image
                //   key={`void-${value}`}
                //   src={voidEnergyIcons[value]}
                //   width={21}
                //   height={21}
                //   alt={`void energy icon`}
                // />
                <Image
                  key={`void-${value}`}
                  src={Void1}
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