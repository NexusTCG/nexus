"use client";

import React from "react";
import { Box, TextField, Select, FormControl, InputLabel, MenuItem, Input } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { CardData, CardType } from "../../types/types";
import Image from "next/image";
import clsx from "clsx";

// DATA IMPORTS
import { cardTypes } from "../../constants/cardTypes";

const cardTypeOptions: Record<number, string> = cardTypes.reduce((acc: Record<number, string>, type: CardType) => {
    acc[type.id] = type.name;
    return acc;
  }, {});

type NexusCardProps = {
    control: Control<CardData>;
    cardData: CardData;
};

export default function EditableNexusCard({ cardData, control }: NexusCardProps) {

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
                    {/* <Controller
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
                    /> */}
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
                        {/* <Controller
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
                        /> */}
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
                        {/* <Controller
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
                        /> */}
                    </Box>
                    {/* <Controller
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
                    /> */}
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
                    {/* <Box className="bg-black h-[1px] w-full my-4" /> */}
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
                    </Select>
                </Box>
            </Box>
        </Box>
    )
}