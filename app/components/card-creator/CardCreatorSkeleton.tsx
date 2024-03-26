"use client";

import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function CardCreatorSkeleton() {
  return (
    <Box className="flex flex-col w-full h-full">
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", height: 60 }}
      />
      <Box className="flex flex-col w-full p-8 gap-4">
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", height: 60 }}
          className="rounded-md"
        />
        <Box className="flex flex-row w-full gap-8">
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "100%", height: 660 }}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "100%", height: 660 }}
            className="rounded-md"
          />
        </Box>
      </Box>
    </Box>
  )
}