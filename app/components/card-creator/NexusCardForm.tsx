"use client";

// Hooks
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
// Actions
import determineColorType from "@/app/lib/actions/determineColorType";
import determineColor from "@/app/lib/actions/determineColor";
import determineColorClass from "@/app/lib/actions/determineColorClass";
import determineBgImage from "@/app/lib/actions/determineBgImage";
import colorMapping from "@/app/utils/data/colorMapping";
import resetFieldsOnAnomaly from "@/app/lib/actions/resetFieldsOnAnomaly";
// Types
import { CardFormDataType } from "@/app/utils/types/types";
import {
  cardTypeOptions,
  cardSubTypeOptions,
  anomalyTypeOptions,
} from "@/app/utils/data/cardCreatorOptions";
// Utils
import { debounce } from "lodash";
import Image from "next/image";
import clsx from "clsx";
// Custom components
import EnergyCostPopover from "@/app/components/card-creator/EnergyCostPopover";
import SpeedSelect from "@/app/components/card-creator/SpeedSelect";
import EnergyCostIcons from "@/app/components/card-creator/EnergyCostIcons";
import CustomInput from "@/app/components/card-creator/CustomInput";
// Components
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
// Icons
import Mythic from "@/public/images/card-parts/card-icons/mythic.svg";
import Attack from "@/public/images/card-parts/card-icons/card-stats/attack.svg";
import Defense from "@/public/images/card-parts/card-icons/card-stats/defense.svg";
import RangeMelee from "@/public/images/card-parts/card-icons/range-melee.svg";
import RangeRanged from "@/public/images/card-parts/card-icons/range-ranged.svg";
import GradeCore from "@/public/images/card-parts/card-icons/card-grades/grade-core.svg";
import GradeRare from "@/public/images/card-parts/card-icons/card-grades/grade-rare.svg";
import GradeEpic from "@/public/images/card-parts/card-icons/card-grades/grade-epic.svg";
import GradePrime from "@/public/images/card-parts/card-icons/card-grades/grade-prime.svg";

type CardRenderProps = {
  cardMode: string;
};

export default function NexusCardForm({
  cardMode,
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
  const form = watch();
  const activeCardText = watch("im_text") || "";

  // Energy cost popover states
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [energyCostPopoverOpen, setEnergyCostPopOver] = useState(false);
  const [energyCostChangeCounter, setEnergyCostChangeCounter] = useState<number>(0); // Track change to force re-render
  // Card color states
  const [cardCostType, setCardColorType] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string>("default");
  const [cardColorClass, setCardColorClass] = useState<string>("default");
  // Feedback states
  const [openGradeSnackbar, setOpenGradeSnackBar] = React.useState(false);

  // Debounce function for cardText
  const debouncedSetImText = useCallback(
    debounce((value: string) => {
      setValue("im_text", value);
    }, 200), []
  );

  // Debounce function for cardText
  const debouncedSetAmText = useCallback(
    debounce((value: string) => {
      setValue("am_text", value);
    }, 200), []
  );

  // Debounce function for cardLoreText
  const debouncedSetImLoreText = useCallback(
    debounce((value: string) => {
      setValue("im_lore_text", value);
    }, 200), []
  );

   // Debounce function for cardAnomalyModeLoreText
   const debouncedSetAmLoreText = useCallback(
    debounce((value: string) => {
      setValue("am_lore_text", value);
    }, 200), []
  );

  // Dynamically calculate 
  // im_text and im_lore_text styles
  // TODO: Make this a separate function
  function calculateCardTextSize(
    textLength: number
  ) {
    if (textLength <= 88) {
      // Extra Large
      return { 
        fontSize: "16.5px", 
        lineHeight: "19px", 
        textFieldHeight: "76px", 
        textRows: 4, 
        loreTextVisible: true,
        maxLoreTextChars: 352, 
        loreTextFieldHeight: "76px"
      };
    } else if (textLength <= 176) {
      // Large
      return { 
        fontSize: "16.5px", 
        lineHeight: "19px", 
        textFieldHeight: "96px", 
        textRows: 6, 
        loreTextVisible: true, 
        maxLoreTextChars: 264,
        loreTextFieldHeight: "57px"
      };
    } else if (textLength <= 264) {
      // Medium
      return { 
        fontSize: "15px", 
        lineHeight: "17px", 
        textFieldHeight: "120px", 
        textRows: 7, 
        loreTextVisible: true, 
        maxLoreTextChars: 176,
        loreTextFieldHeight: "34px"
      };
    } else if (textLength <= 352) {
      // Small
      return { 
        fontSize: "15px", 
        lineHeight: "17px", 
        textFieldHeight: "172px", 
        textRows: 9, 
        loreTextVisible: false, 
        maxLoreTextChars: 88,
        loreTextFieldHeight: "0px"
      };
    } else {
      // Extra Small
      return { 
        fontSize: "13.5", 
        lineHeight: "15.5", 
        textFieldHeight: "172px", 
        textRows: 11, 
        loreTextVisible: false, 
        maxLoreTextChars: 0,
        loreTextFieldHeight: "0px"
      };
    }
  };

  // Calculate cardText size
  const cardTextProps = useMemo(
    () => calculateCardTextSize(
      activeCardText.length
    ), [activeCardText.length]
  );

  // Handle energy cost popover
  const handleEnergyCostPopoverOpen = useCallback(
    () => {setEnergyCostPopOver(true);
  }, []);
  
  const handleEnergyCostPopoverClose = useCallback(
    () => {setEnergyCostPopOver(false);
  }, []);

  // Handle grade change
  const handleGradeChange = useCallback(
    () => {
    const grades = [
      "core", 
      "rare", 
      "epic", 
      "prime"
    ];

    if (cardMode === "initial") {
      const currentGrade = form.im_grade ?? "core";
      const currentIndex = grades.indexOf(currentGrade);
      const nextIndex = (currentIndex + 1) % grades.length;
      const nextGrade = grades[nextIndex];
    
      setValue("im_grade", nextGrade);
      trigger("im_grade");
    } else if (cardMode === "anomaly") {
      const currentGrade = form.am_grade ?? "core";
      const currentIndex = grades.indexOf(currentGrade);
      const nextIndex = (currentIndex + 1) % grades.length;
      const nextGrade = grades[nextIndex];
    
      setValue("am_grade", nextGrade);
      trigger("am_grade");
    }
    
    setOpenGradeSnackBar(true);
  }, [
    form.im_grade, 
    form.am_grade,
    setValue, 
    trigger, 
    setOpenGradeSnackBar
  ]);

  // Handle grade snackbar
  function handleCloseGradeSnackbar(
    event: React.SyntheticEvent |
    Event, reason?: string
  ) {
    if (reason === 'clickaway') return;
    setOpenGradeSnackBar(false);
  };

  // Format card type name
  function formatCardTypeName(
    typeKey: string
  ): string {
    return typeKey
      .replace(
        /([a-z])([A-Z])/g, 
        '$1 $2'
      )
      .split(' ')
      .map(word => word
        .charAt(0)
        .toUpperCase() + 
        word.slice(1)
      )
      .join(' ');
  }
  
  // This ensures code runs only 
  // in the client-side environment
  useEffect(() => {
    const container = document
      .querySelector(
        "#energy-cost-container"
      );
    setAnchorEl(container as HTMLElement);
  }, []);

  // Determine color type based on cost
  useEffect(() => {
    const colorType = determineColorType(
      form.im_energy_cost,
      form.im_type,
    );
    setCardColorType(colorType);
  }, [
    form.im_energy_cost,
    form.im_type,
    energyCostChangeCounter
  ]);

  // Determine card color 
  // based on cost and color type
  useEffect(() => {
    const color = determineColor(
      form.im_energy_cost,
      cardCostType || ""
    );
    setCardColor(color);
    setValue("im_energy_alignment", color);
  }, [
    form.im_energy_cost,
    cardCostType
  ]);

  // Determine color class 
  // based on color type and color
  useEffect(() => {
    const colorClass = determineColorClass(
      cardCostType || "",
      cardColor || ""
    );
    setCardColorClass(colorClass);
  }, [
    cardCostType,
    cardColor
  ]);

  // Determine card bg image 
  // based on card type and color
  const cardBgImage = useMemo(() => {

    return determineBgImage(
      form.im_type,
      cardColor || ""
    );
  }, [
    form.im_type, 
    cardColor
  ]);

  // On cardType change: Clear cardSubType
  useEffect(() => {
    if (
      form.im_sub_type && 
      form.im_sub_type.length > 0
    ) {
      setValue("im_sub_type", [""]);
    }
  }, [form.im_type]);

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
          ${
            cardMode === "initial" ? 
            cardBgImage : "bg-[url('/images/card-parts/card-frames/other/anomaly.jpg')]"
          }
        `}
      >
        {/* Card header */}
        <Box
          id="card-header"
          sx={{
            maxHeight: "56px",
            padding: "3px",
            border: "4px solid black",
            zIndex: 5,
          }}
          className={`
            ${cardMode === "intiial" ?
              colorMapping[
              cardColorClass as keyof typeof
              colorMapping]?.[50] :
              "bg-neutral-50" ??
              "bg-slate-50"
            }
            flex
            flex-col
            justify-between
            items-center
            w-full
            gap-1
          `}
        >
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
              {form?.im_type !== "undefined" &&
              form?.im_type !== "event" &&
              form.im_super_type === "mythic" && (
                <Image
                  src={Mythic}
                  height={14}
                  width={14}
                  alt="Mythic icon"
                />
              )}
              {/* Card name */}
              {!isSubmitted ? (
                cardMode === "anomaly" && 
                form.am_type && 
                !form.am_type
                  .toLowerCase()
                  .includes("uncommon") ? (
                  <Typography
                    variant="body2"
                    className="
                      text-black
                    "
                  >
                    Common Anomaly
                  </Typography>
                ) : (
                  <CustomInput
                    key={cardMode} 
                    name={
                      cardMode === "initial" ? 
                      "im_name" : "am_name"
                    }
                    placeholder={
                      cardMode === "initial" ? 
                      "Card name" : "Anomaly mode name"
                    }
                  />
                )
              ) : (
                cardMode === "initial" ? (
                  <Typography variant="body2">
                    {form.im_name}
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    {form.am_name}
                  </Typography>
                )
              )}
            </Box> 
            
            {/* Energy Cost Icons */}
            {cardMode === "initial" && (
            <Box
              id="energy-cost-container"
              className="
                flex
                flex-row
                justify-end
                items-center
              "
            >
              {form.im_type && (
                <ClickAwayListener
                  onClickAway={handleEnergyCostPopoverClose}
                >
                  <>
                    {!energyCostPopoverOpen &&(
                      <EnergyCostIcons
                        handleEnergyCostPopoverOpen={handleEnergyCostPopoverOpen}
                      />
                    )}
                    {!isSubmitting && 
                    !isSubmitted && (
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
            </Box>)}
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
              ${cardMode === "initial" ?
                colorMapping[
                cardColorClass as keyof typeof 
                colorMapping]?.[200] :
                "bg-neutral-200" ?? 
                "bg-slate-200"
              }
              flex
              flex-row
              justify-between
              items-center
              w-full
              gap-2
              text-black
            `}
          >
            {/* Initial Mode: Range Icon */}
            {form.im_type && 
              (
                form.im_type.includes("entity") || 
                form.im_type.includes("outpost")
              ) &&
              cardMode === "initial" && 
            (
              <Image
                src={
                  form.im_unit_range === "melee" ? 
                  RangeMelee : RangeRanged
                }
                width={15}
                height={15}
                alt={`${form.am_name} card art`}
              />
            )}
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
                  {form.im_type}
                </Typography>

                {form?.im_sub_type && (
                  <Typography
                    variant="body2"
                  >
                  {" "} – {form.im_sub_type.join(" ")}
                  </Typography>
                )}
              </Box>
            )}
            {/* INITIAL: Card types */}
            {!isSubmitting && cardMode === "initial" && (
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
                {/* Type */}
                <Controller
                  name="im_type"
                  control={control}
                  disabled={isSubmitting || isSubmitted}
                  render={({ field }) => (
                    <FormControl
                      className={clsx("flex-grow", {
                        "w-1/5": form.im_type === "entity",
                      })}
                    >
                      <Select
                        {...field}
                        label="Type"
                        renderValue={(selected) => (
                          typeof selected === "string" ? formatCardTypeName(selected) : ""
                        )}
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
                          field.onChange(selectedOption);

                          if (
                            form &&
                            form.im_type &&
                            (
                              form.im_type.includes("entity") || 
                              form.im_type.includes("outpost")
                            ) && 
                            !selectedOption.includes("entity") && 
                            !selectedOption.includes("outpost")
                          ) {
                            setValue("im_unit_attack", "0");
                            setValue("im_unit_defense", "0");
                            setValue("im_unit_range", "melee");
                            setValue("im_super_type", "default");
                          }

                          // Check if the selected option is "anomaly" and reset fields
                          if (selectedOption === "anomaly") {
                            const newEnergyCost = await resetFieldsOnAnomaly(form.im_energy_cost);
                            setValue("im_energy_cost", newEnergyCost);
                            setValue("im_energy_value", 0);
                            setValue("im_speed", "");
                            setValue("im_sub_type", [""]);
                            if (form.im_super_type !== "mythic") {
                              setValue("im_super_type", "");
                            }
                          }
                        }}
                      >
                        {Object.entries(cardTypeOptions)
                          .filter(([value]) => value !== "anomaly")
                          .map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                              <Typography variant="body2">
                                {label}
                              </Typography>
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  )}
                />

                {/* Sub type */}
                {form.im_type && (
                  form.im_type.includes("object") || 
                  form.im_type.includes("entity") || 
                  form.im_type.includes("effect")
                ) && (
                  <Controller
                    name="im_sub_type"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        className={clsx("flex-grow",
                          {
                            "w-3/5": form.im_type && (
                              form.im_type.includes("object") || 
                              form.im_type.includes("entity") || 
                              form.im_type.includes("effect")
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
                          {form.im_type && 
                          form.im_type.includes("entity") &&
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
                          {form.im_type && 
                          form.im_type.includes("object") &&
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
                          {form.im_type && 
                          form.im_type.includes("effect") &&
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
            {/* ANOMALY: Card types */}
            {!isSubmitting && cardMode === "anomaly" && (
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
                  gap-1
                "
              >
                {/* Type */}
                <Controller
                  name="am_type"
                  control={control}
                  disabled={isSubmitting || isSubmitted}
                  render={({ field }) => (
                    <FormControl
                      className="flex-grow"
                    >
                      <Select
                        {...field}
                        label="Anomaly Type"
                        renderValue={(selected) => (
                          typeof selected === "string" ? formatCardTypeName(selected) : ""
                        )}
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
                      >
                        {Object.entries(anomalyTypeOptions)
                          .map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                              <Typography variant="body2">
                                {label}
                              </Typography>
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            )}
            {/* Speed */}
            {form.im_type && 
            cardMode === "initial" && (
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
              height: "462px !important",
              padding: "3px",
              border: "3.75px solid black",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            className={`
              ${cardMode === "initial" ?
                colorMapping[
                cardColorClass as keyof typeof 
                colorMapping]?.[400] :
                "bg-neutral-400" ?? 
                "bg-slate-400"
              }
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
                height: "252px !important",
                border: "2px solid black",
              }}
              className="
                w-full
                overflow-hidden
                relative
              "
            >
              {cardMode === "initial" ? <Image
                src={form.im_art || "/images/card-parts/card-art/default-art.jpg"}
                fill={true}
                sizes="100%"
                alt={`${form.im_name} card art`}
                style={{
                  objectFit: "cover"
                }}
              /> : <Image
                src={"/images/card-parts/card-art/default-anomaly-art.webp"}
                fill={true}
                sizes="100%"
                alt={`${form.am_name} card art`}
                style={{
                  objectFit: "cover"
                }}
              />}
            </Box>
            {/* Card text and lore text */}
            <Box
              id="card-text-lore"
              sx={{
                maxWidth: "340px !important",
                height: "190px !important",
                border: "2px solid black",
                padding: "5px 7.5px",
              }}
              className={`
                ${
                  cardMode === "intiial" ? 
                  colorMapping[
                    cardColorClass as keyof typeof 
                    colorMapping
                  ]?.[50] : 
                  "bg-neutral-50" ?? 
                  "bg-slate-50"
                }
                flex
                flex-col
                text-black
                gap-1
              `}
            >
              {/* Card text */}
              {cardMode === "initial" && (
                <Controller
                  name="im_text"
                  control={control}
                  render={({ 
                    field, 
                    fieldState 
                  }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSetImText(e.target.value);
                      }}
                      multiline
                      size="small"
                      variant="standard"
                      rows={cardTextProps.textRows}
                      error={!!fieldState.error}
                      placeholder={
                        !fieldState.error ? "Your card's text...":
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
              )}

              {/* Anomaly Mode text */}
              {cardMode === "anomaly" && (
                <Controller
                  name="am_text"
                  control={control}
                  disabled={
                    !form.am_type?.toLowerCase().includes("uncommon") || 
                    isSubmitting || isSubmitted
                  }
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSetAmText(e.target.value);
                      }}
                      multiline
                      size="small"
                      variant="standard"
                      rows={cardTextProps.textRows}
                      error={!!fieldState.error}
                      placeholder={
                        !form.am_type?.toLowerCase().includes("uncommon") ? (
                          ("This transmutes into a Common Anomaly of that your choice (Radiance, Volatility, Corruption, Blaze, Verdancy).")
                        ) : (
                          (!fieldState.error ? "Your card's anomaly mode text..." : "Card text is required!")
                        )
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
              )}

              {/* Divider */}
              {cardTextProps.loreTextVisible && (
                cardMode === "initial" ? (
                  <Divider
                    className="
                      mx-4
                      my-0.5
                      opacity-25
                    "
                  />
                ) : (
                  form.am_type && 
                  form.am_type
                    .toLowerCase()
                    .includes("uncommon") ? (
                    <Divider
                      className="
                        mx-4
                        my-0.5
                        opacity-25
                      "
                    />
                  ) : (
                    null
                  )
                )
              )}
              
              {/* Card lore text */}
              {cardTextProps.loreTextVisible && cardMode === "initial" && (
                <Controller
                  name="im_lore_text"
                  control={control}
                  disabled={isSubmitting || isSubmitted}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSetImLoreText(e.target.value);
                      }}
                      multiline
                      size="small"
                      variant="standard"
                      placeholder="The greatest lore text you've ever read!"
                      rows={2}
                      className="w-full text-wrap"
                      inputProps={{
                        maxLength: cardTextProps.maxLoreTextChars,
                        style: {
                          fontSize: cardTextProps.fontSize,
                          lineHeight: cardTextProps.lineHeight,
                          height: cardTextProps.loreTextFieldHeight,
                          fontStyle: "italic",
                          fontWeight: 300,
                          wordWrap: "break-word",
                        },
                      }}
                      InputProps={{
                        startAdornment: 
                          <span
                            className={clsx("flex justify-start h-full italic mx-1 font-large", 
                              { 
                                "text-black/50": form.im_lore_text === "", 
                                "text-black": form.im_lore_text !== "", 
                              }
                            )}
                          >
                              &quot;
                          </span>,
                        endAdornment: 
                        <span
                          className={clsx("flex justify-start h-full italic mx-1 font-large", 
                            { 
                              "text-black/50": form.im_lore_text === "", 
                              "text-black": form.im_lore_text !== "", 
                            }
                          )}
                        >
                            &quot;
                        </span>,
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

              {/* Card Anamoly Mode lore text */}
              {cardTextProps.loreTextVisible && 
              cardMode === "anomaly" && 
              form.am_type && 
              form.am_type
                .toLowerCase()
                .includes("uncommon") && (
                <Controller
                  name="am_lore_text"
                  control={control}
                  disabled={isSubmitting || isSubmitted}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSetAmLoreText(e.target.value);
                      }}
                      multiline
                      size="small"
                      variant="standard"
                      placeholder="The greatest anomaly lore text you've ever read!"
                      rows={2}
                      className="w-full text-wrap"
                      inputProps={{
                        maxLength: cardTextProps.maxLoreTextChars,
                        style: {
                          fontSize: cardTextProps.fontSize,
                          lineHeight: cardTextProps.lineHeight,
                          height: cardTextProps.loreTextFieldHeight,
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
          className={clsx("flex flex-row items-center w-full",
            {
            "justify-between -mt-5": cardMode === "initial",
            "justify-center -mt-4": cardMode === "anomaly",
            }
          )}
        >
          {/* Card attack */}
          {form.im_type && (
            form.im_type.includes("entity") || 
            form.im_type.includes("outpost")
          ) && cardMode === "initial" && (
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
              name="im_unit_attack"
              control={control}
              disabled={isSubmitting || isSubmitted}
              render={({ field, fieldState }) => (
                <Tooltip
                  title="Unit attack"
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
            className={clsx(
              "flex flex-col justify-center items-center",
              form.im_type && !(
                form.im_type.includes("entity") || 
                form.im_type.includes("outpost")
              ) ? "w-full" : "w-3/5"
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
                message={cardMode === "initial" ? `Initial mode grade changed to ${form.im_grade}!` : `Anomaly mode grade changed to ${form.am_grade}!`}
              />
              {/* Initial Mode: Grade */}
              {cardMode === "initial" && (
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title={`
                    Change initial mode grade to
                    ${
                      form.im_grade === "rare" ?
                      "epic" : form.im_grade === "epic" ?
                      "prime" : form.im_grade === "prime" ?
                      "core" : "rare"
                    }`
                  }
                  placement="top"
                >
                  <>
                    <IconButton
                      aria-label="change grade"
                      disabled={isSubmitting || isSubmitted}
                      size="large"
                      onClick={handleGradeChange}
                    >
                      <Image
                        src={
                          form.im_grade === "core" ? GradeCore :
                          form.im_grade === "rare" ? GradeRare :
                          form.im_grade === "epic" ? GradeEpic :
                          form.im_grade === "prime" ? GradePrime :
                          null
                        }
                        height={34}
                        width={34}
                        alt={`${form.im_grade} icon`}
                        className="
                          bg-black
                          cursor-pointer
                          rounded-full
                          p-1.5
                        "
                      />
                    </IconButton>
                  </>
                </Tooltip>
              )}
              {/* Anomaly Mode: Grade */}
              {cardMode === "anomaly" && (
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title={`
                    Change anomaly mode grade to
                    ${
                      form.am_grade === "rare" ?
                      "epic" : form.am_grade === "epic" ?
                      "prime" : form.am_grade === "prime" ?
                      "core" : "rare"
                    }`
                  }
                  placement="top"
                >
                  <>
                    <IconButton
                      aria-label="change grade"
                      disabled={isSubmitting || isSubmitted}
                      size="large"
                      onClick={handleGradeChange}
                    >
                      <Image
                        src={
                          form.am_grade === "core" ? GradeCore :
                          form.am_grade === "rare" ? GradeRare :
                          form.am_grade === "epic" ? GradeEpic :
                          form.am_grade === "prime" ? GradePrime :
                          null
                        }
                        height={34}
                        width={34}
                        alt={`${form.am_grade} icon`}
                        className="
                          bg-black
                          cursor-pointer
                          rounded-full
                          p-1.5
                        "
                      />
                    </IconButton>
                  </>
                </Tooltip>
              )}
              
              {/* Card creator */}
              {cardMode === "initial" || 
              form.am_type !== undefined &&
              form.am_type
                .toLowerCase()
                .includes("uncommon") && (
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
                    {form.username
                      ? form.username
                      : "Card Creator"}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          {/* Card defense */}
          {form.im_type && (
            form.im_type
              .toLowerCase()
              .includes("entity") || 
            form.im_type
              .toLowerCase()
              .includes("outpost")
          ) && cardMode === "initial" && (
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
              name="im_unit_defense"
              control={control}
              disabled={isSubmitting || isSubmitted}
              render={({ field, fieldState }) => (
                <Tooltip
                  title="Unit defense"
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
  );
}