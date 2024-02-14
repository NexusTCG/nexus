"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#14b8a6", // Emerald 500
      // main: "#818cf8",
    },
    secondary: {
      main: "#737373", // Neutral 500
      // main: "#f472b6",
    },
    background: {
      default: "#020617",
      paper: "#020617",
    },
    text: {
      primary: "#f9fafb",
      secondary: "#e5e7eb",
      disabled: "#9ca3af",
    },
    error: {
      main: "#ef4444", // Red 600
      // main: "#ef4444",
    },
    warning: {
      main: "#eab308", // Yellow 500
      // main: "#eab308",
    },
    info: {
      main: "#3b82f6", // Blue 500
      // main: "#3b82f6",
    },
    success: {
      main: "#16a34a", // Green 600
      // main: "#22c55e",
    },
    divider: "#737373", // Neutral 500
  },
  typography: {
    fontWeightLight: 300,
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 300,
    },
    subtitle1: {
      fontWeight: 400,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontWeight: 400,
    },
    overline: {
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
