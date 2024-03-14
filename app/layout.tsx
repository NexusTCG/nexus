import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import theme from "@/app/styles/theme";
import "@/app/styles/globals.css";
import { PHProvider } from "@/app/providers";
import dynamic from 'next/dynamic';
import Script from 'next/script';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PostHogPageView = dynamic(() => import('@/app/lib/posthog/PostHogPageView'), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nexus TCG",
  description:
    "Nexus is a digital trading card game where players can make the cards they play.",
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
