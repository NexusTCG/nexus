"use client";

import SidebarDesktop from '@/app/components/sidebar/SidebarDesktop';
import useSession from "@/app/hooks/useSession";
import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useSession()?.user;
  
  return (
    <Box className="flex flex-row justify-start items-start w-full">
      <SidebarDesktop />
      <Box className="flex flex-col justify-center items-center w-full mx-0 md:mx-12 my-12">
        {children}
      </Box>
    </Box>
  )
}