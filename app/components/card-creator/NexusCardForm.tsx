"use client";

import React, { useState, useEffect} from "react";
import { Controller, Control } from "react-hook-form";
import { monoColorClass } from "@/app/utils/data/cardColorClasses";
import {
    monoColorOptions,
    dualColorOptions,
    multiColor
} from "@/app/utils/data/cardColorOptions";
import {
    CardData,
    CardType,
    CardCost,
    DualColorOptions
} from "@/app/utils/types/types";
import {
    Box,
    FormControl,
    Typography,
    TextField,
    Input,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material/";
import {
    cardSuperTypeOptions,
    cardTypeOptions,
    cardSubTypeOptions,
    cardGradeOptions,
    cardStatsOptions
} from "@/app/utils/data/cardCreatorOptions";
import Image from "next/image";
import clsx from "clsx";

type NexusCardFormProps = {
    control: Control<CardData>;
    watch: (name: string) => any;
    formCardData: CardData;
};

export default function NexusCardForm({
    control,
    watch,
    formCardData
}: NexusCardFormProps) {
    const cardType: CardType = watch("cardType");
    const cardCost: CardCost = watch("cardCost");
    const [activeCardColors, setActiveCardColors] = useState<string | null>(null);
    const [cardColorClass, setCardColorClass] = useState<string | null>(null);
    const [cardColorBgImage, setCardColorBgImage] = useState<string | null>(null);

    // Find dual color key that matches active colors
    // if active colors is equal to two colors
    function findDualColorKey(
        colors: string[] | null,
        dualColorOptions: DualColorOptions
    ): string | null {
        let foundKey: string | null = null;
        Object.keys(dualColorOptions).forEach(key => {
            // Check if both colors are in the dual color options key
            if (colors && colors.every(color => key
                .toLowerCase()
                .includes(color)
            )) {
                foundKey = key;
                return;
            };
        });
        return foundKey;
    };

    // Set active card colors
    useEffect(() => {
        if (cardCost) {
            let colorsWithCost = Object.entries(cardCost)
                .filter(([color, value]) => value > 0 && (
                    color !== monoColorOptions.void ||
                    Object.keys(cardCost).length === 1
                )).map(([color]) => color);

            if (colorsWithCost.length === 0) {
                setActiveCardColors(monoColorOptions.void);

            } else if (colorsWithCost.length === 1) {
                setActiveCardColors(monoColorOptions[
                    colorsWithCost[0] as keyof typeof monoColorOptions
                ]);

            } else if (colorsWithCost.length === 2) {
                // Compare colors with dual color options
                const dualKey = findDualColorKey(colorsWithCost, dualColorOptions);
                setActiveCardColors(dualColorOptions[
                    dualKey as keyof typeof dualColorOptions
                ]);

            } else {
                setActiveCardColors(multiColor);
            };
        };
    }, [cardCost]);

    // Set card color class and bg image
    // based on active card colors
    useEffect(() => {
        if (activeCardColors && monoColorClass[`${activeCardColors}`]) {
            setCardColorClass(activeCardColors);
            setCardColorBgImage(activeCardColors);
        };
    });

    return (
        <Box
            id="card-border"
            sx={{
                aspectRatio: "2.5 / 3.5",
                maxWidth: "400px",
            }}
            className="
                flex
                flex-col
                justify-stary
                items-center
                p-5
                rounded-2xl
                bg-black
        ">
            {/* Card frame */}
            <Box
                id="card-frame"
                sx={{
                    backgroundImage: `/images/card-frames/${cardColorBgImage}-frame.png`
                }}
                className="
                    flex
                    flex-col
                    w-full
                    h-full
                    p-2
                    rounded-lg
            ">
                {/* Card header */}
                <Box
                    id="card-header"
                    sx={{
                        aspectRatio: "55 / 5"
                    }}
                    className={`
                        ${monoColorClass[`${cardColorClass}`]["500"]}
                        flex
                        flex-col
                        w-full
                        gap-1
                        py-1
                        px-2
                        border-2
                        border-black
                        rounded-md`
                }>
                    {/* Card name and cost */}
                    <Box
                        id="card-header-name-cost"
                        className={`
                            ${monoColorClass[`${cardColorClass}`]["500"]}
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
                            rounded-md`
                    }>
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
                                        fieldState.error ? 
                                        fieldState.error.message : null
                                    }
                                    // inputProps={{ disableUnderline: true }}
                                    // Caused error
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
                                    placeholder="Card cost"
                                    className="w-1/4"
                                    error={!!fieldState.error}
                                    helperText={
                                        fieldState.error ? 
                                        fieldState.error.message : null
                                    }
                                    // inputProps={{ disableUnderline: true }}
                                    // Caused error
                                />
                            )}
                        />
                    </Box>
                    {/* Card types and speed */}
                    <Box
                        id="card-header-types-speed"
                        className={`
                            ${monoColorClass[`${cardColorClass}`]["500"]}
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
                            rounded-md`
                    }>
                        {/* Super type */}
                        <Box
                            id="card-header-types"
                            className="
                                flex
                                flex-row
                                w-full
                        ">
                        {["object", "entity", "effect", "node"].includes(cardType.toString()) && (
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
                        {["object", "entity", "effect"].includes(cardType.toString()) && (
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
                                            {cardType.toString() === "entity" && 
                                                Object.entries(
                                                    cardSubTypeOptions.entity
                                                ).map(([value, label]) => (
                                                    <MenuItem key={value} value={value}>
                                                        <Typography variant="body2">
                                                            {label}
                                                        </Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                            {cardType.toString() === "object" && 
                                                Object.entries(
                                                    cardSubTypeOptions.machine
                                                ).map(([value, label]) => (
                                                    <MenuItem key={value} value={value}>
                                                        <Typography variant="body2">
                                                            {label}
                                                        </Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                            {cardType.toString() === "effect" && 
                                                Object.entries(
                                                    cardSubTypeOptions.enhancement
                                                ).map(([value, label]) => (
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
                        )}
                    </Box>
                        {/* Select: Speed */}
                    </Box>
                </Box>
                {/* Card image */}
            </Box>
        </Box>
    );
};