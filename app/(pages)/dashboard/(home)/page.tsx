"use client";

import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, FormControl, FormControlLabel, InputLabel, Select, SelectChangeEvent, MenuItem, Divider, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import NexusCard from '../../../components/NexusCard';
import * as htmlToImage from 'html-to-image';

// Replace with React Hook form
const formPlaceholderData = {
  username: "Nexus_Nils",
}

const energyIcons = {
  yellow: { imagePath: '/images/icons-energy/energy-yellow.png', value: "Y" },
  blue: { imagePath: '/images/icons-energy/energy-blue.png', value: "B" },
  purple: { imagePath: '/images/icons-energy/energy-purple.png', value: "P" },
  red: { imagePath: '/images/icons-energy/energy-red.png', value: "YR" },
  green: { imagePath: '/images/icons-energy/energy-green.png', value: "G" },
  zero: { imagePath: '/images/icons-energy/energy-zero.png', value: "0" },
  one: { imagePath: '/images/icons-energy/energy-one.png', value: "1" },
  two: { imagePath: '/images/icons-energy/energy-two.png', value: "2" },
  three: { imagePath: '/images/icons-energy/energy-three.png', value: "3" },
  four: { imagePath: '/images/icons-energy/energy-four.png', value: "4" },
  five: { imagePath: '/images/icons-energy/energy-five.png', value: "5" },
  six: { imagePath: '/images/icons-energy/energy-six.png', value: "6" },
  seven: { imagePath: '/images/icons-energy/energy-seven.png', value: "7" },
  x: { imagePath: '/images/icons-energy/energy-x.png', value: "X" },
};

type EnergyIconKey = keyof typeof energyIcons;
const iconKeys: EnergyIconKey[] = Object.keys(energyIcons) as EnergyIconKey[];

// Type for form data

// Zod schema for form data

// OpenAI API call
// Form update on API call

