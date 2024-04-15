"use client";

import React, { 
  useState, 
  useEffect 
} from "react";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
// Utils
import clsx from "clsx";
// Icons
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

type MessageBannerProps = {
  message: string;
  type: "warning" | "info" | "error";
};

export default function MessageBanner({ 
  message,
  type,
}: MessageBannerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bannerStyle, setBannerStyle] = useState<{
    type: "warning" | "info" | "error";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  function closeBanner() {
    setOpen(false);
  }

  // Set the bannerStyle based on the type
  useEffect(() => {
    if (!bannerStyle) {
      switch (type) {
        case "warning":
          setBannerStyle({
            type: "warning",
            icon: <WarningIcon />,
            message: message
          });
          break;
        case "info":
          setBannerStyle({
            type: "info",
            icon: <InfoIcon />,
            message: message
          });
          break;
        case "error":
          setBannerStyle({
            type: "error",
            icon: <ErrorIcon />,
            message: message
          });
          break;
        default:
          null;
      };
      setOpen(true);
      setIsLoading(false);
    }
  }, [
    bannerStyle, 
    setBannerStyle,
    isLoading,
    setIsLoading,
  ]);

  return !isLoading ? (
    <Box
      id="create-form-warning"
      className={clsx("flex-row justify-start items-center w-full py-3 px-4 gap-4",
        {
          "hidden": !open,
          "flex": open,
          "bg-yellow-900/50 text-yellow-400/80": bannerStyle?.type === "warning",
          "bg-blue-900/50 text-blue-400/80": bannerStyle?.type === "info",
          "bg-red-900/50 text-red-400/80": bannerStyle?.type === "error",
        }
      )}
    >
      <WarningIcon
        fontSize="small"
        sx={{ width: "36px", height: "36px" }}
        className={clsx("rounded-full p-1",
          {
            "bg-yellow-600/50 text-yellow-200/80": bannerStyle?.type === "warning",
            "bg-blue-600/50 text-blue-200/80": bannerStyle?.type === "info",
            "bg-red-600/50 text-red-200/80": bannerStyle?.type === "error",
          }
        )}
      />
      <Typography
        variant="caption"
        className="
          w-full
          text-xs
        "
      >
        {message}
      </Typography>
      <IconButton
        size="small"
        onClick={closeBanner}
        aria-label="close"
        className={clsx(
          "rounded-full hover:opacity-80 hover:cursor-pointer bg-neutral-900 text-neutral-400",
          {
            "hover:bg-neutral-900 hover:text-yellow-400": bannerStyle?.type === "warning",
            "hover:bg-blue-900 hover:text-blue-400": bannerStyle?.type === "info",
            "hover:bg-red-900 hover:text-red-400": bannerStyle?.type === "error",
          }
        )}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  ) : (
    // Skeleton
    <Box
      className="
        flex
        flex-row
        justify-start
        items-center
        w-full
        bg-neutral-800/50
        rounded-md
        py-3
        px-4
        gap-4
      "
    >
      {/* Icon Skeleton */}
      <Skeleton
        variant="circular"
        width="36px"
        height="36px"
        animation="wave"
      />
      {/* Message Skeleton */}
      <Skeleton
        variant="text"
        width="100%"
        height="48px"
        animation="wave"
      />
    </Box>
  );
};