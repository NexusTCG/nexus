"use client";

import * as React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  Switch,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Save as SaveIcon,
  Download as DownloadIcon,
  AutoFixHigh as AutoFixHighIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';
import NexusCard from '../../../components/NexusCard';
import * as htmlToImage from 'html-to-image';
import clsx from 'clsx';

// TYPES
import { EnergyIconKey, GradeIconKey } from '../../../types/types';

// CONSTANTS
import { energyIcons, gradeIcons } from '../../../constants/iconData';
import { cardTypes } from "../../../constants/cardTypes";
import { entityTypes } from "../../../constants/entityTypes";
//Replace placeholder data
import { placeholderData } from '../../../constants/placeholderData';

// UTILS
import { renderEnergyIconSelection, renderGradeIconSelection } from '../../../utils/iconUtils'; 
import { downloadCardAsPng } from '../../../utils/imageUtils';

// Type for form data

// Zod schema for form data

// OpenAI API call
// Form update on API call

export default function Home() {
  // React Hook form state
  const [name, setName] = React.useState("");
  const [cost, setCost] = useState<EnergyIconKey[]>([]);
  const [typeSuper, setTypeSuper] = React.useState("");
  const [type, setType] = React.useState("");
  const [typeSub, setTypeSub] = React.useState<string[]>([]);
  const [grade, setGrade] = useState<GradeIconKey>("common");
  const [text, setText] = React.useState("");
  const [flavor, setFlavor] = React.useState("");
  const [attack, setAttack] = React.useState("");
  const [defense, setDefense] = React.useState("");
  const [switchAiAutocomplete, setSwitchAiAutocomplete] = useState(true);

  function handleNameChange(event: any) {
    setName(event.target.value);
  }

  const handleCostChange = (event: SelectChangeEvent<EnergyIconKey[]>) => {
    const {
      target: { value },
    } = event;
  
    // Convert the value to an array if it's a string
    let selectedCost = typeof value === 'string' ? value.split(',') as EnergyIconKey[] : value;
  
    // Separate colored and colorless selections
    let newColoredSelection = selectedCost.filter(icon => energyIcons[icon].value.includes('energy') && !energyIcons[icon].value.includes('Colorless'));
    let colorlessSelection = selectedCost.find(icon => energyIcons[icon].value.includes('Colorless'));
  
    // If there's a colorless selection, keep only that one in the array
    let newCost = colorlessSelection ? [colorlessSelection] : [];
    newCost = [...newCost, ...newColoredSelection];
  
    setCost(newCost);
  };
  
  function handleTypeSuperChange(event: any) {
    setTypeSuper(event.target.value);
  }

  function handleTypeChange(event: any) {
    setType(event.target.value);
  }

  function handleTypeSubChange(event: SelectChangeEvent<typeof entityTypes[number]['name'][]>) {
    const value = event.target.value;
    setTypeSub(typeof value === 'string' ? value.split(',') : value);
  }

  function handleGradeChange(event: SelectChangeEvent<GradeIconKey>) {
    setGrade(event.target.value as GradeIconKey);
  }

  function handleTextChange(event: any) {
    setText(event.target.value);
  }

  function handleFlavorChange(event: any) {
    setFlavor(event.target.value);
  }

  function handleAttackChange(event: any) {
    setAttack(event.target.value);
  }

  function handleDefenseChange(event: any) {
    setDefense(event.target.value);
  }

  const handleSwitchAiAutocomplete = (event: any) => {
    setSwitchAiAutocomplete(event.target.checked);
  };

  renderEnergyIconSelection([]);
  renderGradeIconSelection([])

  return (
    <Box
      className="flex flex-col w-full space-y-6 "
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "36px" }}
        className="text-md font-medium text-gray-50"
      >
        Create card
      </Typography>
      <Box className="
        flex
        flex-row
        w-full
        p-6
        space-x-8
        rounded-xl
        bg-gray-800
        border
        border-gray-700
        shadow-xl"
      >
        <Box className="flex flex-col w-full space-y-4">
          <Box className="flex flex-col w-full justify-start">
            <Box className="flex flex-col w-full">
              <Typography
                variant="h2"
                sx={{ fontSize: "24px" }}
                className="!m-0 !pb-0 font-medium text-gray-50 whitespace-nowrap"
              >
                {name}
              </Typography>
            </Box>
            {name && (<Box className="flex flex-row w-full space-x-1">
              <Typography
                variant="overline"
                sx={{ fontSize: "12px", marginTop: 0, paddingTop: 0 }}
                className="font-regular text-gray-400"
              >
                by
              </Typography>
              <Typography
                variant="overline"
                sx={{ fontSize: "12px", marginTop: 0, paddingTop: 0 }}
                className="font-medium text-gray-200"
              >
                {placeholderData.username}
              </Typography>
            </Box>)}
          </Box>
          <Box className="flex flex-row w-full items-end space-x-4">
            <Box className="flex w-full">
              <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  onChange={handleNameChange}
                  sx={{ maxHeight: "56px"}}
                />
            </Box>
            <Box className="flex w-1/3">
              <FormControl className="w-full">
                <InputLabel id="cost-select-label">Cost</InputLabel>
                <Select
                  multiple
                  id="cost-select"
                  value={cost}
                  onChange={handleCostChange}
                  renderValue={renderEnergyIconSelection}
                  sx={{ maxHeight: "56px"}}
                >
                  {Object.keys(energyIcons).map((key) => (
                    <MenuItem key={key} value={key}>
                      <ListItemIcon>
                        {renderEnergyIconSelection([key as EnergyIconKey])}
                      </ListItemIcon>
                      <ListItemText primary={energyIcons[key as EnergyIconKey].value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="flex flex-row w-full items-end space-x-4">
            <Box className="flex flex-row w-full items-end space-x-2">
              {(
                type === "Entity" ||
                type === "Machine" ||
                type === "Enhancement" ||
                type === "Source"
              ) && (<FormControl className="w-1/2">
                <InputLabel id="type-super-select-label">Super type</InputLabel>
                <Select
                  labelId="type-super-select-label"
                  id="type-super-select"
                  value={typeSuper}
                  label="Super type"
                  onChange={handleTypeSuperChange}
                  sx={{ maxHeight: "56px"}}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Mythic">Mythic</MenuItem>
                  <MenuItem value="Base">Base</MenuItem>
                </Select>
              </FormControl>)}
              <FormControl className={`w-${(
                type === "Entity" ||
                type === "Machine" ||
                type === "Enhancement" ||
                type === "Source"
              ) ? "1/2" : "full"}`}>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  required
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  label="Type"
                  onChange={handleTypeChange}
                  sx={{ maxHeight: "56px"}}
                  renderValue={(selected) => {
                    const selectedType = cardTypes.find((cardType) => cardType.name === selected);
                    return selectedType ? selectedType.name : '';
                  }}
                >
                  {cardTypes.map((cardType) => (
                    <MenuItem
                      key={cardType.id}
                      value={cardType.name}
                    >
                      <ListItemIcon>
                        <cardType.icon />
                      </ListItemIcon>
                      <ListItemText>
                        {cardType.name}
                      </ListItemText>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {(
                type === "Entity" ||
                type === "Machine" ||
                type === "Enhancement" ||
                type === "Source"
              ) && (<FormControl fullWidth className="w-full">
                <InputLabel id="type-sub-select-label">Sub type</InputLabel>
                <Select
                  multiple
                  labelId="type-sub-select-label"
                  id="type-sub-select"
                  value={typeSub}
                  label="Sub type"
                  onChange={handleTypeSubChange}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 360,
                      },
                    },
                  }}
                >
                  {entityTypes.map((entityType) => (
                    <MenuItem key={entityType.id} value={entityType.name}>
                      <ListItemText primary={entityType.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>)}
            </Box>
            <Box className="flex w-1/3 items-end space-x-2">
              <FormControl fullWidth>
                <InputLabel id="grade-select-label">Grade</InputLabel>
                <Select
                  id="grade-select"
                  value={grade}
                  onChange={handleGradeChange}
                  sx={{ maxHeight: "56px"}}
                  renderValue={(value) => renderGradeIconSelection(value as GradeIconKey)}
                >
                  {Object.keys(gradeIcons).map((key) => (
                    <MenuItem key={key} value={key}>
                      <ListItemIcon>
                        {renderGradeIconSelection([key as GradeIconKey])}
                      </ListItemIcon>
                      <ListItemText primary={gradeIcons[key as GradeIconKey].value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <TextField
            required
            fullWidth
            multiline
            id="outlined-basic"
            label="Text"
            variant="outlined"
            rows={6}
            onChange={handleTextChange}
          />
          <Box className="flex flex-col md:flex-row w-full items-end space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Box className={clsx("flex w-full",
              {
                "lg:w-2/3": type === "Entity"
              }
            )}>
              <TextField
                fullWidth
                multiline
                id="outlined-basic"
                label="Flavor"
                value={flavor}
                variant="outlined"
                sx={{ maxHeight: "56px"}}
                onChange={handleFlavorChange}
              />
            </Box>
            {type === "Entity" && (<Box className={clsx("flex flex-row w-full items-end space-x-2",
              {
                "lg:w-1/3": type === "Entity"
              }
            )}>
              <FormControl fullWidth>
                  <InputLabel id="attack-select-label">Attack</InputLabel>
                  <Select
                    labelId="attack-select-label"
                    id="attack-select"
                    value={attack}
                    label="Attack"
                    sx={{ maxHeight: "56px"}}
                    onChange={handleAttackChange}
                  >
                    <MenuItem value="X">X</MenuItem>
                    {[...Array(17)].map((_, index) => {
                      const i = index + 0;
                      return (
                        <MenuItem key={i} value={i.toString()}>
                          {i}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="defense-select-label">Defense</InputLabel>
                  <Select
                    labelId="defense-select-label"
                    id="defense-select"
                    value={defense}
                    label="Defense"
                    sx={{ maxHeight: "56px"}}
                    onChange={handleDefenseChange}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 360,
                        },
                      },
                    }}
                  >
                    <MenuItem value="X">X</MenuItem>
                    {[...Array(17)].map((_, index) => {
                      const i = index + 0;
                      return (
                        <MenuItem key={i} value={i.toString()}>
                          {i}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
            </Box>)}
          </Box>
          {switchAiAutocomplete && (
          <Divider
            light
            className="px-24 py-6"
          >
            <Typography
              variant="overline"
              className="text-md font-medium text-gray-400"
            >
              or
            </Typography>
          </Divider>)}
          <Box className="flex flex-col w-full space-y-4">
            {switchAiAutocomplete && (<Box className="flex flex-col w-full space-y-4">
              <Typography
                variant="body2"
                className="text-md font-medium text-gray-200"
              >
                Let AI create or finish your card. You can still edit it.
              </Typography>
              <TextField
                fullWidth
                multiline
                id="text-field-prompt"
                label="Prompt"
                variant="outlined"
                rows={2}
              />
            </Box>)}
            <Box className="flex flex-row justify-between items-center w-full space-x-4">
              <Box className="flex flex-col justify-start w-1/3">
                <FormControl fullWidth component="fieldset">
                  <FormControlLabel
                    control={<Switch defaultChecked size="medium" />}
                    defaultChecked={switchAiAutocomplete}
                    onChange={handleSwitchAiAutocomplete}
                    label="AI Autocomplete"
                  />
                </FormControl>
              </Box>
              {switchAiAutocomplete && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  endIcon={<AutoFixHighIcon />}
                  className="w-full !rounded-full text-center"
                >
                  AI Autocomplete
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        {/* CARD RENDER */}
        <Box className="flex flex-col justify-between space-y-6">
          <Box className="flex flex-col w-full space-y-4">
            <NexusCard
              cardCreator={placeholderData.username}
              cardName={name}
              cardCost={cost.map(key => energyIcons[key]).filter(Boolean)}
              cardType={type}
              cardSuperType={typeSuper}
              cardSubType={typeSub}
              cardGrade={grade ? gradeIcons[grade] : null}
              cardText={text}
              cardFlavor={flavor}
              cardAttack={attack}
              cardDefense={defense}
            />
          </Box>
          <Box className="flex flex-col w-full space-y-4">
            {name && (<Button
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<DownloadIcon />}
              className="w-full !rounded-full text-center"
              onClick={() => downloadCardAsPng('nexus-card-render', name)}
            >
              Download card
            </Button>)}
            <Button
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<SaveIcon />}
              className="w-full !rounded-full text-center"
            >
              Save card
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  ) 
}