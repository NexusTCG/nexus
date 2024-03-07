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
                  <Image
                    key={`void-${value}`}
                    // src={`/images/card-parts/card-icons/card-cost/void-${value}.PNG`}
                    src={
                      value === 1 ? Void1 :
                      value === 2 ? Void2 :
                      value === 3 ? Void3 :
                      value === 4 ? Void4 :
                      value === 5 ? Void5 :
                      value === 6 ? Void6 :
                      value === 7 ? Void7 :
                      value === 8 ? Void8 :
                      value === 9 ? Void9 :
                      value === 10 ? Void10 :
                      value === 11 ? Void11 :
                      value === 12 ? Void12 :
                      value === 13 ? Void13 :
                      value === 14 ? Void14 :
                      value === 15 ? Void15 :
                      Void0 // 0 is default
                    }
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