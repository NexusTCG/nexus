"use client";

import React, { 
  useState, 
  useEffect, 
  useCallback,
  useMemo
} from "react";
import { 
  useFormContext, 
  Controller 
} from "react-hook-form";
import {
  cardSuperTypeOptions,
  cardTypeOptions,
  cardSubTypeOptions,
} from "@/app/utils/data/cardCreatorOptions";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
import Image from "next/image";
import clsx from "clsx";
import { debounce } from "lodash";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// Custom actions
import determineColorType from "@/app/lib/actions/determineColorType";
import determineColor from "@/app/lib/actions/determineColor";
import determineColorClass from "@/app/lib/actions/determineColorClass";
import determineBgImage from "@/app/lib/actions/determineBgImage";
import colorMapping from "@/app/utils/data/colorMapping";
import resetFieldsOnNode from "@/app/lib/actions/resetFieldsOnNode";
// Custom components
import EnergyCostPopover from "@/app/components/card-creator/EnergyCostPopover";
import SpeedSelect from "@/app/components/card-creator/SpeedSelect";
import EnergyCostIcons from "@/app/components/card-creator/EnergyCostIcons";
import CustomInput from "@/app/components/card-creator/CustomInput";
import CardRender from "@/app/components/card-creator/CardRender";
// Icons
import Mythic from "@/public/images/card-parts/card-icons/mythic.svg";
import Attack from "@/public/images/card-parts/card-stats/attack.svg";
import Defense from "@/public/images/card-parts/card-stats/defense.svg";
import Common from "@/public/images/card-parts/card-icons/card-grades/common.svg";
import Rare from "@/public/images/card-parts/card-icons/card-grades/rare.svg";
import Epic from "@/public/images/card-parts/card-icons/card-grades/epic.svg";
import Prime from "@/public/images/card-parts/card-icons/card-grades/prime.svg";

type CardRenderProps = {
  cardData?: CardsTableType | CardFormDataType | null;
  showCardRender?: boolean;
  showFlavorText?: boolean;
};