export default function Home() {
  // React Hook form state
  const [name, setName] = React.useState("");
  // const [cost, setCost] = React.useState("");
  const [cost, setCost] = useState<EnergyIconKey[]>([]);
  const [typeSuper, setTypeSuper] = React.useState("");
  const [type, setType] = React.useState("");
  const [typeSub, setTypeSub] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [text, setText] = React.useState("");
  const [flavor, setFlavor] = React.useState("");
  const [attack, setAttack] = React.useState("");
  const [defense, setDefense] = React.useState("");

  const [switchAiAutocomplete, setSwitchAiAutocomplete] = useState(true);

  const label = { inputProps: { 'aria-label': 'AI switch' } };

  function handleNameChange(event: any) {
    setName(event.target.value);
  }

  // function handleCostChange(event: any) {
  //   setCost(event.target.value);
  // }

  const handleCostChange = (event: SelectChangeEvent<EnergyIconKey[]>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === 'string') {
      setCost(value.split(',') as EnergyIconKey[]);
    } else {
      setCost(value as EnergyIconKey[]);
    }
  };

  function handleTypeSuperChange(event: any) {
    setTypeSuper(event.target.value);
  }

  function handleTypeChange(event: any) {
    setType(event.target.value);
  }

  function handleTypeSubChange(event: any) {
    setTypeSub(event.target.value);
  }

  function handleGradeChange(event: any) {
    setGrade(event.target.value);
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

  function downloadCardAsPng() {
    const node = document.getElementById('nexus-card-render');
  
    if (node) {
    htmlToImage.toPng(node as HTMLElement)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${name}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    }
  }

  return (
    <Box
      sx={{ width: "100%", maxWidth: "1200px" }}
      className="flex flex-col w-full space-y-6 "
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "36px" }}
        className="text-md font-medium text-gray-500"
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
                {formPlaceholderData.username}
              </Typography>
            </Box>)}
          </Box>
          <Box className="flex flex-row w-full items-end space-x-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={handleNameChange}
              className="w-full"
            />
            {/* <TextField
              id="outlined-basic"
              label="Cost"
              variant="outlined"
              onChange={handleCostChange}
              className="w-1/3"
            /> */}
            <Select
              multiple
              value={cost}
              onChange={handleCostChange}
              // renderValue={(selected: EnergyIconKey[]) => (
              //   <div style={{ display: 'flex', gap: '5px' }}>
              //     {selected.map((value) => (
              //       <img key={value} src={energyIcons[value].imagePath} alt={value} style={{ width: 24 }} />
              //     ))}
              //   </div>
              // )}
              renderValue={(selected: EnergyIconKey[]) => {
                // Log the selected values
                console.log('Selected values:', selected);
              
                return (
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {selected.map((value) => {
                      // Log the current value
                      console.log('Current value:', value);
              
                      return (
                        <img key={value} src={energyIcons[value].imagePath} alt={value} style={{ width: 24 }} />
                      );
                    })}
                  </div>
                );
              }}
              className="flex w-1/3"
            >
              {Object.keys(energyIcons).map((key) => (
                <MenuItem key={key} value={energyIcons[key as EnergyIconKey].value}>
                  <img src={energyIcons[key as EnergyIconKey].imagePath} alt={key} style={{ width: 24, height: 24 }} />
                </MenuItem>
              ))}
              {/* {iconKeys.map((key) => (
                <MenuItem key={key} value={energyIcons[key].value}>
                  <Checkbox checked={cost.includes(energyIcons[key].value as EnergyIconKey)} />
                  <ListItemIcon>
                    <img src={energyIcons[key].imagePath} alt={key} style={{ width: 24 }} />
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </MenuItem>
              ))} */}
            </Select>
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
                >
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
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  label="Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="Entity">Entity</MenuItem>
                  <MenuItem value="Interrupt">Interrupt</MenuItem>
                  <MenuItem value="Sequence">Sequence</MenuItem>
                  <MenuItem value="Enhancement">Enhancement</MenuItem>
                  <MenuItem value="Machine">Machine</MenuItem>
                  <MenuItem value="Source">Source</MenuItem>
                </Select>
              </FormControl>
              {/* Make Sub multi select and searchable */}
              {(
                type === "Entity" ||
                type === "Machine" ||
                type === "Enhancement" ||
                type === "Source"
              ) && (<FormControl fullWidth className="w-full">
                <InputLabel id="type-sub-select-label">Sub type</InputLabel>
                <Select
                  labelId="type-sub-select-label"
                  id="type-sub-select"
                  value={typeSub}
                  label="Sub type"
                  onChange={handleTypeSubChange}
                >
                  <MenuItem value="Dragon">Dragon</MenuItem>
                  <MenuItem value="Elf">Elf</MenuItem>
                  <MenuItem value="Goblin">Goblin</MenuItem>
                  <MenuItem value="Zombie">Zombie</MenuItem>
                  <MenuItem value="Crab">Crab</MenuItem>
                </Select>
              </FormControl>)}
            </Box>
            <Box className="flex w-1/3 items-end space-x-2">
              <FormControl fullWidth>
                <InputLabel id="grade-select-label">Grade</InputLabel>
                <Select
                  labelId="grade-select-label"
                  id="grade-select"
                  value={grade}
                  label="Grade"
                  onChange={handleGradeChange}
                >
                  <MenuItem value="Prime" className="!text-rose-500">Prime</MenuItem>
                  <MenuItem value="Rare" className="!text-amber-500">Rare</MenuItem>
                  <MenuItem value="Uncommon" className="!text-sky-500">Uncommon</MenuItem>
                  <MenuItem value="Common" className="!text-gray-500">Common</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <TextField
            fullWidth
            multiline
            id="outlined-basic"
            label="Text"
            variant="outlined"
            rows={8}
            onChange={handleTextChange}
          />
          <Box className="flex flex-row w-full items-end space-x-4">
            <TextField
              fullWidth
              multiline
              id="outlined-basic"
              label="Flavor"
              value={flavor}
              variant="outlined"
              onChange={handleFlavorChange}
            />
            {type === "Entity" && (<Box className="flex w-1/2 items-end space-x-2">
              <FormControl fullWidth>
                  <InputLabel id="attack-select-label">Attack</InputLabel>
                  <Select
                    labelId="attack-select-label"
                    id="attack-select"
                    value={attack}
                    label="Attack"
                    onChange={handleAttackChange}
                  >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="defense-select-label">Defense</InputLabel>
                  <Select
                    labelId="defense-select-label"
                    id="defense-select"
                    value={defense}
                    label="Defense"
                    onChange={handleDefenseChange}
                  >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
            </Box>)}
          </Box>
          {switchAiAutocomplete && (
          <Divider
            light
            className="px-24 py-2"
          >
            <Typography
              variant="overline"
              className="text-md font-medium text-gray-200"
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
        <Box className="flex flex-col h-full justify-between space-y-6">
          <Box className="flex flex-col w-full space-y-4">
            {/* Image render */}
            <NexusCard
              cardCreator={formPlaceholderData.username}
              cardName={name}
              cardCost={cost.join(',')}
              cardType={type}
              cardSuperType={typeSuper}
              cardSubType={typeSub}
              cardGrade={grade}
              cardText={text}
              cardFlavor={flavor}
              cardAttack={attack}
              cardDefense={defense}
            />
            {/* <Image
              src="/images/cards/crystalclaw-clowder.png"
              width={320} height={448}
              alt="Crystalclaw Clowder"
              style={{ maxWidth: "620px" }}
              className="responsive rounded-xl shadow-lg"
            /> */}
            {/* <Box className="flex flex-row w-full justify-between">
              <Image src="/images/cards/crystalclaw-clowder.png" width={100} height={140} alt="Crystalclaw Clowder" style={{ maxWidth: "194" }} className="responsive rounded-sm shadow-sm" />
              <Image src="/images/cards/crystalclaw-clowder.png" width={100} height={140} alt="Crystalclaw Clowder" style={{ maxWidth: "194" }} className="responsive rounded-sm shadow-sm" />
              <Image src="/images/cards/crystalclaw-clowder.png" width={100} height={140} alt="Crystalclaw Clowder" style={{ maxWidth: "194" }} className="responsive rounded-sm shadow-sm" />
            </Box> */}
          </Box>
          <Box className="flex flex-col w-100 space-y-4">
            {name && (<Button
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<DownloadIcon />}
              className="w-full !rounded-full text-center"
              onClick={downloadCardAsPng}
            >
              Download {name && name.length <= 14 && name.length >= 3 ? name : "card"}
            </Button>)}
            <Button
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<SaveIcon />}
              className="w-full !rounded-full text-center"
            >
              Save {name && name.length <= 14 && name.length >= 3 ? name : "card"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  ) 
}