"use client";

// Hooks
import React, { 
  useState, 
  useEffect 
} from "react";
// Utils
import Link from "@mui/material/Link";
import clsx from "clsx";
// Icons
import IconButton from "@mui/material/IconButton";
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import { FaDiscord } from "react-icons/fa";

type SoMeButtonProps = {
  channel: string;
}

export default function SoMeButton({ channel }: SoMeButtonProps) {
  const [soMeLink, setSoMeLink] = useState<string>("");
  const [soMeIcon, setSoMeIcon] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    switch (channel.toLowerCase()) {
      case "github":
        setSoMeLink("https://github.com/NexusTCG/nexus/wiki");
        setSoMeIcon(<GitHubIcon />);
        break;
      case "linkedin":
        setSoMeLink("https://www.linkedin.com/company/nexus-tcg");
        setSoMeIcon(<LinkedInIcon />);
        break;
      case "reddit":
        setSoMeLink("");
        setSoMeIcon(<RedditIcon />);
        break;
      case "discord":
        setSoMeLink("https://discord.gg/BZWVK4F6My");
        setSoMeIcon(<FaDiscord />);
        break;
        case "x":
        setSoMeLink("https://twitter.com/PlayNexusTcg");
        setSoMeIcon(<XIcon />);
    }
  }, [channel]);

  return (
    <Link
      href={soMeLink}
      target="_blank"
      rel="noopener"
    >
      <IconButton
        id={`social-media-button-${channel.toLowerCase()}`}
        size="small"
        className={clsx("opacity-50 hover:opacity-100 hover:cursor-pointer",
          {
            "w-[32px] h-[32px]": channel.toLowerCase() === "discord",
          }
        )}
      >
        {soMeIcon}
      </IconButton>
    </Link>
  )
}