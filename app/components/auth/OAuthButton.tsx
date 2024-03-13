// TODO: Fix logout flow
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FaDiscord } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";

type NewAuthButtonProps = {
  cta: string | null;
  provider: "google" | "github" | "discord" | "twitch" | null;
  disabled?: boolean;
};

export default function OAuthButton({
  cta,
  provider,
  disabled = false,
}: NewAuthButtonProps) {
  const [providerIcon, setProviderIcon] = useState<React.ReactNode | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    switch (provider) {
      case "google":
        setProviderIcon(<GoogleIcon />);
        break;
      case "github":
        setProviderIcon(<GitHubIcon />);
        break;
      case "discord":
        setProviderIcon(<FaDiscord />);
        break;
      case "twitch":
        setProviderIcon(<FaTwitch />);
        break;
      default:
        setProviderIcon(null);
        break;
    }
  }, [provider]);

  const handleSignIn = async () => {
    console.log(`Logging in with: ${provider}`); // For testing
    if (provider !== null) {
      const {
        error
      } = await supabase
        .auth
        .signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
          },
      });
      if (error) {
        console.log(error);
      } else {
        setUserLoggedIn(true);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserLoggedIn(false);
  };

  return (
    <Button
      onClick={handleSignIn}
      variant="outlined"
      disabled={disabled}
      startIcon={providerIcon}
      size="large"
      className="
        flex
        justify-center
        items-center
        w-full
      "
    >
      {cta}
    </Button>
  );
}
