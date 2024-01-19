import { Box, Typography } from "@mui/material/";
import { redirect } from "next/navigation";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import readUserSession from "@/app/lib/actions/readSession";

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

// Something is broken here. Getting this error:
//  ⨯ Internal error: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.