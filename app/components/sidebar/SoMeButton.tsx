"use client";

import React, { useState, useEffect } from "react";
import {
  IconButton,
  Link
} from "@mui/material";
import {
  GitHub,
  X,
  LinkedIn,
  Reddit
} from '@mui/icons-material';
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
        setSoMeLink("https://github.com/NexusTCG");
        setSoMeIcon(<GitHub />);
        break;
      case "linkedin":
        setSoMeLink("https://www.linkedin.com/company/nexus-tcg");
        setSoMeIcon(<LinkedIn />);
        break;
      case "reddit":
        setSoMeLink("");
        setSoMeIcon(<Reddit />);
        break;
      case "discord":
        setSoMeLink("https://discord.gg/VGMTV996dy");
        setSoMeIcon(<FaDiscord />);
        break;
        case "x":
        setSoMeLink("https://twitter.com/NexusCardGame");
        setSoMeIcon(<X />);
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
        sx={{
          width:"24px",
          height:"24px"
        }}
        className="hover:cursor-pointer"
      >
        {soMeIcon}
      </IconButton>
    </Link>
  )
}