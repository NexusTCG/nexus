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
};

export default function EnergyCostPopover({
  anchorEl,
  handleClose,
}: EnergyCostPopoverProps) {
  const { setValue, getValues, watch } = useFormContext();

  const open = Boolean(anchorEl);
  const id = open ? "energy-cost-popover" : undefined;
  const watchCardEnergyCost = watch("cardEnergyCost");
  const watchCardEnergyValue = watch("cardEnergyValue");

  function handleCostChange(color: string, delta: number) {
    const energyCosts = getValues("cardEnergyCost");

    let newCost = Math.max(0, energyCosts[color] + delta);
    if (color !== "void") newCost = Math.min(newCost, 6);
    else newCost = Math.min(newCost, 15);

    const updatedEnergyCosts = { ...energyCosts, [color]: newCost };

    const newTotalEnergyValue = Object.values(updatedEnergyCosts).reduce(
      (acc: number, value) => acc + (value as number),
      0,
    );

    if (typeof newTotalEnergyValue === "number" && newTotalEnergyValue <= 15) {
      setValue("cardEnergyCost." + color, newCost);
      setValue("cardEnergyValue", newTotalEnergyValue);
    }
  }

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
        flex-row
        justify-start
        items-center
        w-[480]
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
            flex-col
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
              {`Total energy value: ${watchCardEnergyValue}`}
            </Typography>
          )}
        </Box>

        {Object.keys(monoColorOptions).map((color) => (
          <Box
            key={color}
            sx={{ display: "flex", alignItems: "center", margin: 1 }}
          >
            <Box
              className="
                flex
                flex-col
                justify-center
                items-center
                gap-1
                p-2
                bg-gray-700
                rounded-md
            "
            >
              <Image
                src={
                  color !== "void"
                    ? `/images/card-parts/card-icons/${color}.png`
                    : `/images/card-parts/card-icons/void-${watchCardEnergyCost.void}.png`
                }
                width={34}
                height={34}
                alt={`${color} energy icon`}
              />
              <Typography
                variant="subtitle2"
                className=" 
                  font-semibold
                  text-gray-300
                  text-center
              "
              >
                {watchCardEnergyCost[color]}
              </Typography>
            </Box>

            <ButtonGroup
              variant="contained"
              aria-label="Increase and decrease energy cost"
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
    </Popover>
  );
}
