"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { Button } from "@mui/material";
import {
  AccountCircle,
  Collections,
  DesignServices,
  Rule,
  Casino,
  Flag,
  Payments,
  Help,
  Settings,
  SpeakerNotes,
  Login,
} from '@mui/icons-material';
import clsx from "clsx";

type NavigationButtonProps = {
  route: string;
  type: "sidebar" | "appbar";
};

export default function NavigationButton({
  route,
  type
}: NavigationButtonProps) {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [currentColor, setCurrentColor] = useState<"secondary" | "primary">("secondary");
  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  const routeLowerCase = route.toLowerCase();
  const routeName = routeLowerCase.charAt(0).toUpperCase() + route.slice(1);
  const currentPathname = usePathname();

  useEffect(() => {
    if (type === "sidebar") {
      setIsSidebar(true);
    } else {
      setIsSidebar(false);
    }
  }, [type])

  useEffect(() => {
    if (currentPathname.includes(routeLowerCase)) {
      setCurrentColor("primary");
    } else {
      setCurrentColor("secondary");
    }
  }, [currentPathname, routeLowerCase]);

  useEffect(() => {
    switch (routeLowerCase) {
      case "create":
        setIcon(<DesignServices />);
        setDisabled(false);
        break;
      case "cards":
        setIcon(<Collections />);
        setDisabled(false);
        break;
      case "rules":
        setIcon(<Rule />);
        setDisabled(false);
        break;
      case "game":
        setIcon(<Casino />);
        setDisabled(false);
        break;
      case "roadmap":
        setIcon(<Flag />);
        setDisabled(false);
        break;
      case "request":
        setIcon(<SpeakerNotes />);
        setDisabled(false);
        break;
      case "profile":
        setIcon(<AccountCircle />);
        setDisabled(false);
        break;
      case "settings":
        setIcon(<Settings />);
        break;
      case "subscription":
        setIcon(<Payments />);
        break;
      case "support":
        setIcon(<Help />);
        break;
      case "login":
        setIcon(<Login />);
        setDisabled(false);
        break;
      default:
        setIcon(null);
    }
  }, [route]);
  
  return (
    <>
      {isSidebar && (
        <Button
          id={`navigation-button-${routeLowerCase}`}
          disabled={disabled}
          variant="outlined"
          href={`/dashboard/${routeLowerCase}`}
          startIcon={icon}
          size="large"
          color={currentColor}
          className={clsx("flex justify-start items-center w-full hover:cursor-pointer hover:bg-teal-600/30 hover:text-white hover:border-teal-600",
            {
              "opacity-50": disabled,
            }
          )}
        >
          {routeName} {disabled ? "🚧" : ""}
        </Button>
      )}
      {!isSidebar && !disabled && (
        <Button
          id={`navigation-button-${routeLowerCase}`}
          variant="outlined"
          href={`/dashboard/${routeLowerCase}`}
          size="small"
          color={currentColor}
          className={clsx("flex justify-between items-center hover:cursor-pointer hover:bg-teal-600/30 hover:text-white hover:border-teal-600",
            {
              "opacity-50": disabled,
            }
          )}
        >
          {routeName}
        </Button>
      )}
    </>
  );
}