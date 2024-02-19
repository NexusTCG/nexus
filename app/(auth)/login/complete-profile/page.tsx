"use client";

import React, { useState, useEffect } from "react";
import useSession from "@/app/hooks/useSession";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileFormSchema from "@/app/utils/schemas/ProfileFormSchema";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { debounce } from "lodash";
import {
  Box,
  Typography,
  OutlinedInput,
  InputLabel,
  TextField,
  Button,
  FormControl,
  Alert
} from "@mui/material";
import {
  Check,
  Error
} from "@mui/icons-material";
import checkUsernameUnique from "@/app/lib/actions/supabase-data/checkUsernameUnique";

export default function CompleteProfile() {
  const supabase = createClient();
  const router = useRouter();
  const session = useSession();
  const methods = useForm({
    defaultValues: {
      id: "",
      username: "",
      first_name: "",
      last_name: "",
      // avatar_url: "",
      bio: "",
    },
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: {
      errors,
      isValid,
      isSubmitting
    },
  } = methods;

  const [authBg, setAuthBg] = useState<number | null>(null);
  const [showSubmitAlert, setShowSubmitAlert] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);

  const watchId = watch("id");
  const debouncedCheckUsernameUnique = debounce(checkUsernameUnique, 300);

  // Randomize the background image
  useEffect(() => {
    if (authBg !== null) return;
    const randomBg = Math.floor(Math.random() * 13) + 1;
    setAuthBg(randomBg);
  }, []);

  // Handle the form submission
  async function onSubmit(data: {
    username: string,
    first_name: string,
    last_name: string,
    bio: string
  }) {
    console.log("Form submitted", data);
    const {
      username,
      first_name,
      last_name,
      bio
    } = data;

    try {
      if (!session?.user.id) return;
      if (watchId === "") {
        setValue("id", session?.user.id);
        await trigger("id");
      }

      const { error } = await supabase
        .from("profiles")
        .insert({
          id: session?.user.id,
          username: username,
          first_name: first_name,
          last_name: last_name,
          avatar_url: "",
          bio: bio
        })

      if (error) {
        setAlertInfo({
          type: "error",
          message: "Error creating profile. Please try again."
        });
      } else if (!error) {
        // TODO: Log new user in PostHog

        setAlertInfo({
          type: "success",
          message: `Profile created successfully! Redirecting in ${countdown}...`
        });

        setShowCountdown(true);
        const countdownInterval = setInterval(() => {
          setCountdown((countdown) => {
            if (countdown <= 1) {
              clearInterval(countdownInterval);
              router.push("/dashboard");
              return 0;
            }
            return countdown - 1;
          });
        }, 1000);
      }

    } catch (error) {
      setAlertInfo({
        type: "error",
        message: "Error creating profile. Please try again."
      });
    }
    setShowSubmitAlert(true);
  };

  return (
    <Box
      id="complete-profile-outer-container"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      className="
        flex
        flex-col
        lg:flex-row-reverse
        justify-center
        lg:justify-between
        items-center
        w-full
        h-[100vh]
        bg-neutral-950
        lg:px-48
        px-8
        lg:gap-24
        gap-12
        pb-8
        lg:pb-0
      "
    >
      {authBg && (<Image
        src={`/images/auth-bg/nexus-auth-bg-${authBg}.jpg`}
        alt="Nexus background"
        fill
        style={{ objectFit: "cover"}}
        className="
          opacity-25
        "
      />)}
      <Box
        id="complete-profile-logo-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          lg:h-full
          lg:gap-16
          lg:pb-8
          z-10
        "
      >
        <Image
          src="/images/nexus-logo.png"
          alt="Nexus logo"
          width={240}
          height={58}
          priority
          className="
            block
            lg:hidden
          "
        />
        <Image
          src="/images/nexus-logo.png"
          alt="Nexus logo"
          width={480}
          height={116}
          priority
          className="
            hidden
            lg:block
          "
        />
        <Typography
          variant="subtitle1"
          className="
            lg:text-4xl
            font-medium
            text-center
            text-white
            hidden
            lg:block
          "
        >
          AI-POWERED <br />
          OPEN SOURCE <br />
          DIGITAL TCG
        </Typography>
      </Box>
      <Box
        id="complete-profile-inner-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          max-w-md
          p-4
          gap-4
          rounded-md
          bg-neutral-800/90
          backdrop-blur-sm
          border
          border-neutral-700
          shadow-xl
          shadow-neutral-950/50
          lg:shadow-neutral-950/70
          z-10
        "
      >
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Box
              id="complete-profile-form-container"
              className="
                flex
                flex-col
                justify-center
                items-center
                w-full
                gap-6
                animate-in
              "
            >
              {/* Welcome Message */}
              <Box
                id="complete-profile-form-header"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-full
                "
              >
                {session?.user.email && (<Typography
                  variant="overline"
                  className="
                    font-medium
                    text-teal-500
                  "
                >
                  Hi, {session?.user.email}!
                </Typography>)}
                <Typography
                  variant="h4"
                  className="
                    font-medium
                    text-white
                  "
                >
                  Complete your profile to continue
                </Typography>
              </Box>
              
              <Box
                id="complete-profile-form-inputs-container"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-full
                  gap-4
                "
              >
                {/* Username input */}
                <FormControl
                  variant="outlined"
                  className="w-full"
                >
                  <InputLabel
                    htmlFor="username-input"
                  >
                    Username <span className="text-red-500">*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="username-input"
                    label="Username"
                    placeholder="Your username"
                    {...register("username", {
                      required: "Username is required",
                      validate: async (
                        value: string
                      ) => await debouncedCheckUsernameUnique(value) || "Username is already taken."
                    })}
                    error={Boolean(errors.username)}
                    type="text"
                    className="
                      w-full
                    "
                  />
                </FormControl>
                {errors.username && (
                  <Typography
                    color="error"
                    variant="caption"
                    display="block"
                  >
                    {errors.username.message}
                  </Typography>
                )}

                {/* First name input */}
                <FormControl
                  variant="outlined"
                  className="w-full"
                >
                  <InputLabel
                    htmlFor="first-name-input"
                  >
                    First name
                  </InputLabel>
                  <OutlinedInput
                    id="first-name-input"
                    label="First name (optional)"
                    placeholder="Your first name"
                    {...register("first_name")}
                    type="text"
                    className="
                      w-full
                    "
                  />
                </FormControl>

                {/* First name input */}
                <FormControl
                  variant="outlined"
                  className="w-full"
                >
                  <InputLabel
                    htmlFor="last-name-input"
                  >
                    Last name
                  </InputLabel>
                  <OutlinedInput
                    id="last-name-input"
                    label="Last name (optional)"
                    placeholder="Your last name"
                    {...register("last_name")}
                    type="text"
                    className="
                      w-full
                    "
                  />
                </FormControl>

                {/* Bio input */}
                <FormControl
                  variant="outlined"
                  className="w-full"
                >
                  <TextField
                    multiline
                    id="bio-input"
                    label="Bio (optional)"
                    placeholder="Your bio"
                    {...register("bio")}
                    type="text"
                    rows={2}
                    className="
                      w-full
                    "
                  />
                </FormControl>
              </Box>

              {/* Login Alert */}
              {showSubmitAlert && showCountdown && (
                <Alert
                  icon={
                    alertInfo?.type === "success" ?
                    <Check fontSize="inherit" /> : 
                    <Error fontSize="inherit" />
                  }
                  severity={alertInfo?.type}
                  className="w-full"
                >
                  {alertInfo?.message}
                </Alert>
              )}

              {/* Form submit button */}
              <Button
                type="submit"
                variant="outlined"
                disabled={isSubmitting || !isValid ? true : false}
                color={"primary"}
                size="large"
                className="
                  w-full
                "
              >
                Complete profile
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}