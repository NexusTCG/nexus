"use client";

// Hooks
import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { 
  useForm, 
  FormProvider 
} from "react-hook-form";
import { useRouter } from "next/navigation";
import useSession from "@/app/hooks/useSession";
import { DashboardContext } from "@/app/context/DashboardContext";
// Actions
import convertCardCodeToImage from "@/app/lib/actions/convertCardCodeToImage";
import uploadCardImage from "@/app/lib/actions/supabase-data/uploadCardImage";
import { uploadCardArtImage } from "@/app/lib/actions/supabase-data/uploadCardArtImage";
import { postCardToDiscord } from "@/app/lib/actions/postCardToDiscord";
// Types
import { CardFormDataType } from "@/app/utils/types/types";
// Schema
import cardFormSchema from "@/app/utils/schemas/CardFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// Data
import { bannerMessages } from "@/app/utils/data/bannerMessages";
// Utils
import PostHogClient from "@/app/lib/posthog/posthog";
import clsx from "clsx";
import Link from "next/link";
// Custom components
import ArtPromptManager from "@/app/components/card-creator/ArtPromptManager";
import NexusCardForm from "@/app/components/card-creator/NexusCardForm";
import MessageBanner from "@/app/components/feedback/MessageBanner";
import RandomGameDesignTerm from "@/app/components/card-creator/RandomGameDesignTerm";
import IconsAbbreviationMenu from "@/app/components/card-creator/IconsAbbreviationMenu";
// Components
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";

