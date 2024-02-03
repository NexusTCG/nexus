import * as React from "react";
import { Box, Typography, Divider } from "@mui/material";
import useSession from "@/app/hooks/useSession";
import SignOutButton from "@/app/components/auth/SignOutButton";

export default function SidebarDesktop() {

  const user = useSession()?.user;

  return (
    <Box
      className="
            flex
            flex-col
            justify-between
            items-center
            px-4
            pt-4
            pb-6
            gap-4
            w-[15%]
            min-w-[240px]
            h-[100vh]
            bg-gray-900
            border-r
            border-gray-800
            top-0
        "
    >
      <Box
        className="
                flex
                flex-col
                justify-between
                items-center
                gap-4
                w-full
            "
      >
        <Typography
          variant="body1"
          className="
                    text-center
                    w-full
                    bg-gray-800
                    py-4
                    rounded
                "
        >
          Logo Placeholder
        </Typography>
        <Typography
          variant="body1"
          className="
                    text-center
                    w-full
                "
        >
          GitHub Logo
        </Typography>
        <Typography
          variant="body1"
          className="
                    text-center
                    w-full
                "
        >
          Discord Logo
        </Typography>
        <Typography
          variant="body1"
          className="
                    text-center
                    w-full
                "
        >
          Reddit Logo
        </Typography>
        <Typography
          variant="body1"
          className="
                    text-center
                    w-full
                "
        >
          Twitter Logo
        </Typography>
        <Typography
          variant="body1"
          className="
                    text-center
                    w-full
                "
        >
          LinkedIn Logo
        </Typography>
      </Box>
      <Box
        className="
                flex
                flex-col
                justify-between
                items-center
                gap-6
                w-full
            "
      >
        <Box
          className="
                    flex
                    flex-col
                    justify-between
                    items-center
                    gap-4
                    w-full
                "
        >
          <Typography
            variant="body1"
            className="
                        text-center
                        w-full
                        bg-gray-800
                        py-3
                        rounded
                        hover:bg-gray-700
                    "
          >
            Gallery Placeholder
          </Typography>
          <Typography
            variant="body1"
            className="
                        text-center
                        w-full
                        bg-gray-800
                        py-3
                        rounded
                        hover:bg-gray-700
                    "
          >
            Rules Placeholder
          </Typography>
          <Typography
            variant="body1"
            className="
                        text-center
                        w-full
                        bg-gray-800
                        py-3
                        rounded
                        hover:bg-gray-700
                    "
          >
            Settings Placeholder
          </Typography>
        </Box>
        <Divider />
        <Typography>
          {user?.email}
        </Typography>
        <SignOutButton />
      </Box>
    </Box>
  );
}
