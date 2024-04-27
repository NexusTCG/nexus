"use client";

// Hooks
import React from "react";
import { useFormContext } from "react-hook-form";
// Utils
import { CardFormDataType } from "@/app/utils/types/types";
import Image from "next/image";
// Components
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// Icons
import AddCircleIcon from "@mui/icons-material/AddCircle";

import EnergyRadiant from "@/public/images/card-parts/card-icons/card-cost/energy-radiant.svg";
import EnergyVolatile from "@/public/images/card-parts/card-icons/card-cost/energy-volatile.svg";
import EnergyCorrupt from "@/public/images/card-parts/card-icons/card-cost/energy-corrupt.svg";
import EnergyBlaze from "@/public/images/card-parts/card-icons/card-cost/energy-blaze.svg";
import EnergyVerdant from "@/public/images/card-parts/card-icons/card-cost/energy-verdant.svg";

import EnergyVoid0 from "@/public/images/card-parts/card-icons/card-cost/energy-void-0.svg";
import EnergyVoid1 from "@/public/images/card-parts/card-icons/card-cost/energy-void-1.svg";
import EnergyVoid2 from "@/public/images/card-parts/card-icons/card-cost/energy-void-2.svg";
import EnergyVoid3 from "@/public/images/card-parts/card-icons/card-cost/energy-void-3.svg";
import EnergyVoid4 from "@/public/images/card-parts/card-icons/card-cost/energy-void-4.svg";
import EnergyVoid5 from "@/public/images/card-parts/card-icons/card-cost/energy-void-5.svg";
import EnergyVoid6 from "@/public/images/card-parts/card-icons/card-cost/energy-void-6.svg";
import EnergyVoid7 from "@/public/images/card-parts/card-icons/card-cost/energy-void-7.svg";
import EnergyVoid8 from "@/public/images/card-parts/card-icons/card-cost/energy-void-8.svg";
import EnergyVoid9 from "@/public/images/card-parts/card-icons/card-cost/energy-void-9.svg";
import EnergyVoid10 from "@/public/images/card-parts/card-icons/card-cost/energy-void-10.svg";
import EnergyVoid11 from "@/public/images/card-parts/card-icons/card-cost/energy-void-11.svg";
import EnergyVoid12 from "@/public/images/card-parts/card-icons/card-cost/energy-void-12.svg";
import EnergyVoid13 from "@/public/images/card-parts/card-icons/card-cost/energy-void-13.svg";
import EnergyVoid14 from "@/public/images/card-parts/card-icons/card-cost/energy-void-14.svg";
import EnergyVoid15 from "@/public/images/card-parts/card-icons/card-cost/energy-void-15.svg";

type EnergyCostIconsProps = {
  handleEnergyCostPopoverOpen: (
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

const voidEnergyIcons = [
  EnergyVoid0,
  EnergyVoid1,
  EnergyVoid2,
  EnergyVoid3,
  EnergyVoid4,
  EnergyVoid5,
  EnergyVoid6,
  EnergyVoid7,
  EnergyVoid8,
  EnergyVoid9,
  EnergyVoid10,
  EnergyVoid11,
  EnergyVoid12,
  EnergyVoid13,
  EnergyVoid14,
  EnergyVoid15,
];

export default function EnergyCostIcons({
  handleEnergyCostPopoverOpen
}: EnergyCostIconsProps) {

  const { watch } = useFormContext<CardFormDataType>();
  const formCardData = watch();

  return (
    <>
      {((
        formCardData.im_energy_value === 0 &&
        formCardData.im_type &&
        formCardData.im_type.includes("anomaly")) ||
        Object.values(formCardData.im_energy_cost ?? {}
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
        formCardData.im_energy_cost ?? {}
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
        {Object.entries(formCardData.im_energy_cost ?? {})
          .map(([energy, value]) =>
            energy !== "void"
              ? Array.from({ length: value }, (_, i) => (
                  <Image
                    key={`${energy}-${i}`}
                    src={
                      energy === "radiant" ? EnergyRadiant :
                      energy === "volatile" ? EnergyVolatile :
                      energy === "corrupt" ? EnergyCorrupt :
                      energy === "blaze" ? EnergyBlaze :
                      energy === "verdant" ? EnergyVerdant :
                      null
                    }
                    width={21}
                    height={21}
                    alt={`${energy} energy icon`}
                  />
                ))
              : value > 0
              ? (
                <Image
                  key={`void-${value}`}
                  src={voidEnergyIcons[value]}
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