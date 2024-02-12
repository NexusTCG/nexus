"use client";

import React, { useEffect, useContext } from "react";
import { DashboardContext } from "@/app/context/DashboardContext";
import CardCreatorForm from "@/app/components/card-creator/CardCreatorForm";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

export default function Create() {
  const [placeholderFormValidation, setPlaceholderFormValidation] = React.useState<boolean>(false);
  const { userProfileData } = useContext(DashboardContext);

  useEffect(() => {
    if (!placeholderFormValidation) {
      setPlaceholderFormValidation(true);
    }
  }, [placeholderFormValidation]);

  // TODO: Move state 

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
          lg:pr-12
          md:pr-8
          sm:pr-4
          px-6
          py-4
          bg-neutral-800
          border-b
        border-neutral-700
          top-0
          sticky
          z-10
        "
      >
        <Box
          id="create-header-content"
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
            gap-8
          "
        >
          {/* Card Name + Creator */}
          <Box
            id="card-name-creator-container"
            className="
              flex
              flex-row
              justify-between
              items-baseline
              gap-2
            "
          >
            {/* Card Name */}
            <Typography
              variant="h4"
              className="
                font-medium
              "
            >
              Card name {/* Conditionally change name */}
            </Typography>
            {/* Card Creator*/}
            <Typography
              variant="overline"
              className="text-emerald-400"
            >
              <Typography
                variant="overline"
                className="text-neutral-400"
                component="span"
              >
                by{" "}
              </Typography>
              {userProfileData?.username
                ? userProfileData?.username
                : "Card creator"}
            </Typography>
          </Box>
          {/* Save button */}
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            size="large"
          >
            Save card
          </Button>
        </Box>
      </Box>
      <Box
        id="create-form-container"
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
