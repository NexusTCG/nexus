"use client";

import SidebarDesktop from "@/app/components/sidebar/SidebarDesktop";
import useSession from "@/app/hooks/useSession";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession()?.user;

  return (
    <Box
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        gap-6
      "
    >
      <Box
        className="
          hidden
          md:block 
          w-1/5
          h-screen
        "
      >
        <SidebarDesktop />
      </Box>
      <Box className="flex flex-col justify-center items-center w-full p-6 mx-0 md:mx-12 my-12 bg-gray-900">
        {children}
      </Box>
    </Box>
  );
}
