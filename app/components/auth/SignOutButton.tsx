"use client";

import { useState } from "react";
import { Button } from "@mui/material";

export default function SignOutButton() {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    const handleSignOut = async () => {
        setButtonDisabled(!buttonDisabled);
        const response = await fetch(
            `${window.location.origin}/auth/logout`,
            { method: "POST" }
        );

        if (response.ok) {
            window.location.href = '/login';
        } else {
            console.log("Logout failed.");
        }
        setButtonDisabled(!buttonDisabled);
    };

    return (
        <Button
            onClick={handleSignOut}
            variant="outlined"
            size="large"
            color={buttonDisabled ? "warning" : "primary"}
            disabled={buttonDisabled}
        >
            {buttonDisabled ? "Logging out.." : "Log out"}
        </Button>
    )
}