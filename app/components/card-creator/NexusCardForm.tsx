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
import clsx from "clsx";

// Custom actions
import determineColorType from "@/app/lib/actions/determineColorType";
import determineColor from "@/app/lib/actions/determineColor";
import determineColorClass from "@/app/lib/actions/determineColorClass";
import determineBgImage from "@/app/lib/actions/determineBgImage";
import resetEnergyCost from "@/app/lib/actions/resetEnergyCost";

// Custom components
import EnergyCostPopover from "@/app/components/card-creator/EnergyCostPopover";
import GradePopover from "@/app/components/card-creator/GradePopover"

export default function NexusCardForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, setValue, control, watch } =
    useFormContext<CardFormDataType>();
  const formCardData = watch();
  const activeCardCost = watch("cardEnergyCost");
  const activeCardType = watch("cardType");

  const [energyCostAnchorEl, setEnergyCostAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [gradeAnchorEl, setGradeAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [cardColorType, setCardColorType] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string | null>(null);
  const [cardColorClass50, setCardColorClass50] = useState<string>("");
  const [cardColorClass100, setCardColorClass100] = useState<string>("");
  const [cardColorClass400, setCardColorClass400] = useState<string>("");
  const [cardBgImage, setCardBgImage] = useState<string | null>(null);

  // Determine color type based on cost
  useEffect(() => {
    const colorType = determineColorType(
      activeCardCost,
      activeCardType
    );
    console.log(`Current color type: ${cardColorType}`);
    setCardColorType(colorType);
  }, [activeCardCost, activeCardType]);

  // Determine color based on cost and color type
  useEffect(() => {
    const color = determineColor(
      activeCardCost,
      cardColorType || ""
    );
    console.log(`Current color: ${cardColor}`);
    setCardColor(color);
  }, [activeCardCost, cardColorType]);

  // Determine color class based on color type and color
  useEffect(() => {
    const colorClass = determineColorClass(
      activeCardType,
      cardColorType || "",
      cardColor || "",
    );
    console.log(`
      Current color classes:
      ${cardColorClass50},
      ${cardColorClass100},
      ${cardColorClass400}
    `);
    setCardColorClass50(`bg-${colorClass}-50`);
    setCardColorClass100(`bg-${colorClass}-100`);
    setCardColorClass400(`bg-${colorClass}-400`);
  }, [activeCardType, cardColorType, cardColor]); 

  // Determine bg image based on color type and color
  useEffect(() => {
    const bgImage = determineBgImage(
      activeCardType,
      cardColorType || "",
      cardColor || "",
    );
    console.log(`Current bg image: ${cardBgImage}`);
    setCardBgImage(bgImage);
  }, [activeCardType, cardColorType, cardColor]);

  // Handle energy cost popover
  function handleEnergyCostPopoverOpen(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    setEnergyCostAnchorEl(event.currentTarget);
  };
  function handleEnergyCostPopoverClose() {
    setEnergyCostAnchorEl(null);
  };

  // Handle grade popover
  function handleGradePopoverOpen(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    setGradeAnchorEl(event.currentTarget);
    console.log(formCardData.cardGrade)
  };
  function handleGradePopoverClose() {
    setGradeAnchorEl(null);
    console.log(formCardData.cardGrade)
  };

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
        justify-start
        items-center
        rounded-2xl
        bg-black
        px-4
        pt-3        
        pb-8        
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
          rounded-lg
          bg-lime-300
          ${cardBgImage}
        `}
      >
        {/* Card header */}
        <Box
          id="card-header"
          // sx={{
          //   aspectRatio: "55 / 5",
          // }}
          className={`
                ${cardColorClass50}
              flex
              flex-col
              w-full
              gap-1
              py-1
              px-2
              border-4
              border-black
              rounded-lg
              shadow-lg
              shadow-black
              shadow-opacity-25
              z-10
          `}
        >
          {/* Card name and cost */}
          <Box
            id="card-header-name-cost"
            className={`
                flex
                flex-row
                justify-between
                items-center
                w-full
                gap-2
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
                  placeholder={
                    !fieldState.error ? "Card name":
                    "Card name is required!"
                  }
                  error={!!fieldState.error}
                  className={clsx("w-full text-white",
                    {
                      "!text-black": !fieldState.error,
                      "!text-red-500": fieldState.error,
                    }
                  )}
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
            // 
            className={`
              ${cardColorClass100}
              flex
              flex-row
              w-full
              gap-1
              p-1
              rounded-md
              text-black
          `}
          >
            {/* Card types */}
            <Box
              id="card-header-types"
              className="flex flex-row w-full gap-1"
            >
              {/* Super type */}
              {["object", "entity", "effect", "node"].includes(
                formCardData.cardType,
              ) && (
                <Controller
                  name="cardSuperType"
                  control={control}
                  render={({ field }) => (
                    <FormControl 
                      className={clsx("",
                        {
                          "w-1/5": formCardData.cardType === "entity",
                          "w-1/2":
                            formCardData.cardType === "object"
                            || formCardData.cardType === "effect"
                            || formCardData.cardType === "node",
                        }
                      )}
                    >
                      <InputLabel>Super type</InputLabel>
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
                  <FormControl
                    className={clsx("w-full",
                      {
                        "w-1/2": formCardData.cardSuperType && !formCardData.cardSubType,
                        "w-1/5": formCardData.cardSuperType && formCardData.cardSubType,
                      }
                    )}
                  >
                    <InputLabel>Type</InputLabel>
                    <Select
                      {...field}
                      label="Type"
                      size="small"
                      className="w-full"
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value === "node") {
                          const newEnergyCost = resetEnergyCost(activeCardCost);
                          setValue("cardEnergyCost", newEnergyCost);
                        };
                      }}
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
              {/* Sub type */}
              {["object", "entity", "effect"].includes(
                formCardData.cardType,
              ) && (
                <Controller
                  name="cardSubType"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className={clsx("",
                        {
                          "w-1/2": formCardData.cardType === "node",
                          "w-3/5":
                            formCardData.cardType === "object"
                            || formCardData.cardType === "effect"
                            || formCardData.cardType === "entity",
                        }
                      )}
                    >
                      <InputLabel>Sub type</InputLabel>
                      <Select
                        multiple
                        {...field}
                        value={Array.isArray(field.value) ? field.value : []}
                        label="Sub type"
                        size="small"
                        renderValue={(selected) => selected.join(' ')}
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
            {formCardData.cardType && formCardData.cardType != "node" && (<Box
              className="
                w-1/5
              "
            >
              {/* Select: Speed */}
              <Controller
                name="cardSpeed"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Speed</InputLabel>
                    <Select
                      {...field}
                      value={Array.isArray(field.value) ? field.value : []}
                      label="Speed"
                      size="small"
                    >
                      {Object.entries(cardSpeedOptions)
                        .map(([value, label]) => (
                          <MenuItem key={value} value={value}>
                            <Typography variant="body2">
                              {label}
                            </Typography>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>)}
          </Box>
        </Box>
        {/* Card image & content */}
        <Box
          id="card-image-content-outer"
          className={`
            flex
            flex-col
            w-full
            h-full
            px-4
            -mt-4
            shadow-lg
            shadow-black
            shadow-opacity-25
            z-0
          `}
        >
          <Box
            id="card-image-content-inner"
            className={`
              flex
              flex-col
              w-full
              h-full
              gap-2
              p-1
              rounded-lg
              ${cardColorClass400}
              border-4
              border-black
              shadow-lg
              shadow-black
              shadow-opacity-25
            `}
          >
            {/* Card image */}
            <Box
              id="card-image"
              sx={{
                aspectRatio: "4 / 3"
              }}
              className="
                w-full
                overflow-hidden
                relative
                border-2
                border-black
              "
            >
              <Image
                // Get DALL-E image URL from props
                // pass in dynamic image URL
                src="/images/card-parts/card-art/default-art.jpg"
                fill={true}
                sizes="100%"
                alt={`${formCardData.cardName} card art`}
                style={{ objectFit: "cover" }}
              />
            </Box>
            {/* Card text and flavor text */}
            <Box
              id="card-text-flavor"
              sx={{ aspectRatio: "540 / 275" }}
              className={`
                ${cardColorClass50}
                flex
                flex-col
                w-full
                text-black
                border-2
                border-black
                p-2
                gap-1
              `}
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
                    rows={4}
                    error={!!fieldState.error}
                    placeholder={
                      !fieldState.error ? 'Type "/" to insert a keyword ability.':
                      "Card text is required!"
                    }
                    className={clsx("w-full text-white",
                      {
                        "!text-black": !fieldState.error,
                        "!text-red-500": fieldState.error,
                      }
                    )}
                    inputProps={{ maxLength: 200 }}
                  />
                )}
              />
              {/* Divider */}
              <Box
                className="
                  card-text-divider
                  h-[2px]
                  w-full
                  my-4
                "
              />
              {/* Card flavor text */}
              {formCardData.cardText.length <= 200 && (
                <Controller
                  name="cardFlavorText"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      size="small"
                      variant="standard"
                      placeholder="Write some flavor text."
                      className="w-full"
                      rows={2}
                      inputProps={{ maxLength: 75 }}
                    />
                  )}
                />
              )}
            </Box>
          </Box>
        </Box>
        
        
        {/* Card stats, grade, creator and copyright */}
        <Box
          id="card-stats-grade-creator-info"
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
            -mt-10
            z-1
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
              w-1/5
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
              width={72}
              height={60}
              alt="Card attack icon"
              className="w-full h-full bg-red-500 p-0"
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
              w-3/5
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
                w-full
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
              {/* Card creator & copyright */}
              <Box
                className="
                  flex
                  flex-row
                  justify-between
                  items-center
                  w-full
                  text-white
                  text-xs
                  -mt-4
                "
              >
                <Typography
                  variant="caption"
                >
                  {/* Creator: {" "} */}
                  {formCardData.cardCreator
                    ? formCardData.cardCreator
                    : "Card Creator"}
                </Typography>
                <Typography
                  variant="caption"
                >
                  © Nexus {
                    new Date().getFullYear()
                  } 
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
              w-1/5
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
                    inputProps={{
                      maxLength: 2,
                      disableUnderline: true
                    }}
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
              width={72}
              height={60}
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
