"use client";

import React, {
  useState,
  useEffect,
  useContext
} from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import useSession from "@/app/hooks/useSession";
import { DashboardContext } from "@/app/context/DashboardContext";
import { CardFormDataType } from "@/app/utils/types/types";
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PostHogClient from "@/app/lib/posthog/posthog";
import CardCreatorForm from "@/app/components/card-creator/CardCreatorForm";
import convertCardCodeToImage from "@/app/lib/actions/convertCardCodeToImage"
import uploadCardImage from "@/app/lib/actions/supabase-data/uploadCardImage";
import { postCardToDiscord } from "@/app/lib/actions/postCardToDiscord";
import { createClient } from "@/app/lib/supabase/client";
import {
  FormControlLabel,
  LinearProgress,
  Typography,
  Button,
  Switch,
  Alert,
  Box,
} from "@mui/material";
import {
  Check,
  Error,
  Info,
  Save
} from "@mui/icons-material";

export default function Create() {
  const methods = useForm<CardFormDataType>({
    defaultValues: {
      user_id: "", 
      cardCreator: "",
      cardName: "",
      cardEnergyValue: 0,
      cardEnergyCost: {
        yellow: 0,
        blue: 0,
        purple: 0,
        red: 0,
        green: 0,
        void: 0,
      },
      cardColor: "",
      cardArt: "/images/card-parts/card-art/default-art.jpg",
      cardType: "entity",
      cardSuperType: "default",
      cardSubType: [""],
      cardSpeed: "1",
      cardGrade: "common",
      cardText: "",
      cardFlavorText: "",
      cardAttack: "",
      cardDefense: "",
      cardPrompt: "",
      cardArtPrompt: "",
      cardRender: "",
    },
    resolver: zodResolver(cardFormSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    trigger,
    formState: {
      isValid,
      isSubmitting
    },
    setValue
  } = methods;

  // States
  const [postToDiscord, setPostToDiscord] = useState<boolean>(false);
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Utils
  const form = watch();
  const supabase = createClient();
  const posthog = PostHogClient();
  const session = useSession(); // remove?
  const router = useRouter();
  const { userProfileData } = useContext(DashboardContext); // From layout.tsx

  // Set user_id and cardCreator values based on session
  useEffect(() => {
    if (
      session?.user?.id
    ) {
      setValue(
        "user_id",
        session.user.id
      );
    }
    if (
      userProfileData?.username && 
      userProfileData?.username !== 
      undefined
    ) {
      setValue(
        "cardCreator",
        userProfileData?.username as string // Need assertion?
      );
    }
  }, [
    session,
    userProfileData,
    setValue
  ]);

  // Form submit handler
  async function onSubmit(
    data: CardFormDataType
  ) {
    try {
      setAlertInfo({
        type: "info",
        icon: <Info />,
        message: "Submitting card..."
      });

      // User Puppeteer instead
      const imageDataUrl = await convertCardCodeToImage("card-border"); 
      const imagePublicUrl = await uploadCardImage(imageDataUrl);
      
      if (!imagePublicUrl) {
        setAlertInfo({
          type: "error",
          icon: <Error />,
          message: "Failed to upload card render.."
        });
      } else if (imagePublicUrl) {
        setValue("cardRender",
          imagePublicUrl, {
          shouldValidate: true
        });
        await trigger("cardRender");

        console.log("Card render uploaded: ", imagePublicUrl);
      }

      // Submit card if cardRender is updated
      if (imagePublicUrl) {
        console.log("Submitting card: ", data);

        const response = await fetch("/data/submit-card", { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data, 
            cardRender: imagePublicUrl
          }),
        });

        console.log("Card submitted: ", response);
        const responseData = await response.json();

        console.log("Card submitted (responseData): ", responseData);

        // Upload success
        if (response.ok) {
          setAlertInfo({
            type: "success",
            icon: <Check />,
            message: "Card submitted successfully! Redirecting..."
          });

          // Post card to Discord
          if (postToDiscord) {
            postCardToDiscord({
              cardName: data.cardName,
              cardRender: imagePublicUrl,
              cardCreator: data.cardCreator
            });
          }

          // Track event in PostHog
          if (session && session.user && session.user.id) {
            posthog.capture({
              distinctId: session.user.id,
              event: '🎉 New Card Submitted'
            })
          
            try {
              // Fetch card id
              const {
                data: cardId,
                error: cardIdError
              } = await supabase
                .from("cards")
                .select("*")
                .eq(
                  "user_id",
                  session.user.id
                )
                .order("created_at", {
                  ascending: false
                })
                .limit(1)
                .single();

                console.log("Uploaded card ID: ", cardId, cardIdError);

              if (cardIdError) {
                setAlertInfo({
                  type: "error",
                  icon: <Error />,
                  message: "Error redirecting..."
                });
                console.log("Error redirecting: ", cardIdError);
              } else if (cardId) {
                // Redirect to card page
                setTimeout(() => {
                  router.push(`/dashboard/cards/${cardId.id}`);
                }, 3000);
              }
            } catch (error) {
              setAlertInfo({
                type: "error",
                icon: <Error />,
                message: `Error redirecting...: ${error}`
              });
              console.log("Error redirecting: ", error);
            }
          }
        } else {
          setAlertInfo({
            type: "error",
            icon: <Error />,
            message: `Error submitting card: ${responseData.error}`
          });
        }
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        icon: <Error />,
        message: `Error submitting card: ${error}`
      });
    }
    // Hide alert
    setTimeout(() => {
      setShowAlertInfo(false);
    }, 3000);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          id="create-container"
          className="
            flex
            flex-col
            justify-start
            items-center
            w-full
            gap-4
          "
        >
          <Box
            id="create-header-container"
            className="
              w-full
              h-full
              flex
              flex-col
              justify-between
              items-center
              gap-4
              lg:pl-12
              md:pl-8
              sm:pl-4
              lg:pr-12
              md:pr-8
              sm:pr-4
              px-6
              py-4
              bg-neutral-800
              border-b
            border-neutral-700
              top-0
              sticky
              z-20
              md:shadow-md
              md:shadow-neutral-900/50
            "
          >
            <Box
              id="create-header-content"
              className="
                flex
                flex-row
                justify-between
                items-center
                w-full
                gap-8
              "
            >
              {/* Card Name + Creator */}
              <Box
                id="card-name-creator-container"
                className="
                  flex
                  flex-row
                  justify-between
                  items-baseline
                  gap-2
                "
              >
                {/* Card Name */}
                <Typography
                  variant="h4"
                  className="
                    font-semibold
                  "
                >
                  {
                    form.cardName ? 
                    form.cardName : 
                    "Card Name"
                  }
                </Typography>
                {/* Card Creator*/}
                <Typography
                  variant="overline"
                  className="text-emerald-400"
                >
                  <Typography
                    variant="overline"
                    className="text-neutral-400"
                    component="span"
                  >
                    by{" "}
                  </Typography>
                    {
                      userProfileData?.username ? 
                      userProfileData?.username : 
                      "Card creator"
                    }
                </Typography>
              </Box>

              {/* Upload to Discord */}
              <FormControlLabel
                required
                onClick={() => setPostToDiscord(!postToDiscord)}
                control={<Switch />}
                label="Post to Nexus Discord"
              />

              {/* Save button */}
              {!isSubmitting && !showAlertInfo ? (
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={
                    !isValid || 
                    isSubmitting ||
                    form.cardArt === "/images/card-parts/card-art/default-art.jpg"
                  }
                  color={isValid ? "success" : "secondary"}
                  startIcon={<Save />}
                  size="large"
                >
                  Save card
                </Button>
              ) : (
                <Alert
                  severity={alertInfo?.type}
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
            {isSubmitting && (<LinearProgress
              color="secondary"
              className="w-full"
            />)}
          </Box>
          <Box
            id="create-form-container"
            className="
              flex
              flex-col
              justify-start
              items-center
              w-full
              lg:px-12
              md:px-8
              sm:px-6
              lg:mb-12
              mb-8
              md:mt-4
            "
          >
            {/* Card Creator Form */}
            <CardCreatorForm />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}

// const [
//   placeholderFormValidation,
//   setPlaceholderFormValidation
// ] = React.useState<boolean>(false); // Remove ??
//  // Remove ??

// useEffect(() => {
//   if (!placeholderFormValidation) {
//     setPlaceholderFormValidation(true);
//   }
// }, [placeholderFormValidation]); // Remove ??