"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

// Types & data
import {
  cardSuperTypeOptions,
  cardTypeOptions,
  cardSubTypeOptions,
  cardSpeedOptions
} from "@/app/utils/data/cardCreatorOptions";
import { CardFormDataType } from "@/app/utils/types/types";
import { cardPartPath } from "@/app/utils/consts/cardPartPaths";

// Imported components
import {
  Box,
  FormControl,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  IconButton
} from "@mui/material/";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";

// Custom actions
import determineColorType from "@/app/lib/actions/determineColorType";
import determineColor from "@/app/lib/actions/determineColor";
import determineColorClass from "@/app/lib/actions/determineColorClass";
import determineBgImage from "@/app/lib/actions/determineBgImage";

// Custom components
import EnergyCostPopover from "@/app/components/card-creator/EnergyCostPopover";
import GradePopover from "@/app/components/card-creator/GradePopover"

export default function NexusCardForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, setValue, control, watch } =
    useFormContext<CardFormDataType>();
  const formCardData = watch();
  const activeCardType = formCardData.cardType;

  const [energyCostAnchorEl, setEnergyCostAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [gradeAnchorEl, setGradeAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [cardColorType, setCardColorType] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string | null>(null);
  const [cardColorClass, setCardColorClass] = useState<string | null>(null);
  const [cardBgImage, setCardBgImage] = useState<string | null>(null);

  // Determine color type based on cost
  useEffect(() => {
    console.log(`Determining new color type. Current color type: ${cardColorType}`)
    const colorType = determineColorType(
      formCardData.cardEnergyCost
    );
    setCardColorType(colorType);
    console.log(`Current color type: ${cardColorType}`);
  }, [formCardData.cardEnergyCost]);

  // Determine color based on cost and color type
  useEffect(() => {
    console.log(`Determining new color. Current color ${cardColor}`)
    const color = determineColor(
      formCardData.cardEnergyCost,
      cardColorType || ""
    );
    setCardColor(color);
    console.log(`Current color: ${cardColor}`);
  }, [formCardData.cardEnergyCost, cardColorType]);

  // Determine color class based on color type and color
  useEffect(() => {
    console.log(`Determining new color class. Current color class: ${cardColorClass}`)
    const colorClass = determineColorClass(
      activeCardType,
      cardColorType || "",
      cardColor || "",
    );
    setCardColorClass(colorClass);
    console.log(`Current color class: ${cardColorClass}`);
  }, [activeCardType, cardColorType, cardColor]); 

  // Determine bg image based on color type and color
  useEffect(() => {
    console.log(`Determining new bg image. Current bg image: ${cardBgImage}`)
    const bgImage = determineBgImage(
      activeCardType,
      cardColorType || "",
      cardColor || "",
    );
    setCardBgImage(bgImage);
    console.log(`Current bg image: ${cardBgImage}`);
  }, [activeCardType, cardColorType, cardColor]);

  useEffect(() => {
    if (formCardData.cardType === "node") {
      setCardColorType(null);
      setCardColor(null);
    };
  }, [formCardData.cardType])

  // Handle energy cost popover
  function handleEnergyCostPopoverOpen(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    setEnergyCostAnchorEl(event.currentTarget);
  }
  function handleEnergyCostPopoverClose() {
    setEnergyCostAnchorEl(null);
  }

  // Handle grade popover
  function handleGradePopoverOpen(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    setGradeAnchorEl(event.currentTarget);
    console.log(formCardData.cardGrade)
  }
  function handleGradePopoverClose() {
    setGradeAnchorEl(null);
    console.log(formCardData.cardGrade)
  }

  return (
    <Box
      id="card-border"
      sx={{
        aspectRatio: "2.5 / 3.5",
        maxWidth: "480px",
      }}
      className="
        flex
        flex-col
        justify-stary
        items-center
        p-5
        rounded-2xl
        bg-black
      "
    >
      {/* Card frame */}
      <Box
        id="card-frame"
        className={`
          flex
          flex-col
          w-full
          h-full
          p-2
          rounded-lg
          ${cardBgImage}
        `}
      >
        {/* Card header */}
        <Box
          id="card-header"
          sx={{
            aspectRatio: "55 / 5",
          }}
          className={`
              bg-${cardColorClass}-500 
              flex
              flex-col
              w-full
              gap-1
              py-1
              px-2
              border-2
              border-black
              rounded-md
          `}
        >
          {/* Card name and cost */}
          <Box
            id="card-header-name-cost"
            className={`
                            bg-${cardColorClass}-500 
                            flex
                            flex-row
                            justify-between
                            items-center
                            w-full
                            gap-1
                            py-1
                            px-2
                            border-2
                            border-black
                            rounded-md
                        `}
          >
            {/* Card name */}
            <Controller
              name="cardName"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  size="small"
                  placeholder="Card name"
                  className="w-3/4"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                />
              )}
            />
            {/* Card cost */}
            <IconButton
              aria-label="add cost"
              size="large"
              onClick={handleEnergyCostPopoverOpen}
            >
              <AddCircleIcon />
            </IconButton>
            <EnergyCostPopover
              anchorEl={energyCostAnchorEl}
              handleClose={handleEnergyCostPopoverClose}
            />
          </Box>
          {/* Card types and speed */}
          <Box
            id="card-header-types-speed"
            className={`
                            bg-${cardColorClass}-500 
                            flex
                            flex-row
                            justify-between
                            items-center
                            w-full
                            gap-1
                            py-1
                            px-2
                            border-2
                            border-black
                            rounded-md
                        `}
          >
            {/* Super type */}
            <Box
              id="card-header-types"
              className="
                                flex
                                flex-row
                                w-full
                        "
            >
              {["object", "entity", "effect", "node"].includes(
                formCardData.cardType,
              ) && (
                <Controller
                  name="cardSuperType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Super Type</InputLabel>
                      <Select
                        {...field}
                        label="Super type"
                        size="small"
                        className="w-full"
                      >
                        {Object.entries(cardSuperTypeOptions).map(
                          ([value, label]) => (
                            <MenuItem key={value} value={value}>
                              <Typography variant="body2">{label}</Typography>
                            </MenuItem>
                          ),
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
              )}
              {/* Type */}
              <Controller
                name="cardType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      {...field}
                      label="Type"
                      size="small"
                      className="w-full"
                    >
                      {Object.entries(cardTypeOptions).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          <Typography variant="body2">{label}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {["object", "entity", "effect"].includes(
                formCardData.cardType,
              ) && (
                <Controller
                  name="cardSubType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Sub Type</InputLabel>
                      <Select
                        multiple
                        {...field}
                        value={Array.isArray(field.value) ? field.value : []}
                        label="Sub type"
                        size="small"
                        // renderValue={(selected) => selected.join(' ')}
                      >
                        {formCardData.cardType === "entity" &&
                          Object.entries(cardSubTypeOptions.entity).map(
                            ([value, label]) => (
                              <MenuItem key={value} value={value}>
                                <Typography variant="body2">
                                  {label as string}
                                </Typography>
                              </MenuItem>
                            ),
                          )}
                        {formCardData.cardType === "object" &&
                          Object.entries(cardSubTypeOptions.object).map(
                            ([value, label]) => (
                              <MenuItem key={value} value={value}>
                                <Typography variant="body2">
                                  {label as string}
                                </Typography>
                              </MenuItem>
                            ),
                          )}
                        {formCardData.cardType === "effect" &&
                          Object.entries(cardSubTypeOptions.effect).map(
                            ([value, label]) => (
                              <MenuItem key={value} value={value}>
                                <Typography variant="body2">
                                  {label as string}
                                </Typography>
                              </MenuItem>
                            ),
                          )}
                      </Select>
                    </FormControl>
                  )}
                />
              )}
            </Box>
            {/* Select: Speed */}
            <Controller
              name="cardSpeed"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Speed</InputLabel>
                  <Select
                    multiple
                    {...field}
                    value={Array.isArray(field.value) ? field.value : []}
                    label="Speed"
                    size="small"
                  >
                    {Object.entries(cardSpeedOptions).map(([value, label]) => (
                      <MenuItem key={value} value={value}>
                        <Typography variant="body2">{label}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </Box>
        {/* Card image */}
        <Box
          id="card-image"
          sx={{ aspectRatio: "4 / 3" }}
          className="
                flex
                flex-col
                justify-center
                items-center
                w-full
                overflow-hidden
                relative
                mx-auto
                px-2
                border-2
                border-black
          "
        >
          <Image
            // Update to the art from DALL-E
            src="/images/card-parts/card-art/default-art.jpg"
            fill={true}
            sizes="100%"
            alt="Card name"
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </Box>
        {/* Card text and flavor text */}
        <Box
          id="card-text-flavor"
          sx={{ aspectRatio: "540 / 275" }}
          className="
                flex
                flex-col
                p-2
                bg-gray-600
                text-black
                border-2
                border-black
                mx-2
          "
        >
          {/* Card text */}
          <Controller
            name="cardText"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                multiline
                size="small"
                variant="standard"
                placeholder='Type "/" to insert a keyword ability.'
                rows={4}
                error={!!fieldState.error}
                // helperText={fieldState.error ? fieldState.error.message : "Card text is required!"}
                className="w-full"
              />
            )}
          />
          <Box className="bg-black h-[1px] w-full my-4" />
          {/* Card flavor text */}
          {formCardData.cardText.length <= 200 && (
            <Controller
              name="cardFlavorText"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  multiline
                  size="small"
                  variant="standard"
                  placeholder="Write some flavor text here."
                  className="w-full"
                  rows={2}
                  error={!!fieldState.error}
                  inputProps={{ maxLength: 75 }}
                  // helperText={fieldState.error ? fieldState.error.message : "Card text is required!"}
                  // InputProps={{ disableUnderline: true }} caused error
                />
              )}
            />
          )}
        </Box>
        {/* Card stats, grade, creator and copyright */}
        <Box
          id="card-stats-grade-creator-info"
          sx={{ zIndex: 1 }}
          className="
                        flex
                        flex-row
                        justify-between
                        items-center
                        w-full
                        ml-auto
                        mr-0
                        pr-2
                        -mt-8
                        px-1
                        rounded-tl-lg
                "
        >
          {/* Card attack */}
          <Box
            id="stats-attack"
            className="
                            flex
                            flex-col
                            justify-center
                            items-center
                            relative
                    "
          >
            {formCardData.cardType === "entity" && (
              <Controller
                name="cardAttack"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    variant="standard"
                    placeholder="0"
                    className="w-full"
                    error={!!fieldState.error}
                    inputProps={{ maxLength: 2 }}
                    // helperText={fieldState.error ? fieldState.error.message : "Card text is required!"}
                    // InputProps={{ disableUnderline: true }} caused error
                  />
                )}
              />
            )}
            <Image
              src={`${cardPartPath.base}/card-parts${cardPartPath.stats}/attack.png`}
              width={96}
              height={72}
              alt="Card attack icon"
              className="w-full h-full"
              // style={{ objectFit: "cover" }}
            />
          </Box>
          {/* Card grade + info */}
          <Box
            id="stats-grade-info"
            className="
                            flex
                            flex-col
                            justify-center
                            items-center
                    "
          >
            {/* Card grade */}
            <Box
              id="stats-grade"
              className="
                                flex
                                flex-col
                                justify-start
                                items-center
                                px-2
                        "
            >
              <IconButton
                aria-label="add cost"
                size="large"
                onClick={handleGradePopoverOpen}
              >
                <Image
                  src={`${cardPartPath.base}/card-parts${cardPartPath.icon}${cardPartPath.grade}/grade-${formCardData.cardGrade.toLowerCase()}.png`}
                  height={48}
                  width={48}
                  alt="Card grade icon"
                />
              </IconButton>
              <GradePopover
                anchorEl={gradeAnchorEl}
                handleClose={handleGradePopoverClose}
              />
              <Box
                className="
                                flex
                                flex-row
                                justify-between
                                items-center
                                text-white
                                text-xs
                                font-medium
                            "
              >
                <Typography variant="caption">
                  Creator:{" "}
                  {formCardData.cardCreator
                    ? formCardData.cardCreator
                    : "Card Creator"}
                </Typography>
                <Typography variant="caption">
                  Copyright Nexus {new Date().getFullYear()} ©
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Card defense */}
          <Box
            id="stats-defense"
            className="
                            flex
                            flex-col
                            justify-center
                            items-center
                            relative
                    "
          >
            {formCardData.cardType === "entity" && (
              <Controller
                name="cardDefense"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    variant="standard"
                    placeholder="0"
                    className="w-full"
                    error={!!fieldState.error}
                    inputProps={{ maxLength: 2, disableUnderline: true }}
                    helperText={
                      fieldState.error
                        ? fieldState.error.message
                        : "Card text is required!"
                    }
                    // InputProps={{ disableUnderline: true }}
                  />
                )}
              />
            )}
            <Image
              src={`${cardPartPath.base}/card-parts${cardPartPath.stats}/defense.png`}
              width={96}
              height={72}
              alt="Card defense icon"
              className="w-full h-full"
              // style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
