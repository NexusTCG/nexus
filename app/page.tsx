"use client";

import React, { useEffect, useState } from "react";
import AppBarLandingPage from "@/app/components/navigation/AppBarLandingPage";
import Image from "next/image";
import {
  Box,
  Divider,
  Typography
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const headlineOptions = ["CARDS", "PLAYS", "MONEY"];
const totalBackgrounds = 13; // Assuming you have 13 background images

export default function Home() {
  const [currentBg, setCurrentBg] = useState(1);
  const [nextBg, setNextBg] = useState(2);
  const [opacity, setOpacity] = useState(1);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [headline, setHeadline] = useState<string>(headlineOptions[headlineIndex]);
  const [fade, setFade] = useState(true);

  // Set headline
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setHeadlineIndex((prevIndex) => (prevIndex + 1) % headlineOptions.length);
        setHeadline(headlineOptions[(headlineIndex + 1) % headlineOptions.length]);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [headlineIndex]);

  // Update background image with smooth transition
  useEffect(() => {
    const bgTimer = setInterval(() => {
      // Start fading out the current background
      setOpacity(0);
      
      setTimeout(() => {
        // After fade out, update backgrounds
        setCurrentBg(nextBg);
        setNextBg((prevBg) => prevBg % totalBackgrounds + 1);

        // Immediately start fading in the new current background without delay
        setOpacity(1);
      }, 1000); // This timeout matches the CSS transition duration
    }, 10000); // Adjusted time to allow full visibility before starting the next transition

    return () => clearInterval(bgTimer);
  }, [nextBg]);

  return (
    <Box
      id="landing-page-container"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <div style={{ position: "absolute", width: "100%", height: "100%", transition: "opacity 1s", opacity: opacity }}>
        <Image
          src={`/images/auth-bg/nexus-auth-bg-${currentBg}.jpg`}
          alt="Current background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-25"
        />
      </div>
      <div style={{ position: "absolute", width: "100%", height: "100%", opacity: 0 }}>
        <Image
          src={`/images/auth-bg/nexus-auth-bg-${nextBg}.jpg`}
          alt="Next background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-25"
        />
      </div>
      <AppBarLandingPage />
      <Box
        id="landing-page-hero-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          z-10
          gap-8
          pt-32
          md:pt-48
          pb-24
          md:pb-32
          px-12
        "
      >
        <Typography
          variant="h1"
          component="span"
          className="
            text-white
            text-8xl
            font-bold
            text-center
          "
        >
          MAKE {" "}
          <Typography
            variant="h1"
            style={{
              transition: 'opacity 0.5s',
              opacity: fade ? 1 : 0,
            }}
            component="span"
            className="
              text-teal-400
              text-8xl
              font-bold
            "
          >
            {headline}
          </Typography>
        </Typography>
        <Typography
          variant="subtitle1"
          className="
            text-center
            text-xl
            font-medium
            text-wrap
          "
        >
          Create custom cards. Play them. Earn money.
        </Typography>
      </Box>
      <Divider />
      <Box
        id="landing-page-features-container"
        className="
          flex
          flex-row
          justify-center
          items-center
          w-full
          gap-8
          py-8
          px-12
          md:px-24
          lg:px-48
        "
      >
        <Box
          id="landing-page-feature-1"
          className="
            flex
            flex-row
            justify-start
            items-start
            w-full
            z-10
            p-4
            gap-4
            bg-teal-500/20
            border
            border-teal-500/50
            rounded-md
            shadow-lg
            shadow-black/50
            backdrop-blur-sm
          "
        >
          <HomeIcon
            sx={{ fontSize: 40 }}
            className="
              p-1
              rounded-full
              bg-teal-500
            "
          />
          <Box
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-2
            "
          >
            <Typography
              variant="subtitle1"
              className="
                text-xl
                font-medium
                text-wrap
              "
            >
              USP Title
            </Typography>
            <Typography
              variant="body1"
              className="
                text-wrap
              "
            >
              Lorem ipsum dolor sit amet
            </Typography>
          </Box>
        </Box>
        <Box
          id="landing-page-feature-1"
          className="
            flex
            flex-row
            justify-start
            items-start
            w-full
            z-10
            p-4
            gap-4
            bg-teal-500/20
            border
            border-teal-500/50
            rounded-md
            shadow-lg
            shadow-black/50
            backdrop-blur-sm
          "
        >
          <HomeIcon
            sx={{ fontSize: 40 }}
            className="
              p-1
              rounded-full
              bg-teal-500
            "
          />
          <Box
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-2
            "
          >
            <Typography
              variant="subtitle1"
              className="
                text-xl
                font-medium
                text-wrap
              "
            >
              USP Title
            </Typography>
            <Typography
              variant="body1"
              className="
                text-wrap
              "
            >
              Lorem ipsum dolor sit amet
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}