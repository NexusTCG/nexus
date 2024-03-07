"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { monoColorOptions } from "@/app/utils/data/cardColorOptions";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import clsx from "clsx";
// Energy icons
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
  const watchCardEnergyCost = watch("cardEnergyCost") as EnergyCosts;
  const watchCardEnergyValue = watch("cardEnergyValue");
  const watchVoidEnergyValue = watchCardEnergyCost.void;

  // Cost change handler
  async function handleCostChange(
    color: string,
    delta: number
  ) {
    // Get the current energy cost values
    const energyCosts = getValues("cardEnergyCost") as EnergyCosts;
  
    // Calculate the total of non-void colors before any changes
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
      color !== "void" &&
      (nonVoidTotalBefore + delta > 5 ||
      energyCosts[color] + delta > 5);

    const willExceedTotalLimit =
      totalEnergyBefore + delta > 15;
  
    // Prevent changes that exceed limits
    if (willExceedNonVoidLimit || (
      color === "void" && willExceedTotalLimit
    )) {
      console.log("Limit reached, cannot increase further.");
      return;
    }
  
    // Calculate new cost within the allowed limits
    let newCost = Math
      .max(
        0,
        energyCosts[color] +
        delta
      );

    if (color !== "void") {
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
      [color]: newCost
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
        "cardEnergyCost." +
        color, newCost, {
          shouldValidate: true
        });
      setValue(
        "cardEnergyValue",
        newTotalEnergyValue, {
          shouldValidate: true
        });
      
      // Trigger validation
      await trigger("cardEnergyCost");
      await trigger("cardEnergyValue");
  
      // Force card re-render by tracking each change
      setEnergyCostChangeCounter(
        energyCostChangeCounter + 1
      );
  
      console.log(
        `Color values: ${JSON.stringify(updatedEnergyCosts)}`
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
          {Object.keys(monoColorOptions).map((color) => (
            <Grid
              key={color}
              item
              xs={4}
            >
              <Box
                className={clsx("flex flex-col justify-center items-center w-full gap-1 py-1 px-2 rounded-lg hover:shadow-md hover:shadow-gray-900/50",
                  {
                    "bg-yellow-500":
                      color === "yellow",
                    "bg-opacity-10 hover:bg-opacity-20 border border-yellow-500/0 hover:border-yellow-500/40":
                      color === "yellow" && watchCardEnergyCost[color] === 0,
                    "bg-opacity-40 border border-yellow-500/80 shadow-sm shadow-gray-900/50":
                      color === "yellow" && watchCardEnergyCost[color] > 0,
                  },
                  {
                    "bg-sky-500":
                      color === "blue",
                    "bg-opacity-10 hover:bg-opacity-20 border border-sky-500/0 hover:border-sky-500/40":
                      color === "blue" && watchCardEnergyCost[color] === 0,
                    "bg-opacity-40 border border-sky-500/80 shadow-sm shadow-gray-900/50":
                      color === "blue" && watchCardEnergyCost[color] > 0,
                  },
                  {
                    "bg-violet-500":
                      color === "purple",
                    "bg-opacity-10 hover:bg-opacity-20 border border-violet-500/0 hover:border-violet-500/40":
                      color === "purple" && watchCardEnergyCost[color] === 0,
                    "bg-opacity-40 border border-violet-500/80 shadow-sm shadow-gray-900/50":
                      color === "purple" && watchCardEnergyCost[color] > 0,
                  },
                  {
                    "bg-red-500":
                      color === "red",
                    "bg-opacity-10 hover:bg-opacity-20 border border-red-500/0 hover:border-red-500/40":
                      color === "red" && watchCardEnergyCost[color] === 0,
                    "bg-opacity-40 border border-red-500/80 shadow-sm shadow-gray-900/50":
                      color === "red" && watchCardEnergyCost[color] > 0,
                  },
                  {
                    "bg-lime-500":
                      color === "green",
                    "bg-opacity-10 hover:bg-opacity-20 border border-lime-500/0 hover:border-lime-500/40":
                      color === "green" && watchCardEnergyCost[color] === 0,
                    "bg-opacity-40 border border-lime-500/80 shadow-sm shadow-gray-900/50":
                      color === "green" && watchCardEnergyCost[color] > 0,
                  },
                  {
                    "bg-gray-500":
                      color === "void",
                    "bg-opacity-10 hover:bg-opacity-20 border border-gray-500/0 hover:border-gray-500/40":
                      color === "void" && watchCardEnergyCost[color] === 0,
                    "bg-opacity-40 border border-ligrayme-500/80 shadow-sm shadow-gray-900/50":
                      color === "void" && watchCardEnergyCost[color] > 0,
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
                      color === "yellow" ? Yellow
                      : color === "blue" ? Blue
                      : color === "purple" ? Purple
                      : color === "red" ? Red
                      : color === "green" ? Green
                      : color === "void" ? voidEnergyIcons[watchVoidEnergyValue]
                      : null
                      // : `/images/card-parts/card-icons/card-cost/void-${watchCardEnergyCost.void}.PNG`
                    }
                    width={30}
                    height={30}
                    alt={`${color} energy icon`}
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
                    (color !== "void" &&
                      watchCardEnergyCost[color] >= 5
                    ) ||
                    (color !== "void" && Object
                      .entries(watchCardEnergyCost)
                      .reduce((acc, [key, val]) => {
                        return key !== "void" ?
                        acc + val : acc;
                      }, 0) >= 5
                    ) ||
                    (color === "void" && Object
                      .values(watchCardEnergyCost)
                      .reduce((acc, val) =>
                        acc + val,
                        0) >= 15
                    )
                  }
                  onClick={() => handleCostChange(color, +1)}
                  className={clsx(
                    "hover:opacity-100",
                    watchCardEnergyCost[color] === 0 && "opacity-50",
                  )}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                  <Typography
                    variant="body1"
                    className={clsx(
                      "font-semibold text-gray-200 text-lg text-center",
                      watchCardEnergyCost[color] === 0 && "opacity-50",
                    )}
                  >
                    {watchCardEnergyCost[color]}
                  </Typography>
                <IconButton
                  disabled={watchCardEnergyCost[color] === 0}
                  onClick={() => handleCostChange(color, -1)}
                  size="small"
                  className={clsx(
                    "hover:opacity-100",
                    watchCardEnergyCost[color] === 0 && "opacity-25",
                    watchCardEnergyCost[color] > 0 && "opacity-50",
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
