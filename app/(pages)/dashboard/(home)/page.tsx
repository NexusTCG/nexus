"use client";

import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import { Box, Typography } from "@mui/material/";

export default function DashboardHome() {
    return (
        <Box className="w-full h-full p-6 bg-gray-800 md:bg-gray-900">
            <Typography variant="h1">Dashboard</Typography>
            <NexusCardForm />
        </Box>
    );
};