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
  Divider,
  ClickAwayListener
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

// Add debouncer to reduce input lag

export default function NexusCardForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    setValue,
    control,
    watch,
    formState: { isSubmitting, isSubmitted },
  } = useFormContext<CardFormDataType>();

  const formCardData = watch();
  const activeCardCost = watch("cardEnergyCost");
  const activeCardType = watch("cardType");
  const activeCardText = watch("cardText");
  const activeCardArt = watch("cardArt");

  // Track energy cost popover state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // const [energyCostAnchorEl, setEnergyCostAnchorEl] = React.useState<HTMLElement | null>(null);
  const [energyCostPopoverOpen, setEnergyCostPopOver] = useState(false);

  // Track energy cost change (to force re-render)
  const [energyCostChangeCounter, setEnergyCostChangeCounter] = useState<number>(0);

  // Track card color type, color, color class and bg image state
  const [cardColorType, setCardColorType] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string>("default");
  const [cardColorClass, setCardColorClass] = useState<string>("default");
  const [cardBgImage, setCardBgImage] = useState<string>("bg-[url('/images/card-parts/card-frames/other/default.png')]");

  // Snackbars
  const [openGradeSnackbar, setOpenGradeSnackBar] = React.useState(false);

  // Dynamically adjust text size, line height and rows based on text length
  const textLength = activeCardText.length;
  const maxChars = 440;

  const [dynamicCardText, setDynamicCardText] = useState({
    fontSize: "16.5px",
    lineHeight: "19px",
    textFieldHeight: "76px",
    textRows: 4,
    flavorTextVisible: true,
    maxFlavorTextChars: 80,
    flavorTextFieldHeight: "76px",
  });

  // Dynamically adjust card text input sizing
  useEffect(() => {
    if (textLength <= 88) {
      // Extra Large
      setDynamicCardText({
        fontSize: "16.5px",
        lineHeight: "19px",
        textFieldHeight: "76px",
        textRows: 4,
        flavorTextVisible: true,
        maxFlavorTextChars: 80,
        flavorTextFieldHeight: "76px",
      });
    } else if (textLength <= 176) {
      // Large
      setDynamicCardText({
        fontSize: "16.5px",
        lineHeight: "19px",
        textFieldHeight: "96px",
        textRows: 6,
        flavorTextVisible: true,
        maxFlavorTextChars: 62,
        flavorTextFieldHeight: "57px",
      });
    } else if (textLength <= 264) {
      // Medium
      setDynamicCardText({
        fontSize: "15px",
        lineHeight: "17px",
        textFieldHeight: "120px",
        textRows: 7,
        flavorTextVisible: true,
        maxFlavorTextChars: 50,
        flavorTextFieldHeight: "34px",
      });
    } else if (textLength <= 352) {
      // Small
      setDynamicCardText({
        fontSize: "15px",
        lineHeight: "17px",
        textFieldHeight: "172px",
        textRows: 9,
        flavorTextVisible: false,
        maxFlavorTextChars:0,
        flavorTextFieldHeight: "0px",
      });
    } else if (textLength <= maxChars) {
      // Extra small
      setDynamicCardText({
        fontSize: "13.5px",
        lineHeight: "15.5px",
        textFieldHeight: "172px",
        textRows: 11,
        flavorTextVisible: false,
        maxFlavorTextChars: 0,
        flavorTextFieldHeight: "0px",
      });
      
    } 
  }, [formCardData.cardText, formCardData.cardFlavorText]);
  
  useEffect(() => {
    // This ensures code runs only in the client-side environment
    const container = document.querySelector('#energy-cost-container');
    setAnchorEl(container as HTMLElement);
  }, []);

  // Determine color type based on cost
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

  // Determine color based on cost and color type
  useEffect(() => {
    const color = determineColor(
      activeCardCost,
      cardColorType || ""
    );
    setCardColor(color);
    setValue("cardColor", color);
  }, [
    activeCardCost,
    cardColorType
  ]);

  // Determine color class based on color type and color
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

  // Determine bg image based on color type and color
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

  // Clear sub type when card type changes
  useEffect(() => {
    if (formCardData.cardSubType.length > 0) {
      setValue("cardSubType", [""]);
    }
  }, [formCardData.cardType]);

  // Handle energy cost popover
  function handleEnergyCostPopoverOpen() {
    setEnergyCostPopOver(true);
    // const container = document.querySelector('#energyCostContainer') as HTMLElement;
    // setEnergyCostAnchorEl(container);
  };
  
  function handleEnergyCostPopoverClose() {
    setEnergyCostPopOver(false);
    // setEnergyCostAnchorEl(null);
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
        aspectRatio: "5 / 7",
        width: "400px",
        height: "560px",
        borderRadius: "12.5px",
        padding: "7.5px 12.5px 22px 12.5px"
      }}
      className="
        relative
        flex
        flex-col
        justify-start
        items-center
        bg-black
        shadow-lg
        shadow-gray-950/50
      "
    >
      {/* Card frame */}
      <Box
        id="card-frame"
        sx={{
          width: "375px",
          height: "526px",
          borderRadius: "12.5px",
        }}
        className={`
          flex
          flex-col
          w-full
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
            maxHeight: "56px", // Increased by 8px to account for border
            padding: "3px",
            borderRadius: "4px",
            border: "4px solid black",
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
            shadow-md
            shadow-gray-950/50
            z-10
            gap-1
          `}
        >
          {/* Card name and cost */}
          <Box
            id="card-header-mythic-name-cost"
            sx={{
              height: "20px",
            }}
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
                flex-grow
                justify-start
                items-center
                h-full
                gap-1
              `}
            >
              {/* Mythic icon boolean */}
              {formCardData.cardSuperType === "mythic" && (
                <Image
                  src={`${cardPartPath.base}/card-parts${cardPartPath.icon}/mythic.png`}
                  height={14}
                  width={14}
                  alt="Mythic icon"
                />
              )}
              {/* Card name */}
              <CustomInput
                name="cardName"
                placeholder="Card name"
              />
            </Box> 
            
            {/* Energy Cost Icons */}
            <Box
              id="energy-cost-container"
              className="
                flex
                flex-row
                justify-end
                items-center
              "
            >
              {formCardData.cardType !== "node" && (
                <ClickAwayListener
                  onClickAway={handleEnergyCostPopoverClose}
                >
                  <>
                    {!energyCostPopoverOpen &&(
                      <EnergyCostIcons
                        handleEnergyCostPopoverOpen={handleEnergyCostPopoverOpen}
                      />
                    )}
                    {!isSubmitting && !isSubmitted && (
                      <EnergyCostPopover
                        open={energyCostPopoverOpen}
                        anchorEl={anchorEl}
                        handleClose={handleEnergyCostPopoverClose}
                        energyCostChangeCounter={energyCostChangeCounter}
                        setEnergyCostChangeCounter={setEnergyCostChangeCounter}
                      />
                    )}
                  </>
                </ClickAwayListener>
              )}
            </Box>
          </Box>

          {/* Card types and speed */}
          <Box
            id="card-header-types-speed"
            sx={{
              height: "20px",
              borderRadius: "3px",
              padding: "1px 2px"
            }}
            className={`
              ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[200] ?? "bg-slate-200"}
              flex
              flex-row
              justify-between
              items-center
              w-full
              gap-2
              text-black
            `}
          >
            {/* Card types */}
            <Box
              id="card-header-types"
              sx={{
                height: "21px",
              }}
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
              {[
                "object",
                "entity",
                "effect",
                "node"
              ].includes(
                formCardData.cardType,
              ) && (
                <Controller
                  name="cardSuperType"
                  control={control}
                  disabled={isSubmitting || isSubmitted}
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
                        {Object.entries(cardSuperTypeOptions)
                          .filter(([value]) => 
                            formCardData.cardType === "node" || 
                            value !== "core"
                          )
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
              )}

              {/* Replace with custom select component */}              
              {/* Type */}
              <Controller
                name="cardType"
                control={control}
                disabled={isSubmitting || isSubmitted}
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
                            height: "19px",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            fontSize: "14px",
                            lineHeight: "19px",
                            fontWeight: "semi-bold",
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: "none",
                            borderColor: "black",
                          },
                        }}
                        renderValue={(selected) => selected.join(' ')}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 176,
                            },
                          },
                        }}
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

        {/* Card Image Content Outer */}
        <Box
          id="card-image-content-outer"
          sx={{
            width: "375px",
            height: "526px",
            paddingLeft: "13.5px",
            paddingRight: "13.5px",
            marginTop: "-8px",
          }}
          className={`
            flex
            flex-col
            w-full
            z-0
          `}
        >
          {/* Card Image Content Inner */}
          <Box
            id="card-image-content-inner"
            sx={{
              height: "462px !important", // Increased by 6px to account for border
              padding: "3px",
              border: "3.75px solid black",
              borderRadius: "8px",
            }}
            className={`
              ${colorMapping[
                cardColorClass as keyof typeof colorMapping
              ]?.[400] ?? "bg-slate-400"}
              flex
              flex-col
              w-full
              gap-2
              shadow-md
              shadow-black/50
            `}
          >
            {/* Card image */}
            <Box
              id="card-image"
              sx={{
                aspectRatio: "4 / 3 !important",
                height: "252px !important", // Maybe 7px taller
                border: "2px solid black",
              }}
              className="
                w-full
                overflow-hidden
                relative
              "
            >
              <Image
                src={activeCardArt || "/images/card-parts/card-art/default-art.jpg"}
                fill={true}
                sizes="100%"
                alt={`${formCardData.cardName} card art`}
                style={{
                  objectFit: "cover"
                }}
              />
            </Box>
            {/* Card text and flavor text */}
            <Box
              id="card-text-flavor"
              sx={{
                maxWidth: "340px !important",
                height: "190px !important",
                border: "2px solid black",
                padding: "5px 7.5px",
              }}
              className={`
                ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[50] ?? "bg-slate-50"}
                flex
                flex-col
                text-black
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
                    rows={dynamicCardText.textRows}
                    error={!!fieldState.error}
                    placeholder={
                      !fieldState.error ? 'Type "/" to insert a keyword ability.':
                      "Card text is required!"
                    }
                    className={clsx("w-full",
                      {
                        "!text-black": !fieldState.error,
                        "!text-red-500": fieldState.error,
                      }
                    )}
                    inputProps={{
                      maxLength: 440,
                      style: {
                        fontSize: dynamicCardText.fontSize,
                        lineHeight: dynamicCardText.lineHeight,
                        height: dynamicCardText.textFieldHeight,
                      }
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
              {dynamicCardText.flavorTextVisible && (
                <Divider
                  className="
                    mx-4
                    my-0.5
                    opacity-25
                  "
                />
              )}
              
              {/* Card flavor text */}
              {dynamicCardText.flavorTextVisible  && (
                <Controller
                  name="cardFlavorText"
                  control={control}
                  disabled={isSubmitting || isSubmitted}
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
                        maxLength: dynamicCardText.maxFlavorTextChars,
                        style: {
                          fontSize: dynamicCardText.fontSize,
                          lineHeight: dynamicCardText.lineHeight,
                          height: dynamicCardText.flavorTextFieldHeight,
                          fontStyle: "italic",
                          fontWeight: 300,
                        }
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
          sx={{
            maxHeight: "45px",
          }}
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
            -mt-4
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
              disabled={isSubmitting || isSubmitted}
              render={({ field, fieldState }) => (
                <Tooltip
                  title="Entity attack"
                  placement="top"
                >
                  <TextField
                    {...field}
                    size="small"
                    variant="standard"
                    placeholder="0"
                    type="number"
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
                </Tooltip>
              )}
            />
            <Image
              src={`${cardPartPath.base}/card-parts${cardPartPath.stats}/attack.png`}
              width={60}
              height={45}
              alt="Card attack icon"
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
                  disabled={isSubmitting || isSubmitted}
                  size="large"
                  onClick={handleGradeChange}
                >
                  <Image
                    src={`${cardPartPath.base}/card-parts${cardPartPath.icon}${cardPartPath.grade}/grade-${formCardData.cardGrade.toLowerCase()}.png`}
                    height={34}
                    width={34}
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
              {/* <Box
                className="
                  flex
                  flex-row
                  justify-between
                  items-center
                  w-full
                  text-xs
                  -mt-4
                "
              >
                <Typography
                  variant="caption"
                  className="opacity-80"
                >
                  {formCardData.cardCreator
                    ? formCardData.cardCreator
                    : "Card Creator"}
                </Typography>
                <Typography
                  variant="caption"
                  className="opacity-80"
                >
                  © Nexus {
                    new Date().getFullYear()
                  } 
                </Typography>
              </Box> */}
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
              disabled={isSubmitting || isSubmitted}
              render={({ field, fieldState }) => (
                <Tooltip
                  title="Entity defense"
                  placement="top"
                >
                  <TextField
                    {...field}
                    size="small"
                    variant="standard"
                    placeholder="0"
                    type="number"
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
                </Tooltip>
              )}
            />
            <Image
              src={`${cardPartPath.base}/card-parts${cardPartPath.stats}/defense.png`}
              width={60}
              height={45}
              alt="Card defense icon"
            />
          </Box>)}
        </Box>
      </Box>
    </Box>
  );
}
