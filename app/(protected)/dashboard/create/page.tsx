"use client";

import React, { useEffect, useContext } from "react";
import { DashboardContext } from "@/app/context/DashboardContext";
import CardCreatorForm from "@/app/components/card-creator/CardCreatorForm";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";

export default function Create() {
  const [placeholderFormValidation, setPlaceholderFormValidation] = React.useState<boolean>(false);
  const { userProfileData } = useContext(DashboardContext);

  useEffect(() => {
    if (!placeholderFormValidation) {
      setPlaceholderFormValidation(true);
    }
  }, []);

  return (
    <Box
      className="
        flex
        flex-col
        justify-start
        items-center
        w-full
        gap-4
      "
    >
      <Box
        className="
          w-full
          h-full
          flex
          flex-col
          justify-between
          items-center
          gap-4
          lg:pl-12
          md:pl-8
          sm:pl-4
          lg:pr-8
          md:pr-4
          sm:pr-2
          pt-4
          pb-2
          bg-neutral-800
          border-b
        border-neutral-700
          top-0
          sticky
          z-10
        "
      >
        <Box
          id="cards-header-content"
          className="
            w-full
            flex
            flex-row
            justify-between
            gap-4
          "
        >
          <Typography
            variant="h4"
            className="
              font-medium
            "
          >
            Create card by ${userProfileData?.username}
          </Typography>
          <Button
            variant="outlined"
            size="small"
          >
            Submit Card
          </Button>
        </Box>
      </Box>
      <Box
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          lg:px-12
          md:px-8
          sm:px-6
          lg:mb-12
          mb-8
          mt-4
        "
      >
        <CardCreatorForm />
      </Box>
    </Box>
  );
}
