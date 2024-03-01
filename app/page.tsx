"use client";

import React, { 
  useEffect, 
  useState 
} from "react";
import AppBarLandingPage from "@/app/components/landing-page/AppBarLandingPage";
import LandingPageFeature from "@/app/components/landing-page/LandingPageFeature";
import CardImageGallery from "@/app/components/landing-page/CardImageGallery";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DesignServices,
  AttachMoney,
  Feedback,
  People,
  TravelExplore,
  RecentActors,
  ArrowForward,
} from "@mui/icons-material";

const headlineOptions = ["CARDS", "PLAYS", "MONEY"];
const totalBackgrounds = 29;
const featureTitles = [
  "Enter Nexus",
  "Create Cards",
  "Earn Cash",
  "Initializing...",
  "Open Source",
  "Join the Community",
];
const featureDescriptions = [
  "Nexus is a sci-fi- and fantasy-themed digital trading card game set in a simulated universe.",
  "Create custom cards with the help of AI. Then play the with friends and other players.",
  "When the game launches, players can earn a share of revenue from cards they create.",
  "Before building the game, we're building a Card Creator Tool, and community of creators.",
  "Make your mark on the universe. Create characters, and stories. Nexus will go open source.",
  `Love making custom cards? Join our community to get involved in Nexus' development.`,
];
const featureIcons = [
  <DesignServices key="design" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <AttachMoney key="money" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <RecentActors key="cards" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <TravelExplore key="planet" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <Feedback key="feedback" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
  <People key="community" className=" rounded-full bg-teal-500 text-neutral-950 shadow-md shadow-black/25 p-1" style={{fontSize: "36px"}}/>,
];

const images = [
  {
    src: "/images/cards/common-node-yellow.png",
    alt: "Description of image 1",
    name: "Yellow Node",
    creator: "Username",
  },
  {
    src: "/images/cards/common-node-blue.png",
    alt: "Description of image 1",
    name: "Blue Node",
    creator: "Username",
  },
  {
    src: "/images/cards/common-node-purple.png",
    alt: "Description of image 1",
    name: "Purple Node",
    creator: "Username",
  },
  {
    src: "/images/cards/common-node-red.png",
    alt: "Description of image 1",
    name: "Red Node",
    creator: "Username",
  },
];

export default function Home() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const [currentBg, setCurrentBg] = useState(1);
  const [nextBg, setNextBg] = useState(2);
  const [opacity, setOpacity] = useState(1);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [headline, setHeadline] = useState<string>(headlineOptions[headlineIndex]);
  const [fade, setFade] = useState(true);
  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(280);
  const [visibleImages, setVisibleImages] = useState<{
    src: string; 
    alt: string; 
    name: string; 
    creator: string; 
  }[]>([]);

  useEffect(() => {
    if (visibleImages.length > 3) {
      setImageWidth(200);
      setImageHeight(280);
    } else {
      setImageWidth(400);
      setImageHeight(560);
    }
  }, [visibleImages]);

  // Set visible images
  useEffect(() => {
    let visibleCount, width, height;
    if (isLg) {
      visibleCount = 4;
      width = 500;
      height = 700;
    } else if (isMd) {
      visibleCount = 3;
      width = 400;
      height = 560;
    } else {
      visibleCount = 2;
      width = 300;
      height = 420;
    }
  
    setImageWidth(width);
    setImageHeight(height);
    setVisibleImages(images.slice(0, visibleCount));
  }, [
    isXs, 
    isSm, 
    isMd, 
    isLg
  ]);

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
          style={{
            objectFit: "cover"
          }}
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
          style={{ 
            objectFit: "cover" 
          }}
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
        id="landing-page-content-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          h-full
          gap-6
          px-3
          md:px-6
          lg:px-12
          xl:px-24
          z-10
        "
      >
        <Box
          id="landing-page-hero-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            gap-2
            md:gap-4
            mt-2
          "
        >
          <Typography
              variant="subtitle2"
              className="
                text-teal-400
                text-center
                md:text-lg
              "
            >
              AI-POWERED DIGITAL TRADING CARD GAME
            </Typography>
          <Typography
            variant="h1"
            component="span"
            className="
              text-white
              text-8xl
              md:text-9xl
              font-light
              text-center
            "
          >
            MAKE<br/>
            <Typography
              variant="h1"
              style={{
                transition: 'opacity 0.5s',
                opacity: fade ? 1 : 0,
                fontSize: "inherit",
              }}
              component="span"
              className="
                text-teal-300
                font-semibold
              "
            >
              {headline}
            </Typography>
          </Typography>
          <Typography
            variant="subtitle1"
            className="
            text-white
              text-center
              text-lg
              md:text-xl
              font-medium
              text-wrap
            "
          >
            Create custom cards. Play them with friends. Earn revenue share.
          </Typography>
          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            href="/login"
            size="large"
            className="
              flex
              flex-row
              justify-center
              items-center
              hover:text-white
              bg-teal-500/20
              hover:bg-teal-500/50
              border-teal-500/80
              hover:border-teal-500
              shadow-md
              shadow-black/25
              rounded-md
              mt-4
              text-neutral-300
            "
          >
            Join Nexus
          </Button>
        </Box>
        {/* Video Embed */}
        {/* Card Gallery */}
        <Box
          id="landing-page-card-gallery-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            pt-6
            md:pt-12
          "
        >
          <Grid
            container
            spacing={4}
            sx={{
              width: "100%",
              px: 2,
            }}
          >
            {visibleImages.map((image, index) => (
              <Grid
                key={index}
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
              >
                <CardImageGallery
                  images={[{
                    src: image.src,
                    alt: image.alt,
                    name: image.name,
                    creator: image.creator,
                    width: imageWidth,
                    height: imageHeight,
                  }]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* Features */}
        <Box
          id="landing-page-features-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            gap-4
            md:gap-8
            pt-4
            md:pt-8
          "
        >
          <Typography
            variant="subtitle1"
            className="
              text-white
              text-center
              text-2xl
              md:text-3xl
              font-medium
            "
          >
            Features
          </Typography>
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
                sm={12}
                md={6}
                lg={4}
                key={index}
                className="w-full"
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
      </Box>
      {/* Footer */}
      <Box
        id="landing-page-footer-container"
        className="
          flex
          flex-col
          md:flex-row-reverse
          justify-center
          md:justify-between
          items-center
          w-full
          gap-8
          md:gap-12
          py-8
          px-12
          bg-black/80
          backdrop-blur-sm
          mt-4
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
        <Typography
          variant="caption"
          component="span"
          className="
            text-red-800
            text-center
            md:text-left
          "
        >
          Disclaimer<br/>
          <Typography
            variant="caption"
            className="
              text-neutral-700
              text-center
              md:text-left
            "
          >
            The Nexus trading card game is not yet released.<br/>
            This page outlines the vision for the game.
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}