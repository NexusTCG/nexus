"use client";

import React, { 
  useEffect, 
  useState 
} from "react";
import AppBarLandingPage from "@/app/components/navigation/AppBarLandingPage";
import LandingPageFeature from "@/app//components/card-creator/LandingPageFeature";
import Image from "next/image";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import {
  DesignServices,
  AttachMoney,
  Feedback,
  People,
  TravelExplore,
  RecentActors,

} from "@mui/icons-material";

const headlineOptions = ["CARDS", "PLAYS", "MONEY"];
const totalBackgrounds = 13;
const featureTitles = [
  "What it is",
  "What do you do",
  "How does it work",
  "Contribute",
  "Earn cash",
  "Join the community",
];
const featureDescriptions = [
  "Create custom cards for your favorite games.",
  "Play custom cards with friends and family.",
  "Earn money by creating and playing custom cards.",
  "Customize your cards with images, text, and more.",
  "Join a community of players and creators.",
  "Compete in tournaments and events.",
];
const featureIcons = [
  <DesignServices key="design" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <AttachMoney key="money" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <RecentActors key="cards" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <TravelExplore key="planet" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <Feedback key="feedback" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <People key="community" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
];

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

  // Update background image
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setOpacity(0);
      
      setTimeout(() => {
        setCurrentBg(nextBg);
        setNextBg((prevBg) => prevBg % totalBackgrounds + 1);

        setOpacity(1);
      }, 1000);
    }, 10000);

    return () => clearInterval(bgTimer);
  }, [nextBg]);

  return (
    <Box
      id="landing-page-container"
      className="
        flex
        flex-col
        justify-start
        items-center
        w-full
        min-h-screen
        bg-black
        gap-12
        lg:gap-24
      "
      style={{
        position: "relative",
        overflow: "auto",
      }}
    >
      <div style={{ 
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        transition: "opacity 1s", 
        opacity: opacity 
      }}>
        <Image
          src={`/images/auth-bg/nexus-auth-bg-${currentBg}.jpg`}
          alt="Current background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-25"
        />
      </div>
      <div style={{ 
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        opacity: 0 
      }}>
        <Image
          src={`/images/auth-bg/nexus-auth-bg-${nextBg}.jpg`}
          alt="Next background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-25"
        />
      </div>
      <Box
        id="app-bar-container"
        className="w-full"
        sx={{
          overflow: "auto",
          position: "sticky",
        }}
      >
        <AppBarLandingPage />
      </Box>
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
          pt-24
          md:pt-32
          pb-8
          md:pb-12
          px-12
        "
      >
        <Typography
          variant="h1"
          component="span"
          className="
            text-white
            text-8xl
            font-light
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
              font-semibold
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
      {/* Video Embed */}
      <Box
        id="landing-page-features-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          z-10
          gap-8
          px-4
          md:px-8
          pt-12
          md:pt-24
        "
      >
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            px: 2,
          }}
        >
          {[...Array(6)].map((_, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              <LandingPageFeature
                id={`feature-${index}`}
                title={featureTitles[index]}
                description={featureDescriptions[index]}
                icon={featureIcons[index]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        id="landing-page-footer-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          py-8
          px-12
          bg-black/80
          backdrop-blur-sm
          mt-12
          z-10
        "
      >
        <Typography
          variant="overline"
          className="
            text-neutral-500
          "
        >
          © Nexus Games, Inc., {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}