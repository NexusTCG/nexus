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

    function findDualColorKey(colors: string[] | null, dualColorOptions: DualColorOptions): string | null {
        let foundKey: string | null = null;
        Object.keys(dualColorOptions).forEach(key => {
            // Check if both colors are in the key
            if (colors && colors.every(color => key.includes(color))) {
                foundKey = key;
                return;
            };
        });
        return foundKey;
    };

    useEffect(() => {
        if (cardCost) {
            let colorsWithCost = Object.entries(cardCost)
                .filter(([color, value]) => value > 0 && (color !== monoColorOptions.void || Object.keys(cardCost).length === 1))
                .map(([color]) => color);
            if (colorsWithCost.length === 0) {
                setActiveCardColors(monoColorOptions.void);
            } else if (colorsWithCost.length === 1) {
                setActiveCardColors(monoColorOptions[colorsWithCost[0] as keyof typeof monoColorOptions]);
            } else if (colorsWithCost.length === 2) {
                const dualKey = findDualColorKey(colorsWithCost, dualColorOptions);
                setActiveCardColors(dualColorOptions[dualKey as keyof typeof dualColorOptions]);
            } else {
                setActiveCardColors(multiColor);
            };
        };
    }, [cardCost]);

    // Set card
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
                <Box
                    id="card-header"
                    sx={{
                        aspectRatio: "55 / 5"
                    }}
                    className={`
                        ${monoColorClass[`${cardColorClass}`]["500"]}
                        flex
                        flex-row
                        justify-between
                        items-center
                        w-full
                        gap-2
                        py-1
                        px-2
                        border-2
                        border-black
                        rounded-md`
                }>

                </Box>

            </Box>
        </Box>
    );
};