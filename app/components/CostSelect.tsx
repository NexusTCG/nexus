import React, { useState } from 'react';
import { Select, MenuItem, Chip, OutlinedInput, Theme, SelectChangeEvent, SvgIconProps } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import theme from '../styles/theme';

type RenderEnergyIconType = (energyKey: string) => React.ReactElement<SvgIconProps> | undefined;

// Define the type for the energy icon and value
type EnergyType = {
  key: string;
  value: string;
  imagePath: string;
};

// Define the type for the props of your custom select component
interface EnergySelectProps {
    control: Control;
    energyTypes: EnergyType[];
    renderEnergyIcon: RenderEnergyIconType;
}

// Define the type for the styles function
const getStyles = (name: string, personName: string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

// Custom component to display selected options with icons
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const renderEnergyIcon: RenderEnergyIconType = (energyKey: string) => {
    // Assume we have a map of energy keys to icon components
    const EnergyIconMap: Record<string, React.ReactElement<SvgIconProps> | undefined> = {
      // ...your icon map
    };
  
    return EnergyIconMap[energyKey] || undefined;
  };

// Custom rendering for the selected options
function renderSelectedOptions(
    selected: string[],
    renderEnergyIcon: RenderEnergyIconType
  ) {
    return selected.map((value) => {
      const iconElement = renderEnergyIcon(value);
      return (
        <Chip
          key={value}
          icon={iconElement ? React.cloneElement(iconElement) : undefined}
          label={value}
        />
      );
    });
  }

const EnergySelect: React.FC<EnergySelectProps> = ({ control, energyTypes, renderEnergyIcon }) => {
  const [selectedEnergy, setSelectedEnergy] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedEnergy>) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === 'string' ? value.split(',') : value;

    // Logic to ensure only one colorless energy is selected
    const colorlessEnergy = selected.filter(val => val.includes('Colorless'));
    if (colorlessEnergy.length > 1) {
      // Keep the last selected colorless energy and remove the others
      const lastColorless = colorlessEnergy[colorlessEnergy.length - 1];
      setSelectedEnergy(selected.filter(val => val === lastColorless || !val.includes('Colorless')));
    } else {
      setSelectedEnergy(selected);
    }
  };

  return (
    <Controller
      name="energy"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          multiple
          value={selectedEnergy}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => renderSelectedOptions(selected, renderEnergyIcon)}
          MenuProps={MenuProps}
        >
          {energyTypes.map((energy) => (
            <MenuItem
              key={energy.key}
              value={energy.key}
              style={getStyles(energy.key, selectedEnergy, theme)}
            >
              {renderEnergyIcon(energy.key)}
              {energy.value}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default EnergySelect;