export default function Create() {
  const { userProfileData } = useContext(DashboardContext);

  // Shorten form value names
  const methods = useForm<CardFormDataType>({
    defaultValues: {
      username: "",
      im_name: "",
      im_type: "entity",
      im_sub_type: [""],
      im_super_type: "default",
      im_grade: "core",
      im_text: "",
      im_lore_text: "",
      im_card_prompt: "",
      im_art_prompt: "",
      im_art_prompt_options: [],
      im_art: "/images/card-parts/card-art/default-art.jpg",
      im_render: "",
      im_energy_value: 0,
      im_energy_cost: {
        radiant: 0,
        volatile: 0,
        corrupt: 0,
        blaze: 0,
        verdant: 0,
        void: 0,
      },
      im_energy_alignment: "",
      im_unit_attack: "",
      im_unit_defense: "",
      im_unit_range: "melee",
      im_speed: "1",
      am_name: "Common Anomaly",
      am_type: "common",
      am_sub_type: "",
      am_super_type: "",
      am_grade: "core",
      am_text: "",
      am_lore_text: "",
      am_card_prompt: "",
      am_art_prompt: "",
      am_art_prompt_options: [],
      am_art: "/images/card-parts/card-art/default-anomaly-art.web",
      am_render: "",
    },
    resolver: zodResolver(cardFormSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: {
      isValid,
      isSubmitting,
      isSubmitted,
    },
  } = methods;

  // Utils
  const form = watch();
  const posthog = PostHogClient();
  const session = useSession();
  const router = useRouter();

  // States
  const [cardMode, setCardMode] = useState<"initial" | "anomaly">("initial");
  const [postToDiscord, setPostToDiscord] = useState<boolean>(true);
  // Feedback states
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [showAlertInfo, setShowAlertInfo] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    icon: React.ReactNode;
    message: string;
  } | null>(null);
  const [bannerMessage, setBannerMessage] = useState<{
    type: "warning" | "info" | "error";
    message: string;
  } | null>(null);

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

        let finalCardArt = data.im_art;

        if (finalCardArt) {
          const cardArtSupabaseUrl = await uploadCardArtImage(finalCardArt);
          if (cardArtSupabaseUrl) {
            finalCardArt = cardArtSupabaseUrl;
          }
        }
    
        if (imagePublicUrl && finalCardArt) {

          // Submit form data with cardRender
          const response = await fetch("/api/data/submit-card", { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...data,
              im_art: finalCardArt,
              im_render: imagePublicUrl,
            }),
          });

          const responseData = await response.json();

          if (
            response.ok && 
            responseData.data
          ) {
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
                cardName: responseData.data.im_name,
                cardRender: responseData.data.im_render,
                username: responseData.data.username,
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
        "username",
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

  // Set banner message
  useEffect(() => {
    if (!bannerMessage && bannerMessages) {
      setBannerMessage({
        type: bannerMessages.copyrightWarning.type,
        message: bannerMessages.copyrightWarning.message,
      });
    };
  }, [
    bannerMessages, 
    setBannerMessage, 
    bannerMessage
  ]);
  
  return (
    <>
      <FormProvider
        {...methods}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            h-full
            sm:h-[100vh]
          "
        >
          <Box
            id="create-page-container"
            className="
              flex
              flex-col
              sm:flex-row
              justify-start
              items-center
              w-full
              sm:h-screen
            "
          >
            {/* Center Content */}
            <Box
              id="center-content-container"
              className="
                flex
                flex-col
                justify-start
                items-center
                w-full
                sm:overflow-y-auto
                sm:max-h-screen
                scrollbar-hide
              "
            >
              {/* Create Header */}
              <Box
                id="create-header-container"
                className="
                  sticky
                  top-0
                  flex
                  flex-col
                  justify-start
                  items-start
                  w-full
                  border-b
                  border-neutral-700
                  bg-neutral-900
                  z-10
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
                    pl-4
                    pr-3
                    py-2
                  "
                >
                  {/* Card Name + Creator */}
                  <Box
                    id="card-name-creator-container"
                    className="
                      flex
                      flex-row
                      justify-start
                      items-baseline
                      gap-1.5
                    "
                  >
                    {/* Card Name */}
                    <Typography
                      variant="subtitle1"
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      {
                        form.im_name ? 
                        form.im_name : 
                        "Card Name"
                      }
                    </Typography>
                    {/* Card Creator*/}
                    <Typography
                      variant="overline"
                      sx={{ fontSize: "0.725rem" }}
                      className="text-teal-400"
                      component="span"
                    >
                      <Typography
                        variant="overline"
                        sx={{ fontSize: "0.725rem" }}
                        className="text-neutral-300"
                        component="span"
                      >
                        by {" "}
                      </Typography>
                        {
                          userProfileData?.username ? 
                          userProfileData?.username : 
                          "You"
                        }
                    </Typography>
                  </Box>

                  <Box
                    id="card-submit-container"
                    className="
                      flex
                      flex-col-reverse
                      md:flex-row
                      justify-end
                      items-end
                      md:justify-between
                      md:items-baseline
                    "
                  >
                    {/* Upload to Discord */}
                    {userProfileData && (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={postToDiscord}
                            onChange={handlePostToDiscordChange}
                            disabled={isSubmitting || isSubmitted}
                            size="small"
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
                              text-neutral-300
                            "
                          >
                            Post to {""}
                            <Tooltip title="Nexus' Discord Server">
                              <a
                                href="https://discord.gg/HENgvaAmk2"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Typography
                                  variant="caption"
                                  component="span"
                                  className="
                                  text-teal-500
                                  hover:text-teal-400
                                  hover:underline
                                  "
                                >
                                  Discord
                                </Typography>
                              </a>
                            </Tooltip>
                          </Typography>
                        }
                        className={clsx("hover:opacity-100 text-sm", {
                          "opacity-100": postToDiscord,
                          "opacity-50": !postToDiscord,
                        })}
                      />
                    )}
                    {userProfileData ? (
                      <>
                        {/* Save button */}
                        {!isSubmitting && !showAlertInfo ? (
                          <Tooltip title="Save your card">
                            <>
                              <Button
                                type="submit"
                                variant="outlined"
                                size="small"
                                disabled={
                                  !isValid ||
                                  isSubmitting ||
                                  isSubmitted ||
                                  form.im_type === null ||
                                  form.im_art === "/images/card-parts/card-art/default-art.jpg"
                                }
                                color={isValid ? "success" : "secondary"}
                                startIcon={<SaveIcon />}
                                className="
                                  hover:cursor-pointer
                                  hover:bg-teal-600/30
                                  hover:text-white
                                  hover:border-teal-600
                                "
                              >
                                Save
                              </Button>
                            </>
                          </Tooltip>
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
                      </>
                    ) : (
                      // Todo: Function to store card data in local storage then upload to Supabase after login
                      <Link href="/login">
                        <Button
                          variant="outlined"
                          size="small"
                          disabled={
                            !isValid ||
                            isSubmitting ||
                            isSubmitted ||
                            form.im_type === null ||
                            form.im_art === "/images/card-parts/card-art/default-art.jpg"
                          }
                          color={isValid ? "success" : "secondary"}
                          startIcon={<SaveIcon />}
                          className="
                            hover:cursor-pointer
                            hover:bg-teal-600/30
                            hover:text-white
                            hover:border-teal-600
                          "
                        >
                          Sign up & Save
                        </Button>
                      </Link>
                    )}
                  </Box>
                </Box>
                {/* Submit Loading Bar */}
                {isSubmitting && (
                    <LinearProgress
                      color="primary"
                      className="w-full h-1"
                    />
                  )}
              </Box>

              {/* Banner Message */}
              {bannerMessage && 
              bannerMessage !== undefined && (
                <MessageBanner
                  message={bannerMessage.message}
                  type={bannerMessage.type}
                />
              )}

              {/* Card Render */}
              <Box
                id="card-render-container"
                className="
                  flex
                  flex-col
                  justify-start
                  items-center
                  w-full
                  h-full
                  pb-6
                  pt-2
                  md:px-6
                  md:pt-4
                  md:pb-8
                  gap-4
                  border-b
                  border-neutral-700
                "
              >
                {/* Additional Options */}
                <Box
                  className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-full
                  "
                >
                  <FormGroup
                    row={true}
                  >
                    <Tooltip title={
                      cardMode === "initial" ? 
                      "Switch to Anomaly Mode" : 
                      "Switch to Initial Mode"
                    }>
                      <FormControlLabel
                        onChange={() => {
                          setCardMode(
                            cardMode === "initial" ? 
                            "anomaly" : 
                            "initial"
                          )
                        }}
                        control={
                          <Switch
                            // defaultChecked
                            checked={cardMode === "initial"}
                          />
                        } 
                        label={
                          cardMode === "initial" ? 
                          "Initial Mode" : 
                          "Anomaly Mode"
                        }
                      />
                    </Tooltip>
                    
                    {/* INITIAL MODE: Unit Range */}
                    {cardMode === "initial" &&
                    form.im_type && 
                    (
                      form.im_type.includes("entity") ||
                      form.im_type.includes("outpost")
                    ) && (
                      <FormControlLabel
                        onChange={() => {
                          form.im_unit_range === "melee" ? 
                          setValue("im_unit_range", "ranged") : 
                          setValue("im_unit_range", "melee")
                        }}
                        control={
                          <Checkbox
                            checked={form.im_unit_range === "ranged"}
                            size="small"
                          />
                        } 
                        label={
                          <Typography
                            variant="subtitle2"
                            className="
                            hover:text-neutral-400
                              font-medium
                            "
                          >
                            {
                              form.im_unit_range === "melee" ? 
                              "Melee" : "Ranged"
                            }
                          </Typography>
                        }
                      />
                    )}
                    {form.im_type && form.im_type !== "event" && (
                      <FormControlLabel
                        onChange={() => {
                          form.im_super_type === "default" || 
                          form.im_super_type === "" ? 
                          setValue("im_super_type", "mythic") : 
                          setValue("im_super_type", "default")
                        }}
                        control={
                          <Checkbox
                            checked={form.im_super_type === "mythic"}
                            size="small"
                          />
                        } 
                        label={
                          <Typography
                            variant="subtitle2"
                            className="
                            hover:text-neutral-400
                              font-medium
                            "
                          >
                            Mythic
                          </Typography>
                        }
                      />
                    )}
                  </FormGroup>
                  {/* Alerts */}
                  <Box
                    className="
                      flex
                      flex-col
                      justify-start
                      items-start
                      w-full
                    "
                  >
                    {
                      form.im_type && 
                      form.im_type.length === 1 && 
                      form.im_type.includes("") && (
                      <Typography
                        variant="body2"
                        className="
                          flex 
                          justify-center
                          items-center
                          w-full
                          py-2
                          rounded-sm
                          bg-red-500/20
                          text-red-500
                        "
                      >
                        Card type is required!
                      </Typography>)
                    }
                  </Box>
                </Box>

                {/* Div is for screenshot */}
                <div 
                  id="nexus-form-container" 
                  style={{ 
                    borderRadius: "12.5px" 
                  }}
                >
                  {/* Card Render / Form */}
                  <NexusCardForm
                    cardMode={cardMode}
                  />
                </div>

                {cardMode === "anomaly" && (
                  <Typography
                    variant="body2"
                    className="
                      flex 
                      justify-center
                      items-center
                      w-full
                      bg-neutral-900/50
                      py-2
                      px-3
                    "
                  >
                    {"Each Nexus card has an initial mode (the card above), and an anomaly mode. Cards can be converted to its anomaly mode, so it can be played as an anomaly (resource card) instead of its initial mode card. The anamoly mode typically lets you Lock {L} the card to make energy. But a card's anomaly mode can also have other effects. The default anomaly mode, converts the card into one of the five Common Anomalies. Anything other than that is considered an Uncommon Anomaly."}
                  </Typography>
                )}
              </Box>

              <Box
                id="create-form-tips"
                className="
                  flex
                  flex-col
                  xl:flex-row
                  justify-start
                  items-start
                  w-full
                  gap-4
                  p-4
                "
              >
                {/* Random Term & Keyword */}
                <Box
                  id="random-term-keyword-container"
                  className="
                    flex
                    flex-col
                    justify-start
                    items-start
                    w-full
                    gap-4
                  "
                >
                  {/* Random Glossary Term */}
                  <RandomGameDesignTerm
                    type="term"
                  />
                  {/* Random Keyword */}
                  <RandomGameDesignTerm
                    type="keyword"
                  />
                </Box>
                {/* Abbreviations */}
                <IconsAbbreviationMenu />
              </Box>
            </Box>
            {/* Side Content Container */}
            <Box
              id="side-content-container"
              className="
                sm:sticky 
                sm:top-0
                flex
                flex-col
                justify-start
                items-center
                w-full 
                max-w-[480px]
                sm:min-h-screen
                border
                sm:border-l 
                border-neutral-700
                bg-neutral-800
                sm:overflow-y-auto
                scrollbar-hide
                mb-6
                sm:mb-0
              "
            >
              {/* Component That Renders All Sections */}
              <ArtPromptManager />
            </Box>
          </Box>
        </form>
      </FormProvider>

      {/* Snackbar */}
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
  );
}