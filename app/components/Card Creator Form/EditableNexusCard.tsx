"use client";

import React from "react";
import { Box, TextField, Select, FormControl, InputLabel, MenuItem, Input } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { CardFormData } from "../../types/types";
import Image from "next/image";
import clsx from "clsx";

type NexusCardProps = {
    nexusCardData: CardFormData;
    control: Control<CardFormData>;
};

const cardSuperTypeOptions = {
    type1: "Super Type 1",
    type2: "Super Type 2",
    // ... other super types
  };
  
  const cardTypeOptions = {
    type1: "Type 1",
    type2: "Type 2",
    // ... other types
  };
  
  const cardSubTypeOptions = {
    subtype1: "Sub Type 1",
    subtype2: "Sub Type 2",
    // ... other sub types
  };
  
  const cardGradeOptions = {
    grade1: "Grade 1",
    grade2: "Grade 2",
    // ... other grades
  };

export default function EditableNexusCard({ nexusCardData, control }: NexusCardProps) {
    const cardSuperTypeOptions = {
        // Define your super types here
    };
    const cardTypeOptions = {
        // Define your types here
    };
    const cardSubTypeOptions = {
        // Define your sub types here
    };
    const cardGradeOptions = {
        // Define your grades here
    };
    
    // Move to consts and import
    const colors = {
        default: '#F5C518',
        yellow: '#F5C518',
        blue: '#3A8DE8',
        purple: '#A95EC4',
        red: '#E03E3E',
        green: '#1DB954',
        colorless: '#FFFFFF',
    };

    function handleColorChange() {
        // Logic to handle color change
    };
    
    return (
        <Box
            id="card-border"
            className="flex flex-col justify-start items-center p-5 md:p-6 rounded-2xl bg-black"
            sx={{
                aspectRatio: "635 / 889",
                width: "100%",
                maxWidth: "635px",
                maxHeight: "calc(889px * (100vw / 635px))"
            }}
        >
            <Box id="card-back" className={clsx("flex flex-col w-full h-full p-3 md:p-4 rounded-lg md:rounded-xl",
                // cardColor === "default" && "bg-[#F5C518]",
                // cardColor === "yellow" && "bg-[#F5C518]",
                // cardColor === "blue" && "bg-[#3A8DE8]",
                // cardColor === "purple" && "bg-[#A95EC4]",
                // cardColor === "red" && "bg-[#E03E3E]",
                // cardColor === "green" && "bg-[#1DB954]",
                // cardColor === "colorless" && "bg-[#FFFFFF]",
                // cardColor === "yellow_blue" && "bg-gradient-to-r from-[#3A8DE8] to-[#F5C518]"
            )}>
                <Box
                    id="card-title"
                    className="
                        flex
                        flex-row
                        justify-between
                        items-center
                        w-full
                        gap-4
                        bg-gray-600
                        py-1
                        px-2
                            md:py-2
                            md:px-3
                        border-2
                        border-black
                        rounded-md
                            md:rounded-xl
                    "
                    sx={{
                        aspectRatio: "550 / 50",
                        width: "100%",
                        maxHeight: "calc(550 * (100vw / 50))"
                    }}
                >
                    <Controller
                        name="cardName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Card Name"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error ? fieldState.error.message : ""}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        )}
                    />
                    <Controller
                        name="cardColor"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel id="card-color-label">Card Color</InputLabel>
                                <Select
                                    {...field}
                                    labelId="card-color-label"
                                    id="card-color-select"
                                    label="Card Color"
                                    className="w-1/3"
                                    input={<Input disableUnderline />}
                                >
                                    {Object.entries(colors).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>
                <Box
                    id="card-image"
                    className="
                        flex
                        justify-center
                        items-center
                        w-full
                        overflow-hidden
                        relative
                        border-2
                        border-black
                        mx-2
                        "
                    sx={{
                        aspectRatio: "4 / 3",
                        maxWidth: "540px",
                        maxHeight: "calc(350px * (100vw / 540px))"
                    }}
                >
                    <Image
                        src="/images/card-art/cache-reclaimer.jpg"
                        fill={true}
                        alt="Card name"
                        style={{ objectFit: "cover" }}
                    />
                </Box>
                <Box
                    id="card-title"
                    className="
                        flex
                        flex-row
                        w-full
                        justify-between
                        items-center
                        gap-4
                        bg-gray-600
                        py-1
                        px-2
                        md:py-2
                        md:px-3
                        border-2
                        border-black
                        rounded-md
                        md:rounded-xl
                    "
                    sx={{
                        aspectRatio: "550 / 50",
                        width: "100%",
                        maxHeight: "calc(550 * (100vw / 50))"
                    }}
                >
                    <Box id="card-types" className="flex flex-row w-full">
                        <Controller
                            name="cardSuperType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Super Type</InputLabel>
                                    <Select {...field} label="Super Type">
                                        {Object.entries(cardSuperTypeOptions).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>{label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="cardType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select {...field} label="Type">
                                        {Object.entries(cardTypeOptions).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>{label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="cardSubType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Sub Type</InputLabel>
                                    <Select {...field} label="Sub Type">
                                        {Object.entries(cardSubTypeOptions).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>{label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>
                    <Controller
                        name="cardGrade"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel>Grade</InputLabel>
                                <Select {...field} label="Grade">
                                    {Object.entries(cardGradeOptions).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>
                <Box className="
                    flex
                    flex-col
                    p-2
                    bg-gray-600
                    text-black
                    border-2
                    border-black
                    mx-2
                    "
                    sx={{
                        aspectRatio: "540 / 275",
                        width: "100%",
                        maxHeight: "calc(540 * (100vw / 275))"
                    }}
                >
                    <TextField
                        multiline
                        id="card-text-input"
                        variant="standard"
                        placeholder='Type "/" to insert a keyword ability.'
                        className="w-full"
                        rows={4}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                    <Box className="bg-black h-[1px] w-full my-4" />
                    <TextField
                        id="card-flavor-input"
                        variant="standard"
                        placeholder="Flavor text"
                        className="w-full"
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </Box>
                <Box className="
                    flex
                    flex-row
                    justify-center
                    items-center
                    ml-auto
                    mr-0
                    pr-2
                    -mt-8
                    px-1
                    rounded-tl-lg
                    text-black
                    "
                    sx={{
                        zIndex: 1,
                        backgroundColor: "#F5C518",
                    }}
                >
                    <Select
                        id="card-attack-select"
                        variant={"standard"}
                        className="w-1/2"
                        input={<Input disableUnderline />}
                    >
                        <option key={0} value="0">0</option>
                        <option key={1} value="1">1</option>
                        <option key={2} value="2">2</option>
                        <option key={3} value="3">3</option>
                        <option key={4} value="4">4</option>
                    </Select>
                    /
                    <Select
                        id="card-defense-select"
                        variant={"standard"}
                        className="w-1/2"
                        input={<Input disableUnderline />}
                    >
                        <option key={0} value="0">0</option>
                        <option key={1} value="1">1</option>
                        <option key={2} value="2">2</option>
                        <option key={3} value="3">3</option>
                        <option key={4} value="4">4</option>
                    </Select>
                </Box>
            </Box>
        </Box>
    )
}