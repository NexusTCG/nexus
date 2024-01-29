"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Popover, Box, Typography } from "@mui/material";
import Image from "next/image";

type GradePopoverProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

export default function GradePopover({
  anchorEl,
  handleClose,
}: GradePopoverProps) {
  const { setValue } = useFormContext();
  const open = Boolean(anchorEl);
  const id = open ? "grade-popover" : undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleGradeChange(grade: string) {
    setValue("cardGrade", grade);
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Box
        className="
                flex
                flex-col
                justify-start
                items-center
                w-[480]
                gap-4
                p-4
                rounded-lg
                bg-gray-800
                border
                border-gray-700
                shadow-lg
            "
      >
        <Typography variant="subtitle1" className="font-semibold">
          Select grade
        </Typography>
        <Box
          className="
                        flex
                        flex-row
                        justify-between
                "
        >
          <Image
            src={`/images/card-parts/card-icons/card-grades/grade-common.png`}
            width={34}
            height={34}
            alt="common"
            className="
                            opacity-50
                            hover:opacity-100
                            cursor-pointer
                    "
          />
          <Image
            src={`/images/card-parts/card-icons/card-grades/grade-rare.png`}
            width={34}
            height={34}
            alt="rare"
            className="
                            opacity-50
                            hover:opacity-100
                            cursor-pointer
                    "
          />
          <Image
            src={`/images/card-parts/card-icons/card-grades/grade-epic.png`}
            width={34}
            height={34}
            alt="epic"
            className="
                            opacity-50
                            hover:opacity-100
                            cursor-pointer
                    "
          />
          <Image
            src={`/images/card-parts/card-icons/card-grades/grade-prime.png`}
            width={34}
            height={34}
            alt="prime"
            className="
                            opacity-50
                            hover:opacity-100
                            cursor-pointer
                    "
          />
        </Box>
      </Box>
    </Popover>
  );
}
