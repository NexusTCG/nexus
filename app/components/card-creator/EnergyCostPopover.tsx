"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { monoColorOptions } from "@/app/utils/data/cardColorOptions";
import {
  Popover,
  Box,
  IconButton,
  Typography,
  ButtonGroup,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import clsx from "clsx";

type EnergyCostPopoverProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  energyCostChangeCounter: number;
  setEnergyCostChangeCounter: React.Dispatch<React.SetStateAction<number>>;
};

export default function EnergyCostPopover({
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

  const open = Boolean(anchorEl);
  const id = open ? "energy-cost-popover" : undefined;
  const watchCardEnergyCost = watch("cardEnergyCost");
  const watchCardEnergyValue = watch("cardEnergyValue");

  async function handleCostChange(color: string, delta: number) {
    const energyCosts = getValues("cardEnergyCost");

    let newCost = Math.max(0, energyCosts[color] + delta);
    if (color !== "void") newCost = Math.min(newCost, 6);
    else newCost = Math.min(newCost, 15);

    const updatedEnergyCosts = {
      ...energyCosts,
      [color]: newCost
    };

    const newTotalEnergyValue = Object
      .values(updatedEnergyCosts)
      .reduce(
        (acc: number, value) =>
        acc + (value as number),
        0,
    );

    if (
      typeof newTotalEnergyValue === "number"
      && newTotalEnergyValue <= 15
    ) {
      setValue("cardEnergyCost." +
        color, newCost, {
          shouldValidate: true
        });
      setValue("cardEnergyValue",
        newTotalEnergyValue, {
          shouldValidate: true
        });
      await trigger("cardEnergyCost");
      await trigger("cardEnergyValue");
      
      // Force card re-render by tracking each change
      setEnergyCostChangeCounter(energyCostChangeCounter + 1);

      console.log(`Color values: ${JSON.stringify(watchCardEnergyCost)}`)
      console.log(`Total value: ${watchCardEnergyValue}`)
    };
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
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
        bg-gray-800
        border
        border-gray-700
        shadow-lg
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
          <Typography variant="subtitle1" className="font-semibold">
            Select energy cost
          </Typography>
          {watchCardEnergyValue && (
            <Typography variant="overline" className="font-medium text-sm">
              {`Energy value: ${watchCardEnergyValue}`}
            </Typography>
          )}
        </Box>xw
        
        <Box
          className="
            flex
            flex-row
            justify-between
            items-center
            gap-2
          "
        >
        {Object.keys(monoColorOptions).map((color) => (
          <Box
            key={color}
            className={clsx("flex flex-col justify-center items-center w-full gap-2 p-2 rounded-md bg-opacity-20",
              {
                "bg-yellow-500": color === "yellow",
                "bg-sky-500": color === "blue",
                "bg-violet-500": color === "purple",
                "bg-red-500": color === "red",
                "bg-lime-500": color === "green",
                "bg-gray-500": color === "void",
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
                  color !== "void"
                    ? `/images/card-parts/card-icons/card-cost/${color}.png`
                    : `/images/card-parts/card-icons/card-cost/void-${watchCardEnergyCost.void}.png`
                }
                width={34}
                height={34}
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
                onClick={() => handleCostChange(color, +1)}
                size="small"
                className={clsx(
                  "hover:bg-green-700 hover:text-white",
                  watchCardEnergyCost[color] === 0 && "opacity-50",
                )}
              >
                <AddIcon />
              </IconButton>
                <Typography
                  variant="subtitle1"
                  className=" 
                    font-semibold
                    text-gray-300
                    text-xl
                    text-center
                "
                >
                  {watchCardEnergyCost[color]}
                </Typography>
              <IconButton
                disabled={watchCardEnergyCost[color] === 0}
                onClick={() => handleCostChange(color, -1)}
                size="small"
                className={clsx(
                  "hover:bg-red-700 hover:text-white",
                  watchCardEnergyCost[color] === 0 && "opacity-50",
                )}
              >
                <RemoveIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        ))}
        </Box>
      </Box>
    </Popover>
  );
}
