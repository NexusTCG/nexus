"use client";

// Hooks
import React from "react";
import { useFormContext } from "react-hook-form";
// Utils
import { monoEnergyOptions } from "@/app/utils/data/cardEnergyOptions";
import Image from "next/image";
import clsx from "clsx";
// Components
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
// Icons
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

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

type EnergyCostPopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  energyCostChangeCounter: number;
  setEnergyCostChangeCounter: React.Dispatch<React.SetStateAction<number>>;
};

type EnergyCosts = {
  [color: string]: number;
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

export default function EnergyCostPopover({
  open,
  anchorEl,
  handleClose,
  energyCostChangeCounter,
  setEnergyCostChangeCounter
}: EnergyCostPopoverProps) {

  const {
    setValue,
    getValues,
    watch,
    trigger
  } = useFormContext();

  // const open = Boolean(anchorEl);
  const id = open ? "energy-cost-popover" : undefined;
  const watchCardEnergyCost = watch("im_energy_cost") as EnergyCosts;
  const watchCardEnergyValue = watch("im_energy_value");
  const watchVoidEnergyValue = watchCardEnergyCost.void;

  // Cost change handler
  async function handleCostChange(
    energy: string,
    delta: number
  ) {
    // Get the current energy cost values
    const energyCosts = getValues("im_energy_cost") as EnergyCosts;
  
    // Calculate the total of non-void energies before any changes
    const nonVoidTotalBefore = Object
      .entries(energyCosts)
      .filter(([key]) => key !== "void")
        .reduce((acc, [, value]) =>
        acc + value, 0);

    const totalEnergyBefore = Object
      .values(energyCosts)
      .reduce((acc, value) =>
        acc + value, 0);
  
    // Determine if adding this delta will exceed the non-void or total limits
    const willExceedNonVoidLimit =
    energy !== "void" &&
      (nonVoidTotalBefore + delta > 5 ||
      energyCosts[energy] + delta > 5);

    const willExceedTotalLimit =
      totalEnergyBefore + delta > 15;
  
    // Prevent changes that exceed limits
    if (willExceedNonVoidLimit || (
      energy === "void" && willExceedTotalLimit
    )) {
      console.log("Limit reached, cannot increase further.");
      return;
    }
  
    // Calculate new cost within the allowed limits
    let newCost = Math
      .max(
        0,
        energyCosts[energy] +
        delta
      );

    if (energy !== "void") {
      newCost = Math
        .min(newCost, 5);
    } else {
      const maxVoid =
        15 - nonVoidTotalBefore;
      newCost = Math
        .min(newCost, maxVoid);
    }
  
    // Update the energy costs with the new value
    const updatedEnergyCosts = {
      ...energyCosts,
      [energy]: newCost
    };
  
    // Calculate the new total energy value
    const newTotalEnergyValue = Object
      .values(updatedEnergyCosts)
      .reduce((acc, value) =>
        acc + value, 0
      );
  
    // Update the form values
    if (newTotalEnergyValue <= 15) {
      // Set new values
      setValue(
        "im_energy_cost." +
        energy, newCost, {
          shouldValidate: true
        });
      setValue(
        "im_energy_value",
        newTotalEnergyValue, {
          shouldValidate: true
        });
      
      // Trigger validation
      await trigger("im_energy_cost");
      await trigger("im_energy_value");
  
      // Force card re-render by tracking each change
      setEnergyCostChangeCounter(
        energyCostChangeCounter + 1
      );
  
      console.log(
        `Energy values: ${JSON.stringify(updatedEnergyCosts)}`
      );
      console.log(
        `Total value: ${newTotalEnergyValue}`
      );
    }
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      className="bg-black/25"
    >
      <Box
        className="
          flex
          flex-col
          justify-start
          items-center
          gap-4
          p-4
          rounded-lg
        "
      >
        <Box
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
          "
        >
          <Typography
            variant="subtitle1"
            className="font-semibold text-gray-200"
          >
            Select energy cost
          </Typography>
          {watchCardEnergyValue && (
            <Typography
              variant="overline"
              className="
                font-medium
                text-sm
                "
            >
              {`Energy value: ${watchCardEnergyValue}`}
            </Typography>
          )}
        </Box>
        
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: 360,
          }}
        >
          {Object.keys(monoEnergyOptions).map((energy) => (
            <Grid
              key={energy}
              item
              xs={4}
            >
              <Box
                className={clsx("flex flex-col justify-center items-center w-full gap-1 py-1 px-2 rounded-lg hover:shadow-md hover:shadow-gray-900/50",
                  {
                    "bg-yellow-500":
                      energy === "radiant",
                    "bg-opacity-10 hover:bg-opacity-20 border border-yellow-500/0 hover:border-yellow-500/40":
                      energy === "radiant" && watchCardEnergyCost[energy] === 0,
                    "bg-opacity-40 border border-yellow-500/80 shadow-sm shadow-gray-900/50":
                      energy === "radiant" && watchCardEnergyCost[energy] > 0,
                  },
                  {
                    "bg-sky-500":
                      energy === "volatile",
                    "bg-opacity-10 hover:bg-opacity-20 border border-sky-500/0 hover:border-sky-500/40":
                      energy === "volatile" && watchCardEnergyCost[energy] === 0,
                    "bg-opacity-40 border border-sky-500/80 shadow-sm shadow-gray-900/50":
                      energy === "volatile" && watchCardEnergyCost[energy] > 0,
                  },
                  {
                    "bg-violet-500":
                      energy === "corrupt",
                    "bg-opacity-10 hover:bg-opacity-20 border border-violet-500/0 hover:border-violet-500/40":
                      energy === "corrupt" && watchCardEnergyCost[energy] === 0,
                    "bg-opacity-40 border border-violet-500/80 shadow-sm shadow-gray-900/50":
                      energy === "corrupt" && watchCardEnergyCost[energy] > 0,
                  },
                  {
                    "bg-red-500":
                    energy === "blaze",
                    "bg-opacity-10 hover:bg-opacity-20 border border-red-500/0 hover:border-red-500/40":
                      energy === "blaze" && watchCardEnergyCost[energy] === 0,
                    "bg-opacity-40 border border-red-500/80 shadow-sm shadow-gray-900/50":
                      energy === "blaze" && watchCardEnergyCost[energy] > 0,
                  },
                  {
                    "bg-lime-500":
                      energy === "verdant",
                    "bg-opacity-10 hover:bg-opacity-20 border border-lime-500/0 hover:border-lime-500/40":
                      energy === "verdant" && watchCardEnergyCost[energy] === 0,
                    "bg-opacity-40 border border-lime-500/80 shadow-sm shadow-gray-900/50":
                      energy === "verdant" && watchCardEnergyCost[energy] > 0,
                  },
                  {
                    "bg-gray-500":
                      energy === "void",
                    "bg-opacity-10 hover:bg-opacity-20 border border-gray-500/0 hover:border-gray-500/40":
                      energy === "void" && watchCardEnergyCost[energy] === 0,
                    "bg-opacity-40 border border-ligrayme-500/80 shadow-sm shadow-gray-900/50":
                      energy === "void" && watchCardEnergyCost[energy] > 0,
                  }
                )}
              >
                <Box
                  className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-full
                    gap-2
                    p-2
                  "
                >
                  <Image
                    src={
                      energy === "radiant" ? EnergyRadiant
                      : energy === "volatile" ? EnergyVolatile
                      : energy === "corrupt" ? EnergyCorrupt
                      : energy === "blaze" ? EnergyBlaze
                      : energy === "verdant" ? EnergyVerdant
                      : energy === "void" ? voidEnergyIcons[watchVoidEnergyValue]
                      : null
                    }
                    width={30}
                    height={30}
                    alt={`${energy} energy icon`}
                  />
                </Box>

                <ButtonGroup
                  variant="outlined"
                  aria-label="Increase and decrease energy cost"
                  className="
                    flex
                    flex-row
                    justify-between
                    items-center
                    w-full
                    gap-2
                  "
                >
                <IconButton
                  disabled={
                    (energy !== "void" &&
                      watchCardEnergyCost[energy] >= 5
                    ) ||
                    (energy !== "void" && Object
                      .entries(watchCardEnergyCost)
                      .reduce((acc, [key, val]) => {
                        return key !== "void" ?
                        acc + val : acc;
                      }, 0) >= 5
                    ) ||
                    (energy === "void" && Object
                      .values(watchCardEnergyCost)
                      .reduce((acc, val) =>
                        acc + val,
                        0) >= 15
                    )
                  }
                  onClick={() => handleCostChange(energy, +1)}
                  className={clsx(
                    "hover:opacity-100",
                    watchCardEnergyCost[energy] === 0 && "opacity-50",
                  )}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                  <Typography
                    variant="body1"
                    className={clsx(
                      "font-semibold text-gray-200 text-lg text-center",
                      watchCardEnergyCost[energy] === 0 && "opacity-50",
                    )}
                  >
                    {watchCardEnergyCost[energy]}
                  </Typography>
                <IconButton
                  disabled={watchCardEnergyCost[energy] === 0}
                  onClick={() => handleCostChange(energy, -1)}
                  size="small"
                  className={clsx(
                    "hover:opacity-100",
                    watchCardEnergyCost[energy] === 0 && "opacity-25",
                    watchCardEnergyCost[energy] > 0 && "opacity-50",
                  )}
                >
                  <RemoveIcon
                    fontSize="small"
                  />
                </IconButton>
              </ButtonGroup>
            </Box>
          </Grid>
          ))}
        </Grid>
      </Box>
    </Popover>
  );
}
