"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextField, Box, FormControl, InputLabel, MenuItem, Select, Typography, Input } from "@mui/material";
import { CardData } from "@/app/utils/types/types";
import { cardSuperTypeOptions, cardTypeOptions, cardSubTypeOptions, cardGradeOptions, cardStatsOptions } from "@/app/utils/data/cardCreatorOptions";
import Image from "next/image";
import clsx from "clsx";

type NexusCardProps = {
    control: Control<CardData>;
    watch: (name: string) => any;
    formCardData: CardData;
};

export default function NexusCard({ control, watch, formCardData }: NexusCardProps) {
    console.log(`formCardData: ${formCardData}`);
    const cardType = watch("cardType");

    // handlerFunctions
    // Function to handle card color change based on card cost

    return (
        <Box
            id="card-border"
            className="flex flex-col justify-start items-center p-5 rounded-2xl bg-black"
            sx={{
                aspectRatio: "635 / 889",
                width: "400px",
                // maxHeight: "calc(889px * (100vw / 635px))"
            }}
        >
            <Box
                id="card-frame"
                className={clsx("flex flex-col w-full h-full p-2 rounded-lg",
                    // cardColor === "default" && "bg-[#F5C518]",
                    // cardColor === "yellow" && "bg-[#F5C518]",
                    "bg-yellow-200"
                )}
            >
                <Box
                    id="card-name-cost"
                    className="
                        flex
                        flex-row
                        justify-between
                        items-center
                        w-full
                        gap-2
                        bg-gray-600
                        py-1
                        px-2
                        border-2
                        border-black
                        rounded-md
                    "
                    sx={{
                        aspectRatio: "550 / 50",
                    }}
                >
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
                                // helperText={fieldState.error ? fieldState.error.message : "Card name is required!"}
                                fullWidth
                                // InputProps={{ disableUnderline: true }} caused error
                            />
                        )}
                    />
                    <Controller
                        name="cardCost"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                size="small"
                                placeholder="0"
                                className="w-1/4"
                                error={!!fieldState.error}
                                // helperText={fieldState.error ? fieldState.error.message : "Card cost is required!"}
                                fullWidth
                                // InputProps={{ disableUnderline: true }} caused error
                            />
                        )}
                    />
                </Box>
                <Box
                    id="card-image"
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
                    sx={{
                        aspectRatio: "4 / 3",
                    }}
                >
                    <Image
                        src="/images/card-art/cache-reclaimer.jpg"
                        fill={true}
                        alt="Card name"
                        className="w-full h-full"
                        style={{ objectFit: "cover" }}
                    />
                </Box>
                <Box
                    id="card-types-grade"
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
                        border-2
                        border-black
                        rounded-md
                    "
                    sx={{
                        aspectRatio: "550 / 50",
                    }}
                >
                    <Box id="card-types" className="flex flex-row w-full">
                        {/* Super Type */}
                        {["machine", "entity", "enhancement", "source"].includes(cardType) && (
                        <Controller
                            name="cardSuperType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Super Type</InputLabel>
                                    <Select
                                        {...field}
                                        label="Super Type"
                                        size="small"
                                        className="w-full"
                                    >
                                        {Object.entries(cardSuperTypeOptions).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>
                                                <Typography variant="body2">{label}</Typography>
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
                        {["machine", "entity", "enhancement"].includes(cardType) && (
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
                                        label="Sub Type"
                                        size="small"
                                        // renderValue={(selected) => selected.join(' ')}
                                    >
                                            {cardType === "entity" && 
                                                Object.entries(cardSubTypeOptions.entity).map(([value, label]) => (
                                                    <MenuItem key={value} value={value}>
                                                        <Typography variant="body2">{label}</Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                            {cardType === "machine" && 
                                                Object.entries(cardSubTypeOptions.machine).map(([value, label]) => (
                                                    <MenuItem key={value} value={value}>
                                                        <Typography variant="body2">{label}</Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                            {cardType === "enhancement" && 
                                                Object.entries(cardSubTypeOptions.enhancement).map(([value, label]) => (
                                                    <MenuItem key={value} value={value}>
                                                        <Typography variant="body2">{label}</Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        )}
                    </Box>
                    <Box id="card-grade" className="flex w-1/5">
                        <Controller
                            name="cardGrade"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>Grade</InputLabel>
                                    <Select {...field} label="Grade" size="small">
                                        {Object.entries(cardGradeOptions).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>
                                                {/* Map through icons instead */}
                                                <Typography variant="body2">{label}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>
                </Box>
                <Box
                    id="card-text-flavor"
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
                    sx={{
                        aspectRatio: "540 / 275",
                    }}
                >
                    <TextField
                        multiline
                        id="card-text-input"
                        size="small"
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
                        size="small"
                        variant="standard"
                        placeholder="Flavor text"
                        className="w-full"
                        rows={2}
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
                    bg-yellow-200
                    "
                    sx={{
                        zIndex: 1,
                    }}
                >
                    <Select
                        id="card-attack-select"
                        variant={"standard"}
                        className="w-1/2"
                        input={<Input disableUnderline />}
                    >
                        {Object.entries(cardStatsOptions).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                                <Typography variant="body2">{label}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                    /
                    <Select
                        id="card-defense-select"
                        variant={"standard"}
                        className="w-1/2"
                        input={<Input disableUnderline />}
                    >
                        {Object.entries(cardStatsOptions).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                                <Typography variant="body2">{label}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
        </Box>
    )
}