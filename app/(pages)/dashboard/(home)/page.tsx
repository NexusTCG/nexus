import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import { Box, Typography } from "@mui/material/";

export default function DashboardHome() {
    return (
        <Box>
            <Typography variant="h1">Dashboard Home</Typography>
            <NexusCardForm />
        </Box>
    )
}