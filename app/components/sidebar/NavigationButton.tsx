"use client";

import React, { useEffect, useState } from "react";
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

  const routeLowerCase = route.toLowerCase();
  const routeName = routeLowerCase.charAt(0).toUpperCase() + route.slice(1);

  useEffect(() => {
    switch (routeLowerCase) {
      case "create":
        setIcon(<DesignServices />);
        break;
      case "cards":
        setIcon(<Collections />);
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
      variant="outlined"
      href={`/dashboard/${routeLowerCase}`}
      startIcon={icon}
      size="large"
      className="
        flex
        justify-start
        items-center
        w-full
        hover:cursor-pointer
      "
    >
      {routeName}
    </Button>
  );
}