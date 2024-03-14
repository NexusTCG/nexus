"use client";

import React, { useState, useEffect, useContext } from "react";
import PostHogClient from "@/app/lib/posthog/posthog";

import { loadStripe } from '@stripe/stripe-js';
import useSession from "@/app/hooks/useSession";
import { DashboardContext } from "@/app/context/DashboardContext";
import Cal, { getCalApi } from "@calcom/embed-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import PaymentIcon from '@mui/icons-material/Payment';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const posthog = PostHogClient();

export default function Credits() {
  const { userProfileData } = useContext(DashboardContext);
  const session = useSession();

  const [currentCredits, setCurrentCredits] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Check for order success or cancellation
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      posthog.capture({
        distinctId: session?.user?.id || 'anonymous',
        event: "💰 Order Placed!"
      })
      setAlertInfo({
        type: "success",
        icon: <CheckIcon />,
        message: "Order placed! You will receive an email confirmation."
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("success");
        newUrl.searchParams.delete("canceled");
        newUrl.searchParams.delete("message");
        window.history.replaceState(null, '', newUrl.href);
      }, 6000);
    } else if (query.get("canceled")) {
      setAlertInfo({
        type: "error",
        icon: <CloseIcon />,
        message: "Your order was canceled! You will not be charged."
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("success");
        newUrl.searchParams.delete("canceled");
        newUrl.searchParams.delete("message");
        window.history.replaceState(null, '', newUrl.href);
      }, 6000);
    }
  }, []);

  useEffect(() => {
    if (userProfileData?.credits !== undefined) {
      setCurrentCredits(userProfileData?.credits);
    }
  }, [userProfileData?.credits])

  // Fetch Cal.com Embed
  useEffect(()=>{
	  (async function () {
      const cal = await getCalApi();
      cal(
        "ui", {
          "theme": "dark",
          "styles": {
            "branding":{
              "brandColor":"#14b8a6"
            }},
          "hideEventTypeDetails": true,
          "layout": "month_view"
        }
      );
	  })();
	}, [])

  // Handle buy credits
  async function handleBuyCredits() {
    const token = session?.access_token;

    if (token) {
      try {
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Redirect the user to Stripe Checkout page
          window.location.href = data.url;
        } else {
          console.error('Checkout error:', data.error);
          setAlertInfo({
            type: "error",
            icon: <ErrorIcon />,
            message: data.error as string,
          });
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000)
          
        }
      } catch (error) {
        console.error('Request failed:', error);
        setAlertInfo({
          type: "error",
          icon: <ErrorIcon />,
          message: error as string,
        });
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000)
      }
    } else {
      console.error("No session token found")
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
        message: "No session token found",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000)
    };
  };

  return (
    <Box
      id="credits-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        h-full
        py-8
        md:py-12
        px-12
        md:px-24
        gap-8
      "
    >
      <Box
        id="credits-options-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          h-full
          gap-6
          md:gap-8
        "
      >
        {/* Credits Info */}
        <Box
          id="credits-info-container"
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
            variant="overline"
            className="
              text-teal-400
            "
          >
            Your credits
          </Typography>
          {currentCredits !== null ? (
            <Box
              id="credits-amount-container"
              className="
                flex
                flex-row
                justify-start
                items-center
                w-full
                gap-2
              "
            >
              <Typography
                variant="h3"
                className="
                  text-teal-400
                  font-semibold
                  flex-row
                "
              >
                {currentCredits}
              </Typography>
              <Typography
                variant="h3"
                className="
                  text-white
                "
              >
                credits
              </Typography>
            </Box>
          ) : (
            <Skeleton
              variant="text"
              width="100%"
              height={40}
            />
          )}
          <Typography
            variant="subtitle1"
          >
            Credits are used to generate art for your cards. Your purchase directly supports the development of Nexus.
          </Typography>
          <Button
            type="submit"
            role="link"
            variant="outlined"
            size="large"
            startIcon={<PaymentIcon />}
            onClick={handleBuyCredits}
            className="
              flex
              justify-center
              items-center
              mt-4
            "
          >
            Buy credits
          </Button>
          {showAlert && (
            <Alert
              severity={alertInfo?.type}
              className=" w-full"
              icon={
                alertInfo ? 
                alertInfo.icon : 
                undefined
              }
            >
              {
                alertInfo ? 
                alertInfo.message : 
                "Error"
              }
            </Alert>
          )}
        </Box>

        {/* Referral */}
        <Box
          id="credits-referral-container"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-4
            p-4
            bg-neutral-800
            rounded-lg
            border
            border-neutral-700
          "
        >
          <Box
            id="credits-referral content-container"
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
              variant="overline"
              className="
                text-teal-400
              "
            >
              Get more credits
            </Typography>
            <Typography
              variant="h3"
              className="
                text-white
              "
            >
              Refer a friend!
            </Typography>
            <Typography
              variant="subtitle1"
            >
              Get free credits by inviting your friends. For each friend you invite, you both get 10 credits. Just email their email address to referral@play.nexus.
            </Typography>
          </Box>
        </Box>
        
        {/* Cal.com Embed */}
        <Box
          id="credits-cal-embed-container"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-4
            p-4
            bg-neutral-800
            rounded-lg
            border
            border-neutral-700
          "
        >
          <Box
            id="credits-cal-embed-content-container"
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
              variant="overline"
              className="
                text-teal-400
              "
            >
              Interview with Nils
            </Typography>
            <Typography
              variant="h3"
              className="
                text-white
              "
            >
              Get credits!
            </Typography>
            <Typography
              variant="subtitle1"
            >
              Participate in a 30 minute casual interview with Nils, creator of Nexus, and get 25 art credits!
            </Typography>
          </Box>
          <Cal 
            calLink="nexus-tcg/30min"
            style={{
              width:"100%",
              height:"100%",
              overflow:"scroll"
            }}
            config={{
              layout: "week_view",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}