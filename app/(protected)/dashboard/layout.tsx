"use client";

import React from "react";
import SidebarDesktop from '@/app/components/sidebar/SidebarDesktop';
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
        md:bg-gray-950
        bg-gray-800
      "
    >
      <Box
        className="
          sticky
          top-0
          hidden
          lg:block
          w-1/5
          h-screen
        "
      >
        <SidebarDesktop />
      </Box>
      <Box
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          lg:w-4/5
          lg:mx-24
          md:mx-12
          lg:my-12
          md:my-6
        "
      >
        {children}
      </Box>
    </Box>
  )
};