"use client";

// Hooks
import React, { 
  useEffect, 
  useState 
} from "react";
import { usePathname } from 'next/navigation';
// Utils
import Link from "next/link";
import clsx from "clsx";
// Components
import { Button } from "@mui/material";
// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import RuleIcon from '@mui/icons-material/Rule';
// import CasinoIcon from '@mui/icons-material/Casino';
// import FlagIcon from '@mui/icons-material/Flag';
import PaymentsIcon from '@mui/icons-material/Payments';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import LoginIcon from '@mui/icons-material/Login';
import PaidIcon from '@mui/icons-material/Paid';

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
  const [externalLink, setExternalLink] = useState<string>("");

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

  // If
  useEffect(() => {
    if(routeLowerCase !== "") {
      switch (routeLowerCase) {
        case "rules":
          setExternalLink("https://github.com/NexusTCG/wiki/wiki/Rules");
          break;
        case "game":
      }
    }
  }, [routeLowerCase, externalLink]);

  // Set energy based on current pathname
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
        setIcon(<DesignServicesIcon />);
        setDisabled(false);
        break;
      case "cards":
        setIcon(<CollectionsIcon />);
        setDisabled(false);
        break;
      case "credits":
        setIcon(<PaidIcon />);
        setDisabled(false);
        break;
      case "rules":
        setIcon(<RuleIcon />);
        setDisabled(false);
        break;
      // case "game":
      //   setIcon(<CasinoIcon />);
      //   setDisabled(false);
      //   break;
      // case "roadmap":
      //   setIcon(<FlagIcon />);
      //   setDisabled(false);
      //   break;
      case "request":
        setIcon(<SpeakerNotesIcon />);
        setDisabled(false);
        break;
      case "profile":
        setIcon(<AccountCircleIcon />);
        setDisabled(false);
        break;
      case "settings":
        setIcon(<SettingsIcon />);
        break;
      case "subscription":
        setIcon(<PaymentsIcon />);
        break;
      case "contact":
        setIcon(<HelpIcon />);
        setDisabled(false);
        break;
      case "login":
        setIcon(<LoginIcon />);
        setDisabled(false);
        break;
      default:
        setIcon(null);
    }
  }, [route]);
  
  return (
    <>
      {isSidebar && (
        <Link 
          href={externalLink ? externalLink : `/dashboard/${routeLowerCase}`}
          className="w-full"
          target={externalLink ? "_blank" : "_self"}
          rel={externalLink ? "noopener noreferrer" : undefined}
        >
          <Button
            id={`navigation-button-${routeLowerCase}`}
            disabled={disabled}
            variant="outlined"
            startIcon={icon}
            size="large"
            color={currentColor}
            className={clsx("flex justify-start items-center w-full hover:cursor-pointer hover:bg-teal-600/30 hover:text-white hover:border-teal-600",
              {
                "opacity-50": disabled,
                "bg-teal-500/30": routeLowerCase === "login",
              }
            )}
          >
            {routeName} {disabled ? "🚧" : ""}
          </Button>
        </Link>
      )}
      {!isSidebar && !disabled && (
        <Link
          href={externalLink ? externalLink : `/dashboard/${routeLowerCase}`}
          className="w-full"
        >
          <Button
            id={`navigation-button-${routeLowerCase}`}
            variant="outlined"
            size={routeLowerCase === "login" ? "large" : "small"}
            endIcon={routeLowerCase === "login" ? <LoginIcon /> : null}
            color={currentColor}
            className={clsx("flex justify-between items-center hover:cursor-pointer hover:bg-teal-600/30 hover:text-white hover:border-teal-600",
              {
                "opacity-50": disabled,
                "bg-teal-500/30 text-white hover:text-white/80 border-teal-500 hover:border-teal-600 px-4": routeLowerCase === "login",
              }
            )}
          >
            {routeName}
          </Button>
        </Link>
      )}
    </>
  );
}