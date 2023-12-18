"use client";

import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FlareIcon from '@mui/icons-material/Flare';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Box } from '@mui/material';

// Define a type for the energy values object
type EnergyValues = {
  [key: string]: number;
};

export default function ColorCostControl() {
  const [decrementHoveredButton, setDecrementHoveredButton] = React.useState<string | null>(null);
  const decrementHover = decrementHoveredButton === "decrease" ? "error" : "primary";
  const [incrementHoveredButton, setIncrementHoveredButton] = React.useState<string | null>(null);
  const incrementHover = incrementHoveredButton === "increase" ? "success" : "primary";
  const maxIconsPerType = 5;
  const maxTotalIcons = 6;
  const energyTypes: string[] = ['yellow', 'blue', 'purple', 'red', 'green'];

  // Initialize energyValues with all types set to zero
  const [energyValues, setEnergyValues] = React.useState<EnergyValues>(
    energyTypes.reduce((acc, type) => ({ ...acc, [type]: 0 }), {})
  );

  // Calculate the total energy icons by summing the values
  const totalEnergyIcons = Object.values(energyValues).reduce((sum, val) => sum + val, 0);

  // A handler for changing energy values
  const handleEnergyChange = (type: string, delta: number) => () => {
    const newValue = energyValues[type] + delta;

    if (newValue < 0 || newValue > maxIconsPerType || totalEnergyIcons + delta > maxTotalIcons) {
      return;
    }

    setEnergyValues({ ...energyValues, [type]: newValue });
  };

  const renderEnergyControl = (type: string) => (
    <ButtonGroup
      key={type}
      variant="outlined"
      aria-label={`${type} energy control`}
      className="flex flex-row justify-between items-center px-8 py-auto hover:bg-gray-900 hover:bg-opacity-50"
      sx={{ height: "56px" }}
    >
      <IconButton
        color={decrementHover}
        size="small"
        onClick={handleEnergyChange(type, -1)}
        onMouseEnter={() => setDecrementHoveredButton("decrease")}
        onMouseLeave={() => {
          setTimeout(() => {
            if (decrementHoveredButton === "decrease") {
              setDecrementHoveredButton(null);
            }
          }, 500);
        }}
      >
        <RemoveIcon />
      </IconButton>

      {type === "yellow" && (<FlareIcon
        className="bg-yellow-200 text-black rounded-full"
        sx={{
          width: "30px",
          height: "30px",
          padding: "3px",
          boxShadow: "0 2px 0px rgba(0, 0, 0, 0.8)",
        }}
      />)}
      {type === "blue" && (<ElectricBoltIcon
        className="bg-sky-300 text-black rounded-full"
        sx={{
          width: "30px",
          height: "30px",
          padding: "3px",
          boxShadow: "0 2px 0px rgba(0, 0, 0, 0.8)",
        }}
      />)}
      {type === "purple" && (<Brightness4Icon
        className="bg-purple-300 text-black rounded-full"
        sx={{
          width: "30px",
          height: "30px",
          padding: "3px",
          boxShadow: "0 2px 0px rgba(0, 0, 0, 0.8)",
        }}
      />)}
      {type === "red" && (<LocalFireDepartmentIcon
        className="bg-red-300 text-black rounded-full"
        sx={{
          width: "30px",
          height: "30px",
          padding: "3px",
          boxShadow: "0 2px 0px rgba(0, 0, 0, 0.8)",
        }}
      />)}
      {type === "green" && (<EnergySavingsLeafIcon
        className="bg-lime-300 text-black rounded-full"
        sx={{
          width: "30px",
          height: "30px",
          padding: "3px",
          boxShadow: "0 2px 0px rgba(0, 0, 0, 0.8)",
        }}
      />)}

      <IconButton
        color={incrementHover}
        size="small"
        onClick={handleEnergyChange(type, 1)}
        onMouseEnter={() => setIncrementHoveredButton("increase")}
        onMouseLeave={() => {
          setTimeout(() => {
            if (incrementHoveredButton === "increase") {
              setIncrementHoveredButton(null);
            }
          }, 500);
        }}
      >
        <AddIcon />
      </IconButton>
    </ButtonGroup>
  );

  return (
    <Box className="flex flex-col w-full h-full rounded-md border border-gray-500 hover:border-white">
      {energyTypes.map((type) => (
        <div key={type}>
          {renderEnergyControl(type)}
        </div>
      ))}
    </Box>
  );
}