"use client";

import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import { Box, Typography } from "@mui/material/";
import readUserSession from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
    const {data} = await readUserSession();
	if (!data.session) {
		// If there is no session, redirect
		return redirect("/auth-server-action");
	}
    return (
        <Box className="flex flex-col w-full h-full gap-4 p-6 bg-gray-800 md:bg-gray-900">
            <Typography variant="h1">Dashboard</Typography>
            <NexusCardForm />
        </Box>
    );
};