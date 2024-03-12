"use client";

import React, { useState } from "react";
import NavigationButton from "@/app/components/navigation/NavigationButton";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { AccountCircle } from "@mui/icons-material";

const primaryNavigation = [
  "create",
  "cards",
  "rules",
  "contact",
  "credits",
];

export default function AppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleMenu(
    event: React.MouseEvent<HTMLElement>
  ) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    setAnchorEl(null);
    const response = await fetch(`${window.location.origin}/auth/logout-user`, {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.log("Logout failed.");
    }
  };

  return (
    <Box
      id="appbar-container"
      sx={{
        position: "sticky",
        top: 0,
        height: "60px"
      }}
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        bg-neutral-800
        border-b
        border-neutral-700
        shadow-md
        shadow-neutral-950/50
      "
    >
      <Toolbar
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
          gap-4
        "
      >
        <Box
          id="appbar-logo-navigation-container"
          className="
            flex
            flex-row
            justify-start
            items-center
            gap-6
          "
        >
          {/* Logo */}
          <Link
            href="/dashboard"
            className="
              hover:opacity-80
              hidden
              md:block
            "  
          >
            <Image
              src="/images/nexus-icon.png" // Repace with SVG
              alt="Nexus Logo Placeholder"
              width={24}
              height={24}
            />
          </Link>
          {/* Navigation Menu */}
          <Box
            id="appbar-navigation-container"
            className="
              flex
              flex-row
              justify-start
              items-center
              w-full
              gap-2
            "
          >
            {primaryNavigation.map(
              (route, index) => {
              return (
                <NavigationButton
                  key={index}
                  route={route}
                  type="appbar"
                />
              )
            })}
          </Box>
        </Box>
        
        {/* Secondary Navigation */}
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link
            href="/dashboard/profile"
          >
            <MenuItem
              onClick={handleClose}
            >
              Profile
            </MenuItem>
          </Link>
          <MenuItem
              onClick={handleSignOut}
            >
              Log Out
            </MenuItem>
        </Menu>
      </Toolbar>  
    </Box>
  );
}