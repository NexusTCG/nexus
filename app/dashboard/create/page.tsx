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
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PostHogClient from "@/app/lib/posthog/posthog";
import CardCreatorForm from "@/app/components/card-creator/CardCreatorForm";
import convertCardCodeToImage from "@/app/lib/actions/convertCardCodeToImage";
import uploadCardImage from "@/app/lib/actions/supabase-data/uploadCardImage";
import { postCardToDiscord } from "@/app/lib/actions/postCardToDiscord";
import { createClient } from "@/app/lib/supabase/client";
import clsx from "clsx";
import {
  FormControlLabel,
  LinearProgress,
  Typography,
  Checkbox,
  Snackbar,
  Button,
  Alert,
  Box,
} from "@mui/material";
import {
  Check,
  Error,
  Info,
  Save,
} from "@mui/icons-material";

export default function Create() {
  const { userProfileData } = useContext(DashboardContext); // From layout.tsx

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
    formState: {
      isValid,
      isSubmitting,
      isSubmitted,
    },
    setValue
  } = methods;

  // Utils
  const form = watch();
  const supabase = createClient();
  const posthog = PostHogClient();
  const session = useSession(); // remove?
  const router = useRouter();

  // States
  const [submittedCard, setSubmittedCard] = useState<CardsTableType | null>(null);
  const [cardIdToUpdate, setCardIdToUpdate] = useState<number | null>(null);
  const [cardRenderUrl, setCardRenderUrl] = useState<string | null>("");
  const [cardRenderUrlUpdated, setCardRenderUrlUpdated] = useState<boolean>(false);
  const [postToDiscord, setPostToDiscord] = useState<boolean>(true);
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [showCardRender, setShowCardRender] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  // Set user_id and cardCreator
  // values based on user session
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
        userProfileData?.username as string
      );
    }
  }, [
    session,
    userProfileData,
    setValue
  ]);

  // Update cardRender in Supabase
  useEffect(() => {
    const updateCardRender = (async () => {
      const { data, error } = await supabase
      .from("cards")
      .update({ cardRender: cardRenderUrl })
      .eq("id", cardIdToUpdate)
      .select();

      console.log(`cardRenderData data: ${data} cardRenderData error: ${error}`);
      if (data && data.length > 0) {
        setCardRenderUrlUpdated(true);
      }
    });
    updateCardRender();
  }), [submittedCard?.id, cardRenderUrl];

  // Post to Discord
  // useEffect(() => {
  //   if (submittedCard && cardRenderUrl !== null) {
  //     postCardToDiscord({
  //       cardName: submittedCard?.cardName,
  //       cardRender: cardRenderUrl,
  //       cardCreator: submittedCard?.cardCreator,
  //       cardIdUrl: `https://www.play.nexus/dashboard/cards/${submittedCard?.id}`
  //     });
  //   }

  // }, [submittedCard, cardRenderUrl, cardRenderUrlUpdated, postCardToDiscord])

  // Re-open snackbar when message changes
  useEffect(() => {
    if (snackbarMessage === "") {
      return;
    } else if (!openSnackbar) {
      setOpenSnackbar(true);
    }
  }, [snackbarMessage]);

  // Show card render when submitted
  useEffect(() => {
    if (submittedCard && !showCardRender) {
      setShowCardRender(true);
    }
  }, [submittedCard]);

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

      // Submit form data & get inserted row data
      const response = await fetch("/data/submit-card", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data
        }),
      });

      const submittedCardData = await response.json();
      if (submittedCardData) {
        setSubmittedCard(submittedCardData.data);
        setCardIdToUpdate(submittedCardData.data.id);
      }
      
      // Form submit success
      if (response.ok) {
        setAlertInfo({
          type: "success",
          icon: <Check />,
          message: "Card submitted successfully! Redirecting..."
        });
        
        if (submittedCardData.data) {

          // Convert HTML to PNG
          const imageDataUrl = await convertCardCodeToImage(
            "card-render-container"
          ); 

          console.log(`imageDataUrl: ${imageDataUrl}`)

          // Upload PNG to Supabase
          const imagePublicUrl = await uploadCardImage(
            imageDataUrl
          );

          setCardRenderUrl(imagePublicUrl);

          // console.log(`imagePublicUrl: ${imagePublicUrl}`) // Logs a very long URL
          console.log(`submittedCardData: ${submittedCardData}`) // logs [object Object]
          
          if (!imagePublicUrl) {
            setAlertInfo({
              type: "error",
              icon: <Error />,
              message: "Failed to upload card render.."
            });

          } else {
            // Update the card image of the submitted card

            console.log(`submittedCardData.data.id to update: ${submittedCardData?.data.id} `) // Logs the correct card id

            // const { data: cardRenderData, error: cardRenderError } = await supabase
            //   .from("cards")
            //   .update({ cardRender: imagePublicUrl })
            //   .eq("id", submittedCardData?.data.id)
            //   .select();
            
            // console.log(`cardRenderData: ${cardRenderData}`) // Logs nothing
            // cardRenderData: is not being updated in the Supabase table row

            // if (cardRenderError) {
            //   console.log(`cardRenderError: ${cardRenderError}`) // Logs the error
            //   setAlertInfo({
            //     type: "error",
            //     icon: <Error />,
            //     message: `Error submitting card: ${cardRenderError}`
            //   });
            // } else {

            // Placeholder
            if (!imagePublicUrl) {
              console.log(`cardRenderError: ${imagePublicUrl}`) // Logs the error
              setAlertInfo({
                type: "error",
                icon: <Error />,
                message: `Error submitting card: ${imagePublicUrl}`
              });
            } else {
              
              // Track event in PostHog
              if (
                submittedCardData?.data.user_id !== null && 
                submittedCardData?.data.user_id  !== undefined
              ) {
                posthog.capture({
                  distinctId: submittedCardData?.data.user_id,
                  event: '🎉 New Card Submitted'
                })
                // PostHog is working
              }

              if (submittedCardData?.data.id) {
                // setReadyToPostToDiscord(true);
                const cardId = submittedCardData?.data.id.toString();

                // if (cardRenderData && cardRenderData.length > 0) {
                //   const cardRenderUrl = cardRenderData.toString();
                //   // Post card to Discord
                //   console.log(`postToDiscord: ${postToDiscord}`);
                //   console.log(`cardId: ${cardId}`);
                //   if (postToDiscord && cardId) {
                //     postCardToDiscord({
                //       cardName: submittedCardData?.data.cardName,
                //       cardRender: cardRenderUrl,
                //       cardCreator: submittedCardData?.data.cardCreator,
                //       cardIdUrl: `https://www.play.nexus/dashboard/cards/${cardId}`
                //     });
                //     console.log(`Card posted to Discord: ${submittedCardData?.data.cardName} by ${submittedCardData?.data.cardCreator}! ${cardId} ${submittedCardData?.data.cardRender}`);
                //   }; 
                // }

                if (cardId) {
                  // Redirect to card page
                  setTimeout(() => {
                    setShowAlertInfo(false);
                    router.push(`/dashboard/cards/${cardId}`);
                  }, 5000);
                  console.log(`Redirecting to card page: /dashboard/cards/${cardId}`); // Logs the correct card id
                }
              }
            }
          }
        }
        
      } else {
        setAlertInfo({
          type: "error",
          icon: <Error />,
          message: `Error submitting card: ${submittedCardData.error}`
        });
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        icon: <Error />,
        message: `Error submitting card: ${error}`
      });
    }
  };
  
  return (
    <>
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
                        // !isValid || 
                        isSubmitting ||
                        isSubmitted ||
                        form.cardArt === "/images/card-parts/card-art/default-art.jpg"
                      }
                      color={isValid ? "success" : "secondary"}
                      startIcon={<Save />}
                      size="large" // Dynamically change size based on screen size
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
              "
            >
              {/* Card Creator Form */}
              <CardCreatorForm
                showCardRender={showCardRender}
                cardData={submittedCard}
              />
            </Box>
          </Box>
        </form>
      </FormProvider>
      {openSnackbar && (<Snackbar
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
      </Snackbar>)}
    </>
  );
}