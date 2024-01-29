import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import theme from "@/app/styles/theme";
import "@/app/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nexus TCG",
  description:
    "Nexus is an open source digital trading card game where players can make playable custom TCG cards with the help of generative AI.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center bg-gray-950 text-white">
          <ThemeProvider theme={theme}>
            {children}
            <Analytics />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
