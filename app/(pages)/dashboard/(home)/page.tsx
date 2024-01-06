"use client";

import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import { Box, Typography } from "@mui/material/";

export default function DashboardHome() {
    return (
        <Box className="flex flex-col w-full h-full gap-4 p-6 bg-gray-800 md:bg-gray-900">
            <Typography variant="h1">Dashboard</Typography>
            <NexusCardForm />
        </Box>
    );
};