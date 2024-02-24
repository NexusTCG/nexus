"use client";

import React, {
  useState,
  useEffect,
  useContext,
  useRef
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
  const { userProfileData } = useContext(DashboardContext);

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
  const posthog = PostHogClient();
  const session = useSession();
  const router = useRouter();

  // States
  const [submittedFormData, setSubmittedFormData] = useState<CardFormDataType | null>(null);
  const [uploadedFormData, setUploadedFormData] = useState<CardsTableType | null>(null);
  const [submitSuccessful, setSubmitSuccessful] = useState<boolean>(false);
  const [postToDiscord, setPostToDiscord] = useState<boolean>(true);
  const [showSimpleCardRender, setShowSimpleCardRender] = useState<boolean>(true);
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);

  const cardRenderRef = useRef(null);

  // Set user_id and cardCreator
  // values based on user session
  useEffect(() => {
    if (session?.user?.id) {
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
    if (submittedFormData && cardRenderRef.current) {
      const screenshotAndUploadCardData = async () => {
        // Convert HTML to PNG
        const imageDataUrl = await convertCardCodeToImage(
          "card-render-container"
        ); 

        // Upload PNG to Supabase
        const imagePublicUrl = await uploadCardImage(
          imageDataUrl
        );

        if (!imagePublicUrl) {
          console.log(`cardRenderUrl update error: ${imagePublicUrl}`)
        }

        if (imagePublicUrl) {
          // Submit form data with cardRender
          const response = await fetch("/data/submit-card", { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...submittedFormData,
              cardRender: imagePublicUrl,
            }),
          });

          if (!response.ok) {
            console.log("card submit error:", response.json());
          };

          // Update state to include card id, and cardRender
          const responseData = await response.json();
          setUploadedFormData(responseData.data);

          if (response.ok && responseData.data) {
            setAlertInfo({
              type: "success",
              icon: <Check />,
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
            if (postToDiscord && responseData.data) {
              postCardToDiscord({
                cardName: responseData.data.cardName,
                cardRender: responseData.data.cardRender,
                cardCreator: responseData.data.cardCreator,
                cardIdUrl: `https://www.play.nexus/dashboard/cards/${responseData.data.id}`
              });
            }

            // Update form submission state
            setSubmitSuccessful(true);

          } else {
            setAlertInfo({
              type: "error",
              icon: <Error />,
              message: "Error submitting card!"
            });
          }
          console.log("card submit error:", response);

        } else {
          setAlertInfo({
            type: "error",
            icon: <Error />,
            message: "Error uploading card render! Submission failed."
          });
        }
      };

      screenshotAndUploadCardData();
    }
  }, [
    submittedFormData,
    cardRenderRef.current
  ]);
  // setShowSimpleCardRender(false);

  // Redirect to card page on successful submission
  useEffect(() => {
    if (uploadedFormData) {
      const redirectToCardPage = async () => {
        setTimeout(() => {
          setShowSimpleCardRender(false);
          setShowAlertInfo(false);
          router.push(`/dashboard/cards/${uploadedFormData.id}`);
        }, 5000);
      }
      redirectToCardPage();
    }
  }, [
    submitSuccessful, 
    uploadedFormData
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
      setShowAlertInfo(true);
      setSubmittedFormData(data);
    } catch (error) {
      setAlertInfo({
        type: "error",
        icon: <Error />,
        message: `Error submitting card: ${error}`
      });
    }
    console.log("Submitted form data:", data);
    console.log("Submitted form data:", submittedFormData);
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
                      size="large" // TODO: Dynamically change size based on screen size
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
                cardData={uploadedFormData ? uploadedFormData : submittedFormData}
                showSimpleCardRender={showSimpleCardRender}
                cardRenderRef={cardRenderRef}
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