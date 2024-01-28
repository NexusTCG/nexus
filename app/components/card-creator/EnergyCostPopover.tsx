"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Popover, Box, IconButton, Typography, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { monoColorOptions } from '@/app/utils/data/cardColorOptions';
import Image from "next/image";
import clsx from "clsx";

type EnergyCostPopoverProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  name: string; // This is the field name in the form
};

export default function EnergyCostPopover({
  anchorEl,
  handleClose,
  name,
}: EnergyCostPopoverProps) {

  const {
    control,
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const watchCardEnergyValue = watch("cardEnergyValue");
  const watchCardEnergyCost = watch("cardEnergyCost");

  const handleCostChange = (color: string, delta: number) => {
    const energyCosts = getValues(`${name}.cardEnergyCost`);
    const newCost = Math.max(0, Math.min(energyCosts[color] + delta, color === 'void' ? 15 : 6));
    const newEnergyCosts = { ...energyCosts, [color]: newCost };
    const newEnergyValue = Object.values(newEnergyCosts).reduce((acc, value) => acc + value, 0);
  
    if (newEnergyValue <= 15) {
      setValue(`${name}.cardEnergyCost.${color}`, newCost); // Update the individual energy count
      setValue(`${name}.cardEnergyValue`, newEnergyValue); // Update the total energy value
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'energy-cost-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Box
        className="
        flex
        flex-col
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
      ">
        <Box
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
        ">
          <Typography
            variant="subtitle1"
            className="font-semibold"
          >
            Select energy cost
          </Typography>
          {watchCardEnergyValue && (<Typography
            variant="overline"
            className="font-medium text-sm"
          >
            {`Total energy value: ${watchCardEnergyValue}`}
          </Typography>)}
        </Box>
        
        {Object.keys(monoColorOptions).map((color, value) => (
          <Box key={color} sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
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
            ">
              <Image
                src={color !== "void" ? `/images/card-parts/card-icons/${color}.png` : `/images/card-parts/card-icons/void-${watchCardEnergyCost.void}.png`}
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
              ">
                {watchCardEnergyCost[color][value]}
              </Typography>
            </Box>

            <ButtonGroup
              variant="contained"
              aria-label="Increase and decrease energy cost"
            >
              <IconButton
                onClick={() => handleCostChange(color, +1)}
                size="small"
                className="
                  hover:bg-green-700
                  hover:text-white
              ">
                <AddIcon />
              </IconButton>
              
              <IconButton
                disabled={watchCardEnergyCost[color][value] === 0}
                onClick={() => handleCostChange(color, -1)}
                size="small"
                className={clsx("hover:bg-green-700 hover:text-white",
                  watchCardEnergyCost[color][value] === 0 && "opacity-50 cursor-default"
                )}>
                <RemoveIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        ))}
      </Box>
    </Popover>
  );
};
