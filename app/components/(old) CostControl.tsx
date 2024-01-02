// // CostControl.tsx
// "use client";

// import * as React from 'react';
// import { Box, ButtonGroup, IconButton } from '@mui/material';
// import { energyIcons } from '@/app/constants/iconData';
// import { EnergyType, CostValues } from '@/app/types/types';
// import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

// // TYPES
// type EnergyValues = {
//   [key in EnergyType]: number;
// };

// const energyTypes: EnergyType[] = ['yellow', 'blue', 'purple', 'red', 'green', 'colorless'];

// type CostControlProps = {
//   onCostChange: (newCostValues: CostValues) => void;
// };

// // COMPONENT
// export default function CostControl({ onCostChange }: CostControlProps) {
//   const maxIconsPerType = 5;
//   const maxTotalIcons = 6;

//   const [energyValues, setEnergyValues] = React.useState<EnergyValues>(
//     energyTypes.reduce<EnergyValues>((acc, type) => {
//       acc[type] = 0;
//       return acc;
//     }, {} as EnergyValues)
//   );

//   const totalEnergyIcons = Object.values(energyValues).reduce((sum, val) => sum + val, 0);

//   const handleEnergyChange = (type: EnergyType, delta: number) => () => {
//     const newValue = energyValues[type] + delta;
//     const maxPerType = type === 'colorless' ? 10 : maxIconsPerType;

//     if ((type === 'colorless' && (newValue < 0 || newValue > maxPerType)) ||
//         (type !== 'colorless' && (newValue < 0 || newValue > maxPerType || totalEnergyIcons + delta > maxTotalIcons))) {
//       return;
//     }

//     const newEnergyValues = { ...energyValues, [type]: newValue };
//     setEnergyValues(newEnergyValues);
//     onCostChange(newEnergyValues);
//   };

//   const renderEnergyIcon = (type: EnergyType): JSX.Element => {
//     const Icon = energyIcons[type].icon;
//     return <Icon className={energyIcons[type].tailwindClass} sx={{ height: '30px', width: '30px', padding: '3px' }} />;
//   };

//   const renderEnergyControl = (type: EnergyType): JSX.Element => {
//     return (
//       <ButtonGroup
//         key={type}
//         variant="outlined"
//         aria-label={`${type} energy control`}
//         className="flex flex-col-reverse lg:flex-row w-full justify-center items-center py-auto space-x-2"
//       >
//         <IconButton onClick={handleEnergyChange(type, -1)} className="text-gray-400">
//           <RemoveIcon />
//         </IconButton>

//         {renderEnergyIcon(type)}

//         <IconButton onClick={handleEnergyChange(type, 1)} className="text-gray-400">
//           <AddIcon />
//         </IconButton>
//       </ButtonGroup>
//     );
//   };

//   return (
//     <Box className="flex flex-row lg:flex-col lg:h-full justify-center items-center mb-4 lg:mb-0 border border-gray-500 hover:border-white rounded-md">
//       {energyTypes.map((type) => (
//         <Box key={type} className="w-full py-2 px-3">{renderEnergyControl(type)}</Box>
//       ))}
//     </Box>
//   );
// }