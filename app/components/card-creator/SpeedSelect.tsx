"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import clsx from "clsx";

export default function SpeedSelect() {
    const { setValue, watch } = useFormContext();

    const currentCardSpeed = watch("cardSpeed");

    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    const handleSpeedChange = (newSpeed: string) => {
        setValue("cardSpeed", newSpeed);
    };

    const handleMouseEnter = (iconSpeed: string) => {
        setHoveredIcon(iconSpeed);
    };

    const handleMouseLeave = () => {
        setHoveredIcon(null);
    };

    function getOpacityClass(iconSpeed: string) {
        const isCurrent = currentCardSpeed >= iconSpeed;
        const isHovered = hoveredIcon && hoveredIcon >= iconSpeed && hoveredIcon > currentCardSpeed;
        const isDimmedOnHover = hoveredIcon && hoveredIcon < currentCardSpeed && currentCardSpeed > iconSpeed;

        if (isCurrent) {
            return "opacity-100";
        } else if (isHovered) {
            return "opacity-75 scale-125";
        } else if (isDimmedOnHover) {
            return "opacity-25";
        } else {
            return "opacity-25";
        }
    };

    return (
        <Box
            className="
                flex
                flex-row-reverse
                justify-start
                items-center
                gap-0.5
                m-0
            "
        >
            {["1", "2", "3"].map((iconSpeed) => (
                <IconButton
                    key={iconSpeed}
                    id={`card-speed-${iconSpeed}-button`}
                    aria-label={`speed ${iconSpeed}`}
                    size="small"
                    onClick={() => handleSpeedChange(iconSpeed)}
                    onMouseEnter={() => handleMouseEnter(iconSpeed)}
                    onMouseLeave={handleMouseLeave}
                    className="p-0"
                >
                    <Image
                        src={`/images/card-parts/card-icons/speed.png`}
                        width={14} // 17 base
                        height={20} // 25 base
                        alt={`Speed ${iconSpeed} icon`}
                        className={clsx(getOpacityClass(iconSpeed))}
                    />
                </IconButton>
            ))}
        </Box>
    );
}