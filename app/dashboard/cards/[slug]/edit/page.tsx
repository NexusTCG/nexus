"use client";

// Hooks
import React, {
  useState,
  useEffect,
  useContext
} from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { DashboardContext } from "@/app/context/DashboardContext";
// Actions
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
import uploadCardImage from "@/app/lib/actions/supabase-data/uploadCardImage";
import { uploadCardArtImage } from "@/app/lib/actions/supabase-data/uploadCardArtImage";
import convertCardCodeToImage from "@/app/lib/actions/convertCardCodeToImage";
import { postCardToDiscord } from "@/app/lib/actions/postCardToDiscord";
// Types
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
// Schema
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// Utils
import PostHogClient from "@/app/lib/posthog/posthog";
import { format } from "date-fns";
import clsx from "clsx";
// Custom Components
import CardCreatorSkeleton from "@/app/components/card-creator/CardCreatorSkeleton";
// Components
import CardCreatorForm from "@/app/components/card-creator/CardCreatorForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import WarningIcon from '@mui/icons-material/Warning';

export default function EditCard({
  params 
}: { 
  params: { 
    slug: string 
  } 
}) {
  // Utils
  const { userProfileData } = useContext(DashboardContext);
  const posthog = PostHogClient();
  const router = useRouter();

  // Initial states
  const [cardData, setCardData] = useState<CardsTableType | null>(null);
  const [isCardOwner, setIsCardOwner] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  // Form submit states
  const [postToDiscord, setPostToDiscord] = useState<boolean>(true);
  // Feedback states
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Form
  const methods = useForm<CardFormDataType>({
    defaultValues: {
      id: 0,
      user_id: "", 
      cardCreator: "",
      cardName: "",
      cardEnergyValue: 0,
      cardEnergyCost: {
        radiant: 0,
        volatile: 0,
        corrupt: 0,
        blaze: 0,
        verdant: 0,
        void: 0,
      },
      cardEnergyAlignment: "",
      cardArt: "/images/card-parts/card-art/default-art.jpg",
      cardType: "entity",
      cardSuperType: "default",
      cardSubType: [""],
      cardSpeed: "1",
      cardGrade: "core",
      cardText: "Card text",
      cardLoreText: "",
      cardAttack: "",
      cardDefense: "",
      cardUnitType: "melee",
      cardPrompt: "",
      cardArtPrompt: "",
      cardRender: "",
      cardAnomalyMode: "common",
      cardAnomalyModeName: "",
      cardAnomalyModeText: "",
      cardAnomalyModeLoreText: "",
      cardAnomalyModeGrade: "core",
    },
    resolver: zodResolver(cardFormSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: {
      isValid,
      isSubmitting,
      isSubmitted,
    },
  } = methods;
  
  // Fetch card data from Supabase
  useEffect(() => {
    const loadCardData = async () => {
      const cardId = parseInt(
        params.slug, 10
      );
      const cards = await fetchCards({
        from: "cards",
        filter: {
          column: "id",
          value: cardId
        },
      });

      // Set card data & card owner state
      if (cards && cards.length > 0) {
        const card = cards[0];
        setCardData(card);
        setIsCardOwner(
          card.cardCreator === 
          userProfileData?.username
        );
      } else {
        console.error("Card not found.");
      }
    };
    loadCardData();
  }, [
    params.slug, 
    userProfileData?.username
  ]);

  // Check card ownership
  useEffect(() => {
    if (cardData && userProfileData) {
      const creator = cardData.cardCreator;
      const username = userProfileData.username;

      if (creator === username) {
        setIsCardOwner(true);
      } else {
        console.error("User is not card owner.");
        router.push(`/dashboard/cards/${params.slug}`);
      }
    }
  }, [
    cardData, 
    userProfileData?.username
  ]);

  // Pre-populate form with card data
  useEffect(() => {
    if (cardData && isCardOwner) {
      methods.reset({ 
        id: cardData?.id,
        user_id: cardData?.user_id,
        cardCreator: cardData?.cardCreator,
        cardName: cardData?.cardName,
        cardEnergyValue: cardData?.cardEnergyValue,
        cardEnergyCost: cardData?.cardEnergyCost,
        cardEnergyAlignment: cardData?.cardEnergyAlignment,
        cardArt: cardData?.cardArt,
        cardType: cardData?.cardType,
        cardSuperType: cardData?.cardSuperType,
        cardSubType: cardData?.cardSubType,
        cardSpeed: cardData?.cardSpeed,
        cardGrade: cardData?.cardGrade,
        cardText: cardData?.cardText,
        cardLoreText: cardData?.cardLoreText,
        cardAttack: cardData?.cardAttack,
        cardDefense: cardData?.cardDefense,
        cardUnitType: cardData?.cardUnitType,
        cardAnomalyModeName: cardData?.cardAnomalyModeName,
        cardAnomalyModeText: cardData?.cardAnomalyModeText,
        cardAnomalyModeLoreText: cardData?.cardAnomalyModeLoreText,
        cardPrompt: cardData?.cardPrompt,
        cardArtPrompt: cardData?.cardArtPrompt,
        cardRender: cardData?.cardRender,
      })
    }
  }, [
    methods, 
    cardData, 
    isCardOwner
  ]);

  // Form submit handler
  async function onSubmit(
    data: CardFormDataType
  ) {
    setAlertInfo({
      type: "info",
      icon: <InfoIcon />,
      message: "Submitting card..."
    });
    setShowAlertInfo(true);

    try {
      if (document.getElementById("nexus-form-container")) {
        setTimeout(() => {}, 2000); // Wait for form to render
        // Convert HTML to PNG
        const imageDataUrl = await convertCardCodeToImage(
          "nexus-form-container"
        ); 

        // Upload PNG to Supabase
        const imagePublicUrl = await uploadCardImage(
          imageDataUrl
        );

        if (!imagePublicUrl) {
          console.log(`cardRenderUrl update error: ${imagePublicUrl}`)
        }

        let finalCardArt = data.cardArt;

        if (finalCardArt) {
          const cardArtSupabaseUrl = await uploadCardArtImage(finalCardArt);
          if (cardArtSupabaseUrl) {
            finalCardArt = cardArtSupabaseUrl;
          }
        }
    
        if (imagePublicUrl && finalCardArt) {

          // Submit form data with cardRender
          const response = await fetch("/api/data/update-card", { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...data,
              id: cardData?.id,
              cardArt: finalCardArt,
              cardRender: imagePublicUrl,
            }),
          });
  
          const responseData = await response.json();

          if (response.ok && responseData.data) {
            setAlertInfo({
              type: "success",
              icon: <CheckIcon />,
              message: "Card submitted successfully! Redirecting..."
            });
            
            // Track event in PostHog
            if (responseData.data) {
              posthog.capture({
                distinctId: responseData.data.id,
                event: "🎉 New Card Submitted"
              })
            }
            
            // Post to Discord
            if (
              postToDiscord && 
              responseData.data
            ) {
              postCardToDiscord({
                cardName: responseData.data.cardName,
                cardRender: responseData.data.cardRender,
                cardCreator: responseData.data.cardCreator,
                cardIdUrl: `https://www.play.nexus/dashboard/cards/${responseData.data.id}`
              });
            }

            // Redirect to card page
            setTimeout(() => {
              setShowAlertInfo(false);
              router.push(`/dashboard/cards/${responseData.data.id}`);
            }, 5000);
  
          } else {
            console.log("card submit error:", responseData.error);
            setAlertInfo({
              type: "error",
              icon: <ErrorIcon />,
              message: "Error submitting card!"
            });
          }
        }  else {
          setAlertInfo({
            type: "error",
            icon: <ErrorIcon />,
            message: "Error uploading card render! Submission failed."
          });
        }
      } else {
        setAlertInfo({
          type: "error",
          icon: <ErrorIcon />,
          message: "Error capturing card render! Submission failed."
        });
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        icon: <ErrorIcon />,
        message: `Error submitting card: ${error}`
      });
    }
  };

  // Post to Discord change handler
  function handlePostToDiscordChange() {
    const newPostToDiscord = !postToDiscord;
    setPostToDiscord(newPostToDiscord);
    setOpenSnackbar(false);
    setSnackbarMessage(
      newPostToDiscord ? 
      "Posting to Discord!" : 
      "Not posting to Discord!"
    );
  };

  // Format date from card data
  useEffect(() => {
    if (cardData && isCardOwner) {
      const formattedDate = format(
        new Date(
          cardData.created_at
        ), 'MMMM dd, yyyy'
      );
      setFormattedDate(formattedDate);
    }
  }, [
    cardData, 
    isCardOwner
  ]);

  // Re-open snackbar when message changes
  useEffect(() => {
    if (snackbarMessage === "") {
      return;
    } else if (!openSnackbar) {
      setOpenSnackbar(true);
    }
  }, [snackbarMessage]);

  return isCardOwner && cardData ? (
    <>
      <FormProvider
        {...methods}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <Box
            id="create-container"
            className="
              flex
              flex-col
              justify-start
              items-center
              w-full
              gap-4
              md:bg-transparent
              bg-neutral-800
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
                  lg:pl-12
                  md:pl-8
                  sm:pl-4
                  lg:pr-12
                  md:pr-8
                  sm:pr-4
                  px-6
                  py-2
                  lg:py-4
                  bg-neutral-700/20
                  lg:bg-transparent
                "
              >
                {/* Card Name + Creator */}
                <Box
                  id="card-name-creator-container"
                  className="
                    flex
                    md:flex-row
                    flex-col
                    justify-between
                    items-start
                    md:items-baseline
                    md:gap-2
                    gap-0
                  "
                >
                  <Typography
                    variant="h4"
                    className="
                      font-semibold
                      lg:text-2xl
                      text-xl
                    "
                  >Editing: {""}</Typography>

                  {/* Card Name */}
                  <Typography
                    variant="h4"
                    className="
                      font-semibold
                      lg:text-2xl
                      text-xl
                    "
                  >
                    {
                      cardData.cardName ? 
                      cardData.cardName : 
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
                        cardData.cardCreator ? 
                        cardData.cardCreator : 
                        "Card creator" 
                      }
                  </Typography>
                  {/* Formatted Date */}
                  {formattedDate && (<Typography
                    variant="overline"
                    className="text-emerald-400"
                  >
                    on {formattedDate}
                  </Typography>)}
                </Box>

                <Box
                  id="card-submit-container"
                  className="
                    flex
                    flex-row
                    justify-between
                    items-baseline
                    gap-2
                  "
                >
                  {/* Upload to Discord */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={postToDiscord}
                        onChange={handlePostToDiscordChange}
                        disabled={isSubmitting || isSubmitted}
                      />
                    }
                    label={
                      <Typography
                        variant="caption"
                        component="span"
                        className="
                          w-full
                          font-medium
                          mt-1
                          gap-1
                        "
                      >
                        Post card to {""}
                        <a
                          href="https://discord.gg/HENgvaAmk2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Typography
                            variant="caption"
                            component="span"
                            className="
                            text-teal-400
                            hover:text-teal-300
                            hover:underline
                            "
                          >
                            Nexus&apos;s Discord
                          </Typography>
                        </a>
                      </Typography>
                    }
                    className={clsx("hover:opacity-100 text-sm", {
                      "opacity-100": postToDiscord,
                      "opacity-50": !postToDiscord,
                    })}
                  />
                  {/* Save button */}
                  {!isSubmitting && !showAlertInfo ? (
                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={
                        !isValid ||
                        isSubmitting ||
                        isSubmitted
                      }
                      color={isValid ? "success" : "secondary"}
                      startIcon={<SaveIcon />}
                      size="large"
                      className="
                        hover:cursor-pointer
                        hover:bg-teal-600/30
                        hover:text-white
                        hover:border-teal-600
                      "
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
              </Box>
              {isSubmitting && (<LinearProgress
                color="primary"
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
                gap-4
              "
            >
              <Box
                id="create-form-warning"
                className="
                  flex
                  flex-row
                  justify-start
                  items-center
                  w-full
                  text-yellow-500
                  bg-yellow-900/50
                  rounded-md
                  py-2
                  px-3
                  gap-3
                "
              >
                <WarningIcon
                  fontSize="small"
                />
                <Typography
                variant="caption"
                className="
                  w-full
                  text-xs
                "
              >
                Do not deliberately attempt to create cards that would violate the intellectual property of others. 
                Such as the names or likeness of recognizable characters, places, or items from other games, movies, real life, etc. 
                Doing so will result in a warning or termination of your account.
              </Typography>
              </Box>
              
              {/* Card Creator Form */}
              <CardCreatorForm
                cardData={cardData}
              />
            </Box>
          </Box>
        </form>
      </FormProvider>
      {openSnackbar && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={
              postToDiscord ? 
              "success" : 
              "error"
            }
            className="
              w-full
              rounded-md
            "
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  ) : (
    <CardCreatorSkeleton />
  )
}