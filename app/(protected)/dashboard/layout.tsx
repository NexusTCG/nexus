"use client";

import React from "react";
import Sidebar from '@/app/components/sidebar/Sidebar';
import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <Box
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
      "
    >
      <Box
        className="
          sticky
          top-0
          hidden
          lg:block
          h-screen
        "
      >
        <Sidebar />
      </Box>
      <Box
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          lg:px-12
          md:px-8
          sm:px-4
        "
      >
        {children}
      </Box>
    </Box>
  )
};