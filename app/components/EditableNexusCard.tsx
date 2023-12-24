"use client";

import { useState } from "react";
import { Box, TextField, Typography, Select, FormControl, Divider, Input } from "@mui/material";
import { set } from "react-hook-form";
import clsx from "clsx";
import Image from "next/image";

const colors: { [key: string]: string } = {
    default: "#F5C518",
    yellow: "#F5C518",
    blue: "#3A8DE8",
    purple: "#A95EC4",
    red: "#E03E3E",
    green: "#1DB954",
    colorless: "#FFFFFF"
}

export default function EditableNexusCard() {
    
    const [cardColor, setCardColor] = useState("default");

    function handleColorChange(color: string) {
        setCardColor(color);
    }
    
    return (
        <Box
            id="card-border"
            className="flex flex-col p-5 md:p-6 rounded-2xl bg-black"
            sx={{
                aspectRatio: "635 / 889",
                width: "100%",
                maxWidth: "635px",
                maxHeight: "calc(889px * (100vw / 635px))"
            }}
        >
            <Box id="card-back" className={clsx("flex flex-col w-full h-full p-3 md:p-4 rounded-lg md:rounded-xl",
                cardColor === "default" && "bg-[#F5C518]",
                cardColor === "yellow" && "bg-[#F5C518]",
                cardColor === "blue" && "bg-[#3A8DE8]",
                cardColor === "purple" && "bg-[#A95EC4]",
                cardColor === "red" && "bg-[#E03E3E]",
                cardColor === "green" && "bg-[#1DB954]",
                cardColor === "colorless" && "bg-[#FFFFFF]",
                cardColor === "yellow_blue" && "bg-gradient-to-r from-[#3A8DE8] to-[#F5C518]"
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
                    <TextField
                        id="card-name-input"
                        variant="standard"
                        placeholder="My card name"
                        className="w-2/3"
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                    <Select
                        id="card-color-select"
                        value={cardColor}
                        variant={"standard"}
                        className="w-1/3"
                        input={<Input disableUnderline />}
                        onChange={(e) => handleColorChange(e.target.value)}
                    >
                        {Object.keys(colors).map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </Select>
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
                    <Box
                        className="flex flex-row w-4/5 gap-2"
                    >
                        <Select
                            id="card-type-super-select"
                            value={cardColor}
                            variant={"standard"}
                            className="w-full"
                            input={<Input disableUnderline />}
                            onChange={(e) => handleColorChange(e.target.value)}
                        >
                            {Object.keys(colors).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </Select>
                        <Select
                            id="card-type-select"
                            value={cardColor}
                            variant={"standard"}
                            className="w-full"
                            input={<Input disableUnderline />}
                            onChange={(e) => handleColorChange(e.target.value)}
                        >
                            {Object.keys(colors).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </Select>
                        <Select
                            id="card-type-sub-select"
                            value={cardColor}
                            variant={"standard"}
                            className="w-full"
                            input={<Input disableUnderline />}
                            onChange={(e) => handleColorChange(e.target.value)}
                        >
                            {Object.keys(colors).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Select
                        id="card-grade-select"
                        value={cardColor}
                        variant={"standard"}
                        className="w-1/5"
                        input={<Input disableUnderline />}
                        onChange={(e) => handleColorChange(e.target.value)}
                    >
                        {Object.keys(colors).map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </Select>
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
                    mr-2
                    -mt-8
                    px-1
                    rounded-tl-lg
                    bg-[#F5C518]
                    text-black
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