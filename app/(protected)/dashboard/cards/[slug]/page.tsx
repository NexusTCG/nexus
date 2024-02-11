import React from "react";
import { Box } from "@mui/material"

export default function Card({ params }: { params: { slug: string } }) {
  return (
    <Box>
      My card: {params.slug}
    </Box>
  )
}