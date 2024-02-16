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
  Settings
} from '@mui/icons-material';

type NavigationButtonProps = {
  route: string;
};

export default function NavigationButton({ route }: NavigationButtonProps) {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [currentColor, setCurrentColor] = useState<"secondary" | "primary">("secondary");

  const routeLowerCase = route.toLowerCase();
  const routeName = routeLowerCase.charAt(0).toUpperCase() + route.slice(1);
  const currentPathname = usePathname();

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
        break;
      case "game":
        setIcon(<Casino />);
        break;
      case "roadmap":
        setIcon(<Flag />);
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
      default:
        setIcon(null);
    }
  }, [route]);
  
  return (
    <Button
      id={`navigation-button-${routeLowerCase}`}
      disabled={disabled}
      variant="outlined"
      href={`/dashboard/${routeLowerCase}`}
      startIcon={icon}
      size="large"
      color={currentColor}
      className="
        flex
        justify-start
        items-center
        w-full
        hover:cursor-pointer
        hover:bg-teal-600/30
        hover:text-white
        hover:border-teal-600
      "
    >
      {routeName} {disabled ? "🚧" : ""}
    </Button>
  );
}