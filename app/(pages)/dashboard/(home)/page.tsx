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
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Save as SaveIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import NexusCard from '@/app/components/NexusCard';
import CostControl from '@/app/components/CostControl';
import clsx from 'clsx';

// TYPES
import { EnergyIconKey, GradeIconKey } from '@/app/types/types';

// CONSTANTS
import { energyIcons, gradeIcons } from '@/app/constants/iconData';
import { cardTypes } from "@/app/constants/cardTypes";
import { entityTypes } from "@/app/constants/entityTypes";
//Replace placeholder data
import { placeholderData } from '@/app/constants/placeholderData';

// UTILS
import { renderEnergyIconSelection, renderGradeIconSelection } from '@/app/utils/iconUtils'; 
import { downloadCardAsPng } from '@/app/utils/imageUtils';
import * as htmlToImage from 'html-to-image';

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
  const [aiAutoComplete, setAiAutoComplete] = useState(true);

  function handleNameChange(event: any) {
    setName(event.target.value);
  }

  // const handleCostChange = (event: SelectChangeEvent<EnergyIconKey[]>) => {
  //   const {
  //     target: { value },
  //   } = event;
  
  //   let selectedCost = typeof value === 'string' ? value.split(',') as EnergyIconKey[] : value;
  
  //   let newColoredSelection = selectedCost.filter(icon => energyIcons[icon].value.includes('energy') && !energyIcons[icon].value.includes('Colorless'));
  //   let newColorlessSelection = selectedCost.filter(icon => energyIcons[icon].value.includes('Colorless'));
  
  //   if (newColorlessSelection.length > 1) {
  //     newColorlessSelection = [newColorlessSelection.pop() as EnergyIconKey];
  //   }
  
  //   let newCost = [...newColoredSelection, ...newColorlessSelection];
  
  //   setCost(newCost);
  // };
  
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

  const handleAiAutoCompleteChange = (event: any) => {
    setAiAutoComplete(event.target.checked);
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
        className="text-md font-medium text-gray-50 px-6 md:px-0"
      >
        Create a Nexus card
      </Typography>
      <Box className="
        flex
        flex-col
        w-full
        p-6
        space-y-8
        md:rounded-xl
        bg-gray-800
        border
        border-gray-700
        shadow-xl"
      >
        {/* FORM & CARD RENDER */}
        <Box className="
          flex
          flex-col
          lg:flex-row
          w-full
          space-x-0
          lg:space-x-12
          space-y-6
          lg:space-y-0"
        >

          {/* FORM */}
          <Box className="flex flex-col w-full">
          
            {/* FORM HEADER */}
            <Box className="flex flex-col w-full justify-start mb-4 lg:mb-0">
              <Box className="flex flex-col w-full">
                <Typography
                  variant="h2"
                  sx={{ fontSize: "24px" }}
                  className="!m-0 !pb-0 font-medium text-gray-50 whitespace-nowrap"
                >
                  {name ? name : "Card name"}
                </Typography>
              </Box>
              <Box className="flex flex-row w-full space-x-1">
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
                  {placeholderData.username ? placeholderData.username : "You"}
                </Typography>
              </Box>
            </Box>

              {/* FORM */}
              <Box className="
                flex
                flex-col
                lg:flex-row
                w-full
                space-x-0
                lg:space-x-4
                space-y-4
                lg:space-y-0"
              >

                {/* NAME & TYPES */}
                <Box className="
                  flex
                  flex-col
                  w-full
                  lg:w-5/6
                  space-between
                  space-y-4"
                >

                  {/* NAME */}
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

                  {/* TYPES */}
                  <Box className="
                    flex
                    flex-col
                    lg:flex-row
                    w-full
                    items-end
                    space-x-0
                    md:space-x-2
                    space-y-4
                    lg:space-y-0"
                  >
                    {(
                      type === "Entity" ||
                      type === "Machine" ||
                      type === "Enhancement" ||
                      type === "Source"
                    ) && (<FormControl className="w-full lg:w-1/2">
                      <InputLabel id="type-super-select-label">
                        Super type
                      </InputLabel>
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

                    <FormControl className={`w-full lg:w-${(
                      type === "Entity" ||
                      type === "Machine" ||
                      type === "Enhancement" ||
                      type === "Source"
                    ) ? "1/2" : "full"}`}>
                      <InputLabel id="type-select-label">
                        Type
                      </InputLabel>
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
                    ) && (<FormControl className="w-full">
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

                  {/* TEXT */}
                  <TextField
                    required
                    fullWidth
                    multiline
                    id="outlined-basic"
                    label="Text"
                    variant="outlined"
                    rows={7}
                    onChange={handleTextChange}
                  />
                    
                  {/* FLAVOR & ATTACK / DEFENSE */}
                  <Box className="
                    flex
                    flex-col
                    lg:flex-row
                    w-full
                    space-x-0
                    lg:space-x-4
                    space-y-4
                    lg:space-y-0"
                  >
                    <TextField
                      fullWidth
                      multiline
                      id="outlined-basic"
                      label="Flavor"
                      value={flavor}
                      variant="outlined"
                      sx={{ maxHeight: "56px"}}
                      onChange={handleFlavorChange}
                      className="w-full"
                    />

                    {/* ATTACK / DEFENSE */}
                    {type === "Entity" && (<Box className={clsx("flex flex-row w-full space-x-2",
                      {
                        "lg:w-1/2": type === "Entity"
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
                </Box>

                {/* COST & GRADE */}
                <Box className="
                  flex
                  flex-col
                  w-full
                  lg:w-1/6
                  space-y-0
                  lg:space-y-4"
                >
                  {/* COST */}
                  <CostControl />

                  {/* GRADE */}
                  <FormControl className="w-full">
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
              {/* END OF FORM */}

          </Box>

          {/* CARD RENDER */}
          <Box className="
            flex
            flex-col
            items-center
            w-full
            lg:w-1/3
            py-4
            lg:py-0"
          >
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

        </Box>
        {/* END OF  */}

        {/* SUBMIT */}
        <Box className="
          flex
          flex-col
          md:flex-row
          w-full
          space-x-0
          md:space-x-12
          space-y-4
          md:space-y-0"
        >

          {/* AI PROMPT */}
          <Box className="flex flex-col w-full justify-end md:w-3/4 space-y-4">
            <TextField
              fullWidth
              multiline
              id="text-field-prompt"
              label="AI Prompt"
              variant="outlined"
              placeholder="Let AI help you come up with a your card!"
              rows={2}
            />
          </Box>

          {!name && (<Box className="w-full md:w-1/4"></Box>)}
          {name && (<Box className="
            flex
            flex-col
            w-full
            md:w-1/4
            space-x-4
            md:space-x-0
            space-y-0
            md:space-y-2"
          >

            {/* AI SWITCH & SUBMIT */}
            <Box className="flex flex-col w-full">
              <FormControl fullWidth component="fieldset">
                <FormControlLabel
                  control={<Switch defaultChecked size="medium" />}
                  defaultChecked={aiAutoComplete}
                  onChange={handleAiAutoCompleteChange}
                  label="AI Autocomplete"
                />
              </FormControl>
            </Box>

            {/* SAVE & DOWNLOAD */}
            <Box className="flex flex-col w-full space-y-4">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                endIcon={<DownloadIcon />}
                className="w-full !rounded-full text-center"
                onClick={() => downloadCardAsPng('nexus-card-render', name)}
              >
                Download card
              </Button>
              {/* Hiding Save button until DB implementation */}
              {/* <Button
                variant="outlined"
                color="primary"
                size="large"
                endIcon={<SaveIcon />}
                className="w-full !rounded-full text-center"
              >
                Save card
              </Button> */}
            </Box>

          </Box>)}
        </Box>
      </Box>
  </Box>
  ) 
};