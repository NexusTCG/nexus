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
  MenuItem,
  Select,
  IconButton,
  Tooltip,
  Fade,
  Snackbar,
  Divider
} from "@mui/material/";
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
import SpeedSelect from "@/app/components/card-creator/SpeedSelect";
import EnergyCostIcons from "@/app/components/card-creator/EnergyCostIcons";
import CustomInput from "@/app/components/card-creator/CustomInput";

export default function NexusCardForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setValue, control, watch } =
    useFormContext<CardFormDataType>();
  const formCardData = watch();
  const activeCardCost = watch("cardEnergyCost");
  const activeCardType = watch("cardType");
  const activeCardText = watch("cardText");

  // Track energy cost popover state
  const [energyCostAnchorEl, setEnergyCostAnchorEl] = React.useState<HTMLElement | null>(null);

  // Track energy cost change (to force re-render)
  const [energyCostChangeCounter, setEnergyCostChangeCounter] = useState<number>(0);

  // Track card color type, color, color class and bg image state
  const [cardColorType, setCardColorType] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string>("default");
  const [cardColorClass, setCardColorClass] = useState<string>("default");
  const [cardBgImage, setCardBgImage] = useState<string>("bg-[url('/images/card-parts/card-frames/other/default.png')]");

  // Snackbars
  const [openGradeSnackbar, setOpenGradeSnackBar] = React.useState(false);

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
    setOpenGradeSnackBar(true);
  }

  function handleCloseGradeSnackbar(
    event: React.SyntheticEvent |
    Event, reason?: string
  ) {
    if (reason === 'clickaway') {
      return;
    }

    setOpenGradeSnackBar(false);
  };

  return (
    <Box
      id="card-border"
      sx={{
        aspectRatio: "5 / 7"
      }}
      className="
        relative
        flex
        flex-col
        justify-start
        items-center
        w-full
        h-full
        max-w-[500px]
        max-h-[700px]
        rounded-2xl
        bg-black
        px-4
        pt-3        
        pb-8
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
          max-w-[468px]
          max-h-[668px]
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
          sx={{
            padding: "4px"
          }}
          className={`
            ${colorMapping[
              cardColorClass as keyof typeof
              colorMapping]?.[50] ??
              "bg-slate-50"
            }
            flex
            flex-col
            justify-between
            items-center
            w-full
            h-full
            max-w-[468px]
            max-h-[72px]
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
              max-h-[26px]
            `}
          >
            <Box
              id="card-header-mythic-name"
              className={`
                flex
                flex-row
                flex-grow
                justify-start
                items-center
                gap-1
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
              <CustomInput
                name="cardName"
                placeholder="Card name"
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
              max-h-[36px]
              gap-2
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
                max-h-[28px]
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
                          "w-1/6": formCardData.cardType === "entity",
                          "w-1/5": formCardData.cardType === "node",
                        }
                      )}
                    >
                      {/* Replace with custom select component */}
                      <Select
                        {...field}
                        label="Super type"
                        sx={{
                          '& .MuiInputBase-input': {
                            color: "black",
                            padding: "0",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            fontSize: "20px",
                            lineHeight: "28px",
                            fontWeight: "semi-bold",
                            overflow: "hidden",
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: "none",
                            borderColor: "black"
                          },
                        }}
                      >
                        {Object.entries(
                          cardSuperTypeOptions
                          ).map(([value, label]) => (
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

              {/* Replace with custom select component */}              
              {/* Type */}
              <Controller
                name="cardType"
                control={control}
                render={({ field }) => (
                  <FormControl
                    className={clsx("flex-grow",
                      {
                        "w-1/6": formCardData.cardType === "entity",
                        "w-4/5": formCardData.cardType === "node",
                      }
                    )}
                  >
                    <Select
                      // multiple // change to multiple but only for entity + object/effect
                      // change to custom component
                      {...field}
                      label="Type"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: "black",
                          padding: "0",
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          fontSize: "20px",
                          lineHeight: "28px",
                          fontWeight: "semi-bold",
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: "none",
                          borderColor: "black",
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
                      className={clsx("flex-grow",
                        {
                          "w-1/2": formCardData.cardType === "node",
                          "w-3/5":
                            formCardData.cardType === "object"
                            || formCardData.cardType === "effect"
                            || formCardData.cardType === "entity",
                        }
                      )}
                    >
                      <Select
                        multiple
                        {...field}
                        value={Array.isArray(field.value) ? field.value : []}
                        label="Sub type"
                        sx={{
                          '& .MuiInputBase-input': {
                            color: "black",
                            padding: "0",
                            height: "28px",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            fontSize: "20px",
                            lineHeight: "28px",
                            fontWeight: "semi-bold",
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: "none",
                            borderColor: "black",
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
            max-w-[468px]
            max-h-[646px]
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
              max-w-[434px]
              max-h-[563px]
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
                flex
                w-full
                h-full
                max-w-[424px]
                max-h-[306px]
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
              className={`
                ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[50] ?? "bg-slate-50"}
                flex
                flex-col
                w-full
                h-full
                max-w-[424px]
                max-h-[236px]
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
                    rows={activeCardText.length > 200 ? 7 : 4}
                    error={!!fieldState.error}
                    placeholder={
                      !fieldState.error ? 'Type "/" to insert a keyword ability.':
                      "Card text is required!"
                    }
                    className={clsx("w-full h-full text-white",
                      {
                        "!text-black": !fieldState.error,
                        "!text-red-500": fieldState.error,
                      }
                    )}
                    inputProps={{
                      maxLength: 280
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
              {activeCardText.length <= 200 && (
                <Divider
                  className="
                    mx-4
                    my-2
                    opacity-25
                  "
                />
              )}
              
              {/* Card flavor text */}
              {activeCardText.length <= 200 && (
                <Controller
                  name="cardFlavorText"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      size="small"
                      variant="standard"
                      placeholder="The greatest flavor text you've ever read!"
                      className="w-full"
                      rows={2}
                      inputProps={{
                        maxLength: 80
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
            h-full
            max-h-[57px]
            -mt-12
            z-10
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
                h-full
              "
            >
              <Snackbar
                open={openGradeSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseGradeSnackbar}
                message={`Grade changed to ${formCardData.cardGrade}!`}
              />
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title={`
                  Change grade to
                  ${
                    formCardData.cardGrade === "rare" ?
                    "epic" : formCardData.cardGrade === "epic" ?
                    "prime" : formCardData.cardGrade === "prime" ?
                    "common" : "rare"
                  }`
                }
                placement="top"
              >
                <IconButton
                  aria-label="add grade"
                  size="large"
                  onClick={handleGradeChange}
                >
                  <Image
                    src={`${cardPartPath.base}/card-parts${cardPartPath.icon}${cardPartPath.grade}/grade-${formCardData.cardGrade.toLowerCase()}.png`}
                    height={40}
                    width={40}
                    alt={`${formCardData.cardGrade} icon`}
                    className="
                      bg-black
                      cursor-pointer
                      rounded-full
                      p-2
                    "
                  />
                </IconButton>
              </Tooltip>
              
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
                  {/* Replace with username */}
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
                    maxLength: 2
                  }}
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
