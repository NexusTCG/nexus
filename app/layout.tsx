import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import type { Metadata } from 'next'
import theme from "@/app/styles/theme";
import "@/app/styles/globals.css";
import { PHProvider } from "@/app/providers";
import dynamic from 'next/dynamic';
import Script from 'next/script';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PostHogPageView = dynamic(() => import('@/app/PostHogPageView'), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  keywords: [
    "TCG", 
    "Trading Card Game",
    "Trading Card Games",
    "Card Game",
    "Card Games",
    "Custom Card",
    "Custom Cards", 
    "AI",
    "Artificial Intelligence",
    "Generate AI",
    "AI card generator",
    "AI custom card",
    "AI custom TCG card",
    "AI TCG",
    "Nexus", 
    "Nexus TCG",
    "Nexus Trading Card Game",
    "Nexus Card Creator",
    "Nexus Card Generator",
    "Nexus Discord",
    "create trading cards online",
    "create custom trading cards",
    "how to create trading cards",
    "how to make trading cards",
    "how to create custom trading cards",
    "how to make custom trading cards",
    "DALL-E gaming",
    "ChatGPT gaming",
    "generative AI card game",
    "alternative to Magic the Gathering",
    "alternative to Yu-Gi-Oh",
    "alternative to Pokemon",
    "alternative to Hearthstone",
    "alternative to MTG",
    "alternative to YGO",
    "alternative to PTCG",
    "Magic the Gathering is expensive",
    "Yu-Gi-Oh is expensive",
    "Pokemon is expensive",
    "Hearthstone is expensive",
    "MTG is expensive",
    "TCG community",
    "trading card game community",
    "how to create your own digital cards with AI",
  ],
  title: {
    default: "Nexus TCG",
    template: `%s | Nexus TCG`,
  },
  openGraph: {
    description: "Nexus is a digital TCG where players can make playable custom cards with the help of AI.",
    images: [
      "https://play.nexus/opengraph-image.png", 
      "https://play.nexus/twitter-image.png"
    ],
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(
  props: RootLayoutProps
  ) {
  const { children } = props;

  return (
    <html lang="en" className={inter.className}>
      <PHProvider>
        <ThemeProvider theme={theme}>
          <body
            className="
              bg-background
              text-foreground
            "
          >
            <main
              className="
                min-h-screen
                flex
                flex-col
                items-center
                bg-neutral-900
                text-neutral-300
              "
            >
              {children}
              <Analytics />
            </main>
            <Script
              type="text/javascript"
              src="https://app.termly.io/resource-blocker/c38fdc46-d3b8-4bf8-8c5d-460cba620841?autoBlock=on"
              strategy="beforeInteractive"
              async
            ></Script>
          </body>
        </ThemeProvider>
      </PHProvider>
    </html>
  );
}
