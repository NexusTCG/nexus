"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
// MUI doesn't have a Discord icon

type NewAuthButtonProps = {
  cta: string | null;
  provider: "google" | "github" | null;
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
      default:
        setProviderIcon(null);
        break;
    }
  }, [provider]);

  const handleSignIn = async () => {
    if (provider !== null) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.log(error);
      } else {
        setUserLoggedIn(true);
      }
    }
  };

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
    >
      {cta}
    </Button>
  );
}