export default function NexusCardForm({
  cardData,
  showCardRender,
  showFlavorText
}: CardRenderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    setValue,
    control,
    watch,
    trigger,
    formState: { 
      isSubmitting, 
      isSubmitted 
  },
  } = useFormContext<CardFormDataType>();

  const formCardData = watch();
  const activeCardCost = watch("cardEnergyCost");
  const activeCardType = watch("cardType") || "";
  const activeCardText = watch("cardText") || "";
  const activeCardArt = watch("cardArt");

  // Track energy cost popover state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [energyCostPopoverOpen, setEnergyCostPopOver] = useState(false);
  const [energyCostChangeCounter, setEnergyCostChangeCounter] = useState<number>(0); // Track change to force re-render
  // Track card color type, color, color class and bg image state
  const [cardColorType, setCardColorType] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string>("default");
  const [cardColorClass, setCardColorClass] = useState<string>("default");
  // const [cardBgImage, setCardBgImage] = useState<string>("bg-[url('/images/card-parts/card-frames/other/default.PNG')]");
  // Snackbars
  const [openGradeSnackbar, setOpenGradeSnackBar] = React.useState(false);

  // Debounce function for cardText
  const debouncedSetCardText = useCallback(
    debounce((value: string) => {
      setValue("cardText", value);
    }, 200), []
  );

  // Debounce function for cardFlavorText
  const debouncedSetCardFlavorText = useCallback(
    debounce((value: string) => {
      setValue("cardFlavorText", value);
    }, 200), []
  );

  // Dynamically calculate cardText & cardFlavorText styles
  const calculateCardTextSize = (
    textLength: number
  ) => {
    if (textLength <= 88) {
      // Extra Large
      return { 
        fontSize: "16.5px", 
        lineHeight: "19px", 
        textFieldHeight: "76px", 
        textRows: 4, 
        flavorTextVisible: true,
        maxFlavorTextChars: 80, 
        flavorTextFieldHeight: "76px"
      };
    } else if (textLength <= 176) {
      // Large
      return { 
        fontSize: "16.5px", 
        lineHeight: "19px", 
        textFieldHeight: "96px", 
        textRows: 6, 
        flavorTextVisible: true, 
        maxFlavorTextChars: 62,
        flavorTextFieldHeight: "57px"
      };
    } else if (textLength <= 264) {
      // Medium
      return { 
        fontSize: "15px", 
        lineHeight: "17px", 
        textFieldHeight: "120px", 
        textRows: 7, 
        flavorTextVisible: true, 
        maxFlavorTextChars: 50,
        flavorTextFieldHeight: "34px"
      };
    } else if (textLength <= 352) {
      // Small
      return { 
        fontSize: "15px", 
        lineHeight: "17px", 
        textFieldHeight: "172px", 
        textRows: 9, 
        flavorTextVisible: false, 
        maxFlavorTextChars: 0,
        flavorTextFieldHeight: "0px"
      };
    } else {
      // Extra Small
      return { 
        fontSize: "13.5", 
        lineHeight: "15.5", 
        textFieldHeight: "172px", 
        textRows: 11, 
        flavorTextVisible: false, 
        maxFlavorTextChars: 0,
        flavorTextFieldHeight: "0px"
      };
    }
  };

  const cardTextProps = useMemo(
    () => calculateCardTextSize(
      activeCardText.length
    ), [activeCardText.length]
  );
  
  useEffect(() => {
    // This ensures code runs only in the client-side environment
    const container = document.querySelector('#energy-cost-container');
    setAnchorEl(container as HTMLElement);
  }, []);

  // Determine color type based on cost
  useEffect(() => {
    const colorType = determineColorType(
      activeCardCost,
      activeCardType === "" ? undefined : activeCardType
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

  const cardBgImage = useMemo(() => {
    return determineBgImage(activeCardType === "" ? undefined : activeCardType, cardColor || "");
  }, [activeCardType, cardColor]);

  // On cardType change: Clear cardSubType
  useEffect(() => {
    if (
      formCardData.cardSubType && 
      formCardData.cardSubType.length > 0
    ) {
      setValue("cardSubType", [""]);
    }
  }, [formCardData.cardType]);

  // Handle energy cost popover
  const handleEnergyCostPopoverOpen = useCallback(() => {
    setEnergyCostPopOver(true);
  }, []);
  
  const handleEnergyCostPopoverClose = useCallback(() => {
    setEnergyCostPopOver(false);
  }, []);

  // Handle grade change
  const handleGradeChange = useCallback(() => {
    switch (formCardData.cardGrade) {
      case "rare":
          setValue("cardGrade", "epic");
          trigger("cardGrade");
          break;
      case "epic":
          setValue("cardGrade", "prime");
          trigger("cardGrade");
          break;
      case "prime":
          setValue("cardGrade", "common");
          trigger("cardGrade");
          break;
      default:
          setValue("cardGrade", "rare");
          trigger("cardGrade");
    }
    setOpenGradeSnackBar(true);
  }, []);

  // Handle grade snackbar
  function handleCloseGradeSnackbar(
    event: React.SyntheticEvent |
    Event, reason?: string
  ) {
    if (reason === 'clickaway') return;
    setOpenGradeSnackBar(false);
  };

  return (
    <>
      {cardData && showCardRender ? (
        <CardRender
          cardData={cardData}
        />
      ) : (
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
                border: "4px solid black",
                zIndex: 5,
              }}
              className={`
                ${colorMapping[
                  cardColorClass as keyof typeof
                  colorMapping]?.[50] ??
                  "bg-neutral-50"
                }
                flex
                flex-col
                justify-between
                items-center
                w-full
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
                      src={Mythic}
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
                  {formCardData.cardType && !formCardData.cardType.includes("node") && (
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
                {/* Rendered card types */}
                {isSubmitting && (
                  <Box
                    className="
                      flex
                      flex-row
                      justify-start
                      items-center
                      gap-1
                    "
                  >
                    <Typography
                      variant="body2"
                    >
                      {formCardData.cardType}
                    </Typography>

                    {formCardData?.cardSubType && (
                      <Typography
                        variant="body2"
                      >
                      {" "} – {formCardData.cardSubType.join(" ")}
                      </Typography>
                    )}
                  </Box>
                )}
                {/* Card types */}
                {!isSubmitting && (
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

                    {/* Remove Supertype? */}

                    {/* {formCardData.cardType && (
                      formCardData.cardType.includes("object") || 
                      formCardData.cardType.includes("entity") || 
                      formCardData.cardType.includes("effect") || 
                      formCardData.cardType.includes("node")
                    ) && ( */}
                    {formCardData.cardType === null && (
                      <Controller
                        name="cardSuperType"
                        control={control}
                        disabled={isSubmitting || isSubmitted}
                        render={({ field }) => (
                          <FormControl 
                            className={clsx("flex-grow",
                              {
                                "w-1/5": 
                                  formCardData.cardType && 
                                  formCardData.cardType.length <= 1 && 
                                  formCardData.cardType.includes("entity"),
                                "w-2/5": 
                                  formCardData.cardType && 
                                  formCardData.cardType.includes("node"),
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
                                  formCardData.cardType && 
                                  formCardData.cardType.includes("node") || 
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
          
                    {/* Type */}
                    <Controller
                      name="cardType"
                      control={control}
                      disabled={isSubmitting || isSubmitted}
                      render={({ field }) => (
                        <FormControl
                          className={clsx("flex-grow", {
                            "w-1/5": formCardData.cardType === "entity",
                            "w-3/5": formCardData.cardType === "node",
                          })}
                        >
                          <Select
                            {...field}
                            label="Type"
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
                            onChange={async (e) => {
                              const selectedOption = e.target.value;

                              // Directly call field.onChange with the selectedOption
                              field.onChange(selectedOption);

                              // Check if the selected option is "node" and reset fields accordingly
                              if (selectedOption === "node") {
                                const newEnergyCost = await resetFieldsOnNode(activeCardCost);
                                setValue("cardEnergyCost", newEnergyCost);
                                setValue("cardEnergyValue", 0);
                                setValue("cardSpeed", "");
                                setValue("cardSubType", [""]);
                                if (formCardData.cardSuperType !== "mythic") {
                                  setValue("cardSuperType", "");
                                }
                              }
                            }}
                            renderValue={(selected) => (
                              typeof selected === "string" ? selected.charAt(0).toUpperCase() + selected.slice(1) : ""
                            )}
                          >
                            {Object.entries(cardTypeOptions).map(([value, label]) => (
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

                    {/* Sub type */}
                    {formCardData.cardType && (
                      formCardData.cardType.includes("object") || 
                      formCardData.cardType.includes("entity") || 
                      formCardData.cardType.includes("effect")
                    ) && (
                      <Controller
                        name="cardSubType"
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            className={clsx("flex-grow",
                              {
                                // "w-1/2": formCardData.cardType && formCardData.cardType.includes("node"),
                                "w-3/5": formCardData.cardType && (
                                  formCardData.cardType.includes("object") || 
                                  formCardData.cardType.includes("entity") || 
                                  formCardData.cardType.includes("effect")
                                )
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
                                    maxHeight: 236,
                                  },
                                },
                              }}
                            >
                              {formCardData.cardType && formCardData.cardType.includes("entity") &&
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
                              {formCardData.cardType && formCardData.cardType.includes("object") &&
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
                              {formCardData.cardType && formCardData.cardType.includes("effect") &&
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
                )}
                {/* Speed */}
                {formCardData.cardType && !formCardData.cardType.includes("node") && (
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
                marginTop: "-3.75px",
                zIndex: 0,
              }}
              className={`
                flex
                flex-col
                w-full
              `}
            >
              {/* Card Image Content Inner */}
              <Box
                id="card-image-content-inner"
                sx={{
                  height: "462px !important", // Increased by 6px to account for border
                  padding: "3px",
                  border: "3.75px solid black",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
                className={`
                  ${colorMapping[
                    cardColorClass as keyof typeof colorMapping
                  ]?.[400] ?? "bg-slate-400"}
                  flex
                  flex-col
                  w-full
                  gap-2
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
                        onChange={(e) => {
                          field.onChange(e);
                          debouncedSetCardText(e.target.value);
                        }}
                        multiline
                        size="small"
                        variant="standard"
                        rows={cardTextProps.textRows}
                        error={!!fieldState.error}
                        placeholder={
                          !fieldState.error ? 'Type "/" to insert a keyword ability.':
                          "Card text is required!"
                        }
                        className={clsx("w-full text-wrap",
                          {
                            "!text-black": !fieldState.error,
                            "!text-red-500": fieldState.error,
                          }
                        )}
                        inputProps={{
                          maxLength: 440,
                          style: { 
                            fontSize: cardTextProps.fontSize,
                            lineHeight: cardTextProps.lineHeight,
                            height: cardTextProps.textFieldHeight,
                            wordWrap: "break-word",
                          },
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
                  {cardTextProps.flavorTextVisible && 
                    showFlavorText  && (
                    <Divider
                      className="
                        mx-4
                        my-0.5
                        opacity-25
                      "
                    />
                  )}
                  
                  {/* Card flavor text */}
                  {cardTextProps.flavorTextVisible && 
                    showFlavorText && (
                    <Controller
                      name="cardFlavorText"
                      control={control}
                      disabled={isSubmitting || isSubmitted}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debouncedSetCardFlavorText(e.target.value);
                          }}
                          multiline
                          size="small"
                          variant="standard"
                          placeholder="The greatest flavor text you've ever read!"
                          rows={2}
                          className="w-full text-wrap"
                          inputProps={{
                            maxLength: cardTextProps.maxFlavorTextChars,
                            style: {
                              fontSize: cardTextProps.fontSize,
                              lineHeight: cardTextProps.lineHeight,
                              height: cardTextProps.flavorTextFieldHeight,
                              fontStyle: "italic",
                              fontWeight: 300,
                              wordWrap: "break-word",
                            },
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
                zIndex: 1,
              }}
              className="
                flex
                flex-row
                justify-between
                items-center
                w-full
                -mt-5
              "
            >
              {/* Card attack */}
              {formCardData.cardType && formCardData.cardType.includes("entity") && (
              <Box
                id="stats-attack"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-1/5
                  relative
                  stats-text
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
                        error={!!fieldState.error}
                        inputProps={{
                          maxLength: 2
                        }}
                        InputProps={{
                          className: "stats-text",
                          style: {
                            textAlign: 'center',
                          },
                        }}
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
                          stats-text
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
                          '& .MuiInputBase-input[type="number"]': {
                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                              WebkitAppearance: 'none',
                              margin: 0,
                            },
                            MozAppearance: 'textfield',
                          },
                        }}
                      />
                    </Tooltip>
                  )}
                />
                <Image
                  src={Attack}
                  width={60}
                  height={45}
                  alt="Card attack icon"
                />
              </Box>)}
              {/* Card grade + info */}
              <Box
                id="stats-grade-info"
                className={clsx("flex flex-col justify-center items-center",
                  formCardData.cardType && !formCardData.cardType.includes("entity") ? "w-full" : "w-3/5"
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
                        src={
                          formCardData.cardGrade === "common" ? Common :
                          formCardData.cardGrade === "rare" ? Rare :
                          formCardData.cardGrade === "epic" ? Epic :
                          formCardData.cardGrade === "prime" ? Prime :
                          null
                        }
                        height={34}
                        width={34}
                        alt={`${formCardData.cardGrade} icon`}
                        className="
                          bg-black
                          cursor-pointer
                          rounded-full
                          p-0.5
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
                  </Box>
                </Box>
              </Box>
              {/* Card defense */}
              {formCardData.cardType && 
              formCardData.cardType.includes("entity") && (
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
                        error={!!fieldState.error}
                        inputProps={{
                          maxLength: 2
                        }}
                        InputProps={{
                          className: "stats-text",
                          style: {
                            textAlign: 'center',
                          },
                        }}
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
                          stats-text
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
                          '& .MuiInputBase-input[type="number"]': {
                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                              WebkitAppearance: 'none',
                              margin: 0,
                            },
                            MozAppearance: 'textfield',
                          },
                        }}
                      />
                    </Tooltip>
                  )}
                />
                <Image
                  src={Defense}
                  width={60}
                  height={45}
                  alt="Card defense icon"
                />
              </Box>)}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}