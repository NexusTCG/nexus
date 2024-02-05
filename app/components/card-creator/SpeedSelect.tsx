"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, IconButton, Snackbar, Tooltip, Fade } from "@mui/material";
import Image from "next/image";
import clsx from "clsx";

export default function SpeedSelect() {
    const { setValue, watch } = useFormContext();

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const currentCardSpeed = watch("cardSpeed");

    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    const handleSpeedChange = (newSpeed: string) => {
        setValue("cardSpeed", newSpeed);
        setOpenSnackbar(true);
    };

    const handleMouseEnter = (iconSpeed: string) => {
        setHoveredIcon(iconSpeed);
    };

    const handleMouseLeave = () => {
        setHoveredIcon(null);
    };

    function handleCloseSnackbar(
        event: React.SyntheticEvent |
        Event, reason?: string
      ) {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
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
                h-full
                gap-0.5
                m-0
            "
        >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={`
                    Speed changed to ${currentCardSpeed}!
                `}
            />
            {["1", "2", "3"].map((iconSpeed) => (
                <Tooltip
                    key={iconSpeed}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title={`Change speed to ${iconSpeed}`}
                    placement="top"
                >
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
                            width={11}
                            height={16}
                            alt={`Speed ${iconSpeed} icon`}
                            className={clsx(getOpacityClass(iconSpeed))}
                        />
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
}