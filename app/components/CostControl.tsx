"use client";

import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import {
  Remove as RemoveIcon,
  Add as AddIcon,
  BrightnessHigh as BrightnessHighIcon,
  ElectricBolt as ElectricBoltIcon,
  DarkMode as DarkModeIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  Spa as SpaIcon,
  FilterTiltShift as FilterTiltShiftIcon,
} from '@mui/icons-material';

type EnergyType = 'yellow' | 'blue' | 'purple' | 'red' | 'green' | 'colorless';

type EnergyValues = {
  [key in EnergyType]: number;
};

const energyTypes: EnergyType[] = ['yellow', 'blue', 'purple', 'red', 'green', 'colorless'];

// Main component
export default function CostControl() {
  const maxIconsPerType = 5;
  const maxTotalIcons = 6;

  const [energyValues, setEnergyValues] = React.useState<EnergyValues>(
    energyTypes.reduce<EnergyValues>((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {} as EnergyValues)
  );

  const totalEnergyIcons = Object.values(energyValues).reduce((sum, val) => sum + val, 0);

  const handleEnergyChange = (type: EnergyType, delta: number) => () => {
    const newValue = energyValues[type] + delta;
    const maxPerType = type === 'colorless' ? 10 : maxIconsPerType;
    
    if (type === 'colorless') {
      if (newValue < 0 || newValue > maxPerType) {
        return;
      }
    } else {
      if (newValue < 0 || newValue > maxPerType || totalEnergyIcons + delta > maxTotalIcons) {
        return;
      }
    }
  
    setEnergyValues({ ...energyValues, [type]: newValue });
  };

  const iconMapping: { [key in EnergyType]: JSX.Element } = {
    yellow: <BrightnessHighIcon
      className="bg-yellow-300 hover:bg-yellow-200 text-black rounded-full hover:shadow-md hover:shadow-black"
      sx={{ height: "30px", width: "30px", padding: "2px" }}
    />,
    blue: <ElectricBoltIcon
      className="bg-sky-400 text-black rounded-full hover:shadow-md hover:shadow-black"
      sx={{ height: "30px", width: "30px", padding: "2px" }}
    />,
    purple: <DarkModeIcon
      className="bg-purple-400 text-black rounded-full hover:shadow-md hover:shadow-black"
      sx={{ height: "30px", width: "30px", padding: "2px" }}
    />,
    red: <LocalFireDepartmentIcon
      className="bg-red-300 text-black rounded-full hover:shadow-md hover:shadow-black"
      sx={{ height: "30px", width: "30px", padding: "2px" }}
    />,
    green: <SpaIcon
      className="bg-lime-400 text-black rounded-full hover:shadow-md hover:shadow-black"
      sx={{ height: "30px", width: "30px", padding: "2px" }}
    />,
    colorless: <FilterTiltShiftIcon
      className="bg-slate-400 text-black rounded-full hover:shadow-md hover:shadow-black"
      sx={{ height: "30px", width: "30px", padding: "2px" }}
    />,
  };
  
  const renderEnergyControl = (type: EnergyType): JSX.Element => {
    return (
      <ButtonGroup
        key={type}
        variant="outlined"
        aria-label={`${type} energy control`}
        className="flex flex-col-reverse lg:flex-row w-full justify-center items-center py-auto space-x-2"
      >
        <IconButton onClick={handleEnergyChange(type, -1)} className="text-gray-400">
          <RemoveIcon />
        </IconButton>

        {iconMapping[type]}

        <IconButton onClick={handleEnergyChange(type, 1)} className="text-gray-400">
          <AddIcon />
        </IconButton>
      </ButtonGroup>
    );
  };

  return (
    <Box className="flex flex-row lg:flex-col lg:h-full justify-center items-center mb-4 lg:mb-0 border border-gray-500 hover:border-white rounded-md">
      {energyTypes.map((type) => (
        <Box key={type} className="w-full py-2 px-3">{renderEnergyControl(type)}</Box>
      ))}
    </Box>
  );
}