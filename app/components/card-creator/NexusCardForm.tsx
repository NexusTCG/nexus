"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

// Types & data
import {
  cardSuperTypeOptions,
  cardTypeOptions,
  cardSubTypeOptions,
  // cardSpeedOptions
} from "@/app/utils/data/cardCreatorOptions";
import { CardFormDataType } from "@/app/utils/types/types";
import { cardPartPath } from "@/app/utils/consts/cardPartPaths";
import colorMapping from "@/app/utils/data/colorMapping";

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
// import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import clsx from "clsx";

// Custom actions
import determineColorType from "@/app/lib/actions/determineColorType";
import determineColor from "@/app/lib/actions/determineColor";
import determineColorClass from "@/app/lib/actions/determineColorClass";
import determineBgImage from "@/app/lib/actions/determineBgImage";
import resetFieldsOnNode from "@/app/lib/actions/resetFieldsOnNode";

// Custom components
import EnergyCostPopover from "@/app/components/card-creator/EnergyCostPopover";
// import GradePopover from "@/app/components/card-creator/GradePopover"
import SpeedSelect from "@/app/components/card-creator/SpeedSelect";
import EnergyCostIcons from "@/app/components/card-creator/EnergyCostIcons";

export default function NexusCardForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setValue, control, watch } =
    useFormContext<CardFormDataType>();
  const formCardData = watch();
  const activeCardCost = watch("cardEnergyCost");
  const activeCardType = watch("cardType");

  // Track energy cost popover state
  const [energyCostAnchorEl, setEnergyCostAnchorEl] = React.useState<HTMLElement | null>(null);
  // const [gradeAnchorEl, setGradeAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  // Track energy cost change (to force re-render)
  const [energyCostChangeCounter, setEnergyCostChangeCounter] = useState<number>(0);

  // Track card color type, color, color class and bg image state
  const [cardColorType, setCardColorType] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string>("default");
  const [cardColorClass, setCardColorClass] = useState<string>("default");
  const [cardBgImage, setCardBgImage] = useState<string>("bg-[url('/images/card-parts/card-frames/other/default.png')]");

  // useEffects to determine color type based on cost
  useEffect(() => {
    const colorType = determineColorType(
      activeCardCost,
      activeCardType
    );
    setCardColorType(colorType);
  }, [
    activeCardCost,
    activeCardType,
    energyCostChangeCounter
  ]);

  // useEffects to determine color based on cost and color type
  useEffect(() => {
    const color = determineColor(
      activeCardCost,
      cardColorType || ""
    );
    setCardColor(color);
  }, [
    activeCardCost,
    cardColorType
  ]);

  // useEffects to determine color class based on color type and color
  useEffect(() => {
    const colorClass = determineColorClass(
      cardColorType || "",
      cardColor || ""
    );
    setCardColorClass(colorClass);
  }, [
    cardColorType,
    cardColor
  ]); 

  // useEffects to determine bg image based on color type and color
  useEffect(() => {
    const bgImage = determineBgImage(
      activeCardType,
      cardColor || ""
    );
    setCardBgImage(bgImage);
  }, [
    activeCardType,
    cardColor
  ]);

  // Handle energy cost popover
  function handleEnergyCostPopoverOpen(
    event: React.MouseEvent<HTMLElement>
  ) {
    setEnergyCostAnchorEl(event.currentTarget);
  };
  function handleEnergyCostPopoverClose() {
    setEnergyCostAnchorEl(null);
  };

  // Handle grade popover
  // function handleGradePopoverOpen(
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) {
  //   setGradeAnchorEl(event.currentTarget);
  //   console.log(formCardData.cardGrade)
  // };
  // function handleGradePopoverClose() {
  //   setGradeAnchorEl(null);
  //   console.log(formCardData.cardGrade)
  // };

  function handleGradeChange() {
    switch (formCardData.cardGrade) {
        case "rare":
            setValue("cardGrade", "epic");
            break;
        case "epic":
            setValue("cardGrade", "prime");
            break;
        case "prime":
            setValue("cardGrade", "common");
            break;
        default:
            setValue("cardGrade", "rare");
      }
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
        justify-start
        items-center
        rounded-2xl
        bg-black
        px-4
        pt-3        
        pb-8
        w-full
        shadow-lg
        shadow-gray-950/50
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
          
          bg-cover
          bg-center
          bg-no-repeat
          ${cardBgImage}
        `}
      >
        {/* Card header */}
        <Box
          id="card-header"
          className={`
              ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[50] ?? "bg-slate-50"}
              flex
              flex-col
              justify-between
              items-center
              w-full
              py-1
              px-1
              gap-2
              border-4
              border-black
              rounded-lg
              shadow-md
              shadow-gray-950/50
              z-10
          `}
        >
          {/* Card name and cost */}
          <Box
            id="card-header-mythic-name-cost"
            className={`
                flex
                flex-row
                justify-between
                items-center
                w-full
                gap-2
            `}
          >
            <Box
              id="card-header-mythic-name"
              className={`
                  flex
                  flex-row
                  justify-start
                  items-center
                  gap-1
                  flex-grow
              `}
            >
              {/* Mythic icon boolean */}
              {formCardData.cardSuperType === "mythic" && (
                <Image
                  src={`${cardPartPath.base}/card-parts${cardPartPath.icon}/mythic.png`}
                  height={16}
                  width={16}
                  alt="Mythic icon"
                  className="pl-1 w-auto"
                />
              )}
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
                    className={clsx("text-white flex-grow",
                      {
                        "!text-black": !fieldState.error,
                        "!text-red-500": fieldState.error,
                      }
                    )}
                    sx={{
                      '& .MuiInputBase-input': {
                        color: "black",
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: "black",
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "gray",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                      },
                    }}
                  />
                )}
              />
            </Box>
            
            {/* Card cost */}
            {formCardData.cardType !== "node" &&  (<EnergyCostIcons
              handleEnergyCostPopoverOpen={handleEnergyCostPopoverOpen}
            />)}

            {formCardData.cardType !== "node" && (<EnergyCostPopover
              anchorEl={energyCostAnchorEl}
              handleClose={handleEnergyCostPopoverClose}
              energyCostChangeCounter={energyCostChangeCounter}
              setEnergyCostChangeCounter={setEnergyCostChangeCounter}
            />)}
          </Box>
          {/* Card types and speed */}
          <Box
            id="card-header-types-speed"
            className={`
            ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[200] ?? "bg-slate-200"}
              flex
              flex-row
              justify-between
              items-center
              w-full
              gap-3
              p-1
              rounded-md
              text-black
          `}
          >
            {/* Card types */}
            <Box
              id="card-header-types"
              className="
                flex
                flex-row
                justify-between
                items-center
                w-full
                gap-1
              "
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
                      className={clsx("flex-grow",
                        {
                          "w-1/5": formCardData.cardType === "entity",
                          "w-1/2":
                            formCardData.cardType === "object"
                            || formCardData.cardType === "effect"
                            || formCardData.cardType === "node",
                        }
                      )}
                    >
                      <InputLabel>
                        Super type
                      </InputLabel>
                      <Select
                        {...field}
                        label="Super type"
                        size="small"
                        className="w-full"
                        sx={{
                          '& .MuiInputBase-input': {
                            color: 'black',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'lightblue',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'blue',
                          },
                        }}
                      >
                        {Object.entries(
                          cardSuperTypeOptions
                          ).map(
                          ([value, label]) => (
                            <MenuItem
                              key={value}
                              value={value}
                            >
                              <Typography
                                variant="body2"
                              >
                                {label}
                              </Typography>
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
                        "w-1/2": formCardData.cardSuperType &&
                          !formCardData.cardSubType,
                        "w-1/5": formCardData.cardSuperType &&
                          formCardData.cardSubType,
                      }
                    )}
                  >
                    <InputLabel>
                      Type
                    </InputLabel>
                    <Select
                      // multiple // change to multiple but only for entity + object/effect
                      {...field}
                      label="Type"
                      size="small"
                      className="w-full"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'lightblue',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'blue',
                        },
                      }}
                      onChange={async (e) => {
                        field.onChange(e);
                        if (e.target.value === "node") {
                          const newEnergyCost = await resetFieldsOnNode(activeCardCost);
                          setValue("cardEnergyCost", newEnergyCost);

                          setValue("cardEnergyValue", 0);
                          setValue("cardSpeed", "");
                          setValue("cardSubType", [""]);
                          if (formCardData.cardSuperType !== "mythic") {
                            setValue("cardSuperType", "")
                          }
                        };
                      }}
                    >
                      {Object
                        .entries(cardTypeOptions)
                        .map(([value, label]) => (
                        <MenuItem
                          key={value}
                          value={value}
                        >
                          <Typography
                            variant="body2"
                          >
                            {label}
                          </Typography>
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
                      <InputLabel>
                        Sub type
                      </InputLabel>
                      <Select
                        multiple
                        {...field}
                        value={Array.isArray(field.value) ? field.value : []}
                        label="Sub type"
                        size="small"
                        sx={{
                          '& .MuiInputBase-input': {
                            color: 'black',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'lightblue',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'blue',
                          },
                        }}
                        renderValue={(selected) => selected.join(' ')}
                      >
                        {formCardData.cardType === "entity" &&
                          Object.entries(
                            cardSubTypeOptions.entity
                          ).map(
                            ([value, label]) => (
                              <MenuItem
                                key={value}
                                value={value}
                              >
                                <Typography
                                  variant="body2"
                                >
                                  {label as string}
                                </Typography>
                              </MenuItem>
                            ),
                          )}
                        {formCardData.cardType === "object" &&
                          Object.entries(
                            cardSubTypeOptions.object
                          ).map(
                            ([value, label]) => (
                              <MenuItem key={value} value={value}>
                                <Typography variant="body2">
                                  {label as string}
                                </Typography>
                              </MenuItem>
                            ),
                          )}
                        {formCardData.cardType === "effect" &&
                          Object.entries(
                            cardSubTypeOptions.effect
                          ).map(
                            ([value, label]) => (
                              <MenuItem
                                key={value}
                                value={value}
                              >
                                <Typography
                                  variant="body2"
                                >
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
            {/* Speed */}
            {formCardData.cardType != "node" && (
              <SpeedSelect />
            )}
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
            z-0
          `}
        >
          <Box
            id="card-image-content-inner"
            className={`
              ${colorMapping[
                cardColorClass as keyof typeof colorMapping
              ]?.[400] ?? "bg-slate-400"}
              flex
              flex-col
              w-full
              h-full
              gap-2
              p-1
              rounded-lg
              border-4
              border-black
              shadow-md
              shadow-black/50
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
                ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[50] ?? "bg-slate-50"}
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
                    inputProps={{
                      maxLength: 200
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        color: 'black',
                      },
                      
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                      },
                      
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'lightblue',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                      },
                    }}
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
                      inputProps={{
                        maxLength: 75
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'lightblue',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'blue',
                        },
                      }}
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
          {formCardData.cardType === "entity" && (<Box
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
            <Controller
              name="cardAttack"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  size="small"
                  variant="standard"
                  placeholder="0"
                  className="
                    flex
                    justify-center
                    items-center
                    w-full
                    absolute
                    z-10
                    top-0
                    bottom-0
                    right-0
                    left-0
                    text-center
                    px-6
                  "
                  error={!!fieldState.error}
                  inputProps={{
                    maxLength: 2
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'black',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'lightblue',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'blue',
                    },
                  }}
                  // add logic to only allow for numbers
                  // helperText={fieldState.error ? fieldState.error.message : "Card text is required!"}
                  // InputProps={{ disableUnderline: true }} caused error
                />
              )}
            />
            <Image
              src={`${cardPartPath.base}/card-parts${cardPartPath.stats}/attack.png`}
              width={72}
              height={60}
              alt="Card attack icon"
              className="w-full h-full"
            />
          </Box>)}
          {/* Card grade + info */}
          <Box
            id="stats-grade-info"
            className={clsx("flex flex-col justify-center items-center",
                  formCardData.cardType !== "entity" ? "w-full" : "w-3/5"
            )}
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
                aria-label="add grade"
                size="large"
                onClick={handleGradeChange}
                
              >
                <Image
                  src={`${cardPartPath.base}/card-parts${cardPartPath.icon}${cardPartPath.grade}/grade-${formCardData.cardGrade.toLowerCase()}.png`}
                  height={36}
                  width={36}
                  alt={`${formCardData.cardGrade} icon`}
                  className="
                    cursor-pointer
                    rounded-full
                    p-2
                  "
                />
              </IconButton>
              {/* <GradePopover
                anchorEl={gradeAnchorEl}
                handleClose={handleGradePopoverClose}
              /> */}
              
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
          {formCardData.cardType === "entity" && (<Box
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
            <Controller
              name="cardDefense"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  size="small"
                  variant="standard"
                  placeholder="0"
                  className="
                    flex
                    justify-center
                    items-center
                    w-full
                    absolute
                    z-10
                    top-0
                    bottom-0
                    right-0
                    left-0
                    text-center
                    px-6
                  "
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'black',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'lightblue',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'blue',
                    },
                  }}
                  error={!!fieldState.error}
                  inputProps={{
                    maxLength: 2,
                    disableUnderline: true
                  }}
                  // helperText={
                  //   fieldState.error
                  //     ? fieldState.error.message
                  //     : "Card text is required!"
                  // }
                  // InputProps={{ disableUnderline: true }}
                />
              )}
            />
            <Image
              src={`${cardPartPath.base}/card-parts${cardPartPath.stats}/defense.png`}
              width={72}
              height={60}
              alt="Card defense icon"
              className="w-full h-full"
              // style={{ objectFit: "cover" }}
            />
          </Box>)}
        </Box>
      </Box>
    </Box>
  );
}
