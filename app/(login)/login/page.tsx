"use client";

import React, { useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, SignUpSchema } from "@/app/utils/schemas/AuthFormSchema";
import PasswordResetSchema  from "@/app/utils/schemas/PasswordResetSchema";
import { createClient } from "@/app/lib/supabase/client";
import OAuthButton from "@/app/components/auth/OAuthButton";
import Image from "next/image";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Alert
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Check,
  Error
} from "@mui/icons-material";

type PasswordResetFormData = {
  resetEmail: string;
}

export default function AuthForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [showPasswordResetAlert, setShowPasswordResetAlert] = useState<boolean>(false);
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);
  
  const supabase = createClient();
  const formSchema = showSignUp ? SignUpSchema : LoginSchema;
  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  // Methods for auth form
  const {
    register,
    handleSubmit,
    formState: {
      isValid,
      errors,
      isSubmitting
    }
  } = methods;

  // Methods for password reset form
  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: {
      errors: resetErrors,
      isValid: isResetValid
    },
    reset,
  } = useForm({
    resolver: zodResolver(PasswordResetSchema),
    mode: "onChange",
  });

  // Password visibility toggle
  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  };

  // Prevent default on password visibility toggle
  function handleMouseDownPassword(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
  };

  // Reset password function
  async function onPasswordReset(data: PasswordResetFormData) {
    try {
      const { resetEmail } = data;
      const {
        error
      } = await supabase
        .auth
        .resetPasswordForEmail(resetEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
      if (error) throw error;
      setAlertInfo({
        type: "success",
        message: "Success! Check your email for a link to reset your password."
      });
      reset();
    } catch (error) {
      console.error(error);
      setAlertInfo({
        type: "error",
        message: "An unexpected error occurred. Please try again."
      });
    }
    setShowPasswordResetAlert(true);
  };

  // Form submission function
  async function onSubmit(data: {
    username?: string;
    email: string;
    password: string
  }) {
    const { username, email, password } = data;
    const endpoint = showSignUp ? "/auth/register-user" : "/auth/login-user";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
          password,
          ...(showSignUp && { username }),
        })
      });

      const resultUrl = response.url;

      if (response.ok) {
        window.location.href = resultUrl;
      } else {
        setAlertInfo({
          type: "error",
          message: "Failed to process request. Please try again."
        });
        setShowLoginAlert(true);
      };

    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertInfo({
        type: "error",
        message: "An unexpected error occurred. Please try again."
      });
      setShowLoginAlert(true);
    };
  };

  return (
    <Box
      id="login-outer-container"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      className="
        flex
        flex-col
        justify-center
        items-center
        lg:items-start
        w-full
        h-[100vh]
        bg-neutral-950
        lg:px-48
        px-8
      "
    >
      <Image
        src="/images/nexus-404.png"
        alt="Nexus background"
        fill
        style={{ objectFit: "cover"}}
        className="
          opacity-10
          lg:opacity-20
        "
      />
      <Box
        id="login-inner-container"
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
        {!showResetPassword ? (
        <Box
          id="login-header-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            gap-2
          "
        >
          <Typography
            variant="h4"
            className="
              font-medium
              text-white
            "
          >
            {showSignUp ? "Sign up" : "Log in"}
          </Typography>
          <Typography
            variant="subtitle1"
            className="
              font-light
              text-neutral-400
            "
          >
            {showSignUp ? "Enter your credentials to sign up" : "Enter your credentials to log in"}
          </Typography>
        </Box>
        ) : (
        <Box
          id="password-reset-header-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            gap-2
          "
        >
          <Typography
            variant="h4"
            className="
              font-medium
              text-white
            "
          >
            Reset password
          </Typography>
          <Typography
            variant="subtitle1"
            className="
              font-light
              text-neutral-400
            "
          >
            Enter your email to reset your password
          </Typography>
        </Box>
        )}
        
        {!showResetPassword && (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
            >
              <Box
                id="login-form-container"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-full
                  gap-2
                  animate-in
                "
              >
                <Box
                  id="oath-buttons-container"
                  className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-full
                    gap-4
                  "
                >
                  <OAuthButton
                    cta={showSignUp ? "Sign up with Google" : "Log in with Google"}
                    provider="google"
                    disabled={false}
                  />
                  <OAuthButton
                    cta={showSignUp ? "Sign up with Discord" : "Log in with Discord"}
                    provider="discord"
                    disabled={false}
                  />
                  <OAuthButton
                    cta={showSignUp ? "Sign up with GitHub" : "Log in with GitHub"}
                    provider="github"
                    disabled={false}
                  />
                </Box>

                <Box
                  id="login-separator-container"
                  className="
                    flex
                    flex-row
                    justify-center
                    items-center
                    w-full
                    gap-2
                    mt-2
                    px-4
                  "
                >
                  <Box
                    className="
                      w-full
                      h-[1px]
                      bg-neutral-500
                    "
                  />
                  <Typography
                    variant="overline"
                  >
                    {""} or {""}
                  </Typography>
                  <Box
                    className="
                      w-full
                      h-[1px]
                      bg-neutral-500
                    "
                  />
                </Box>

                <Box
                  id="login-inputs-container"
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
                  {showSignUp &&(<FormControl
                    variant="outlined"
                    className="w-full"
                  >
                    <InputLabel
                      htmlFor="username-input"
                    >
                      Username
                    </InputLabel>
                    <OutlinedInput
                      id="username-input"
                      label="Username"
                      placeholder="Your username"
                      {...register("username")}
                      error={Boolean(errors.username)}
                      className="
                        w-full
                      "
                    />
                  </FormControl>)}

                  {/* Email input */}
                  <FormControl
                    variant="outlined"
                    className="w-full"
                  >
                    <InputLabel
                      htmlFor="email-input"
                    >
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="email-input"
                      label="Email"
                      placeholder="your@email.com"
                      {...register("email")}
                      error={Boolean(errors.email)}
                      type="email"
                      className="
                        w-full
                      "
                    />
                  </FormControl>
                  {errors.email && (
                    <Typography
                      color="error"
                      variant="caption"
                      display="block"
                    >
                      {errors.email.message}
                    </Typography>
                  )}

                  {/* Password Input */}
                  <FormControl
                    variant="outlined"
                    className="w-full"
                  >
                    <InputLabel
                      htmlFor="password-input"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password-input"
                      label="Password"
                      placeholder="••••••••"
                      {...register("password")}
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      className="
                        w-full
                      "
                    />
                  </FormControl>
                  {errors.password && (
                    <Typography
                      color="error"
                      variant="caption"
                      display="block"
                    >
                      {errors.password.message}
                    </Typography>
                  )}

                  {/* Password reset toggle */}
                  <Typography
                    variant="subtitle2"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    className="
                    text-neutral-400
                    hover:text-neutral-300
                      cursor-pointer
                      hover:underline
                    "
                  >
                    Forgot your password?
                  </Typography>

                  {/* Form submit button */}
                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={isSubmitting && isValid ? true : false}
                    color={isValid ? "success" : "primary"}
                    size="large"
                    className="
                      w-full
                    "
                  >
                    {!showSignUp ? "Log in" : "Sign up"}
                  </Button>

                  {/* Register toggle */}
                  <Box
                    id="register-container"
                    className="
                      flex
                      flex-row
                      justify-center
                      items-center
                      w-full
                      gap-1
                    "
                  >
                    <Typography
                      variant="subtitle2"
                      component="span"
                      className="
                      text-neutral-400
                      "
                    >
                      {showSignUp ? "Already have an account?" : "Don't have an account?"}
                    </Typography>
                    <Typography
                      onClick={() => setShowSignUp(!showSignUp)}
                      variant="subtitle2"
                      className="
                      text-teal-500
                      hover:text-teal-300
                        cursor-pointer
                        hover:underline
                      "
                    >
                      {showSignUp ?  "Log in" : "Create account"}
                    </Typography>
                  </Box>
                </Box>

                {/* Login Alert */}
                {showLoginAlert && (
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

                {/* Callback Message */}
                {searchParams?.message && (
                  <Alert
                    severity="info"
                    className="w-full"
                  >
                    {searchParams.message}
                  </Alert>
                )}
              </Box>
            </form>
          </FormProvider>
        )}

        {/* Password Reset */}
        {showResetPassword && (
          <Box
            id="password-reset-container"
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
            "
          >
            {/* Email Password Reset Input */}
            <form
              onSubmit={handleResetSubmit(
                (data: FieldValues) => onPasswordReset(
                  data as PasswordResetFormData
                ))}
              className="
                flex
                flex-col
                justify-center
                items-center
                w-full
                gap-4
              "
            >
              <FormControl
                variant="outlined"
                error={Boolean(resetErrors.resetEmail)}
                className="w-full"
              >
                <InputLabel
                  htmlFor="password-reset-input"
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  id="password-reset-input"
                  type="email"
                  {...registerReset("resetEmail")}
                  label="Email"
                  placeholder="Your email"
                  className="w-full"
                />
                {resetErrors.resetEmail &&
                  typeof resetErrors.resetEmail.message ===
                  "string" && (
                  <Typography
                    color="error"
                    variant="caption"
                    display="block"
                  >
                    {resetErrors.resetEmail.message}
                  </Typography>
                )}
              </FormControl>
              {showPasswordResetAlert && (
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
              <Button
                type="submit"
                variant="outlined"
                disabled={!isResetValid || isSubmitting}
                color="primary"
                size="large"
                className="
                  w-full
                "
              >
                Reset password
              </Button>
              <Typography
                variant="subtitle2"
                onClick={() => setShowResetPassword(!showResetPassword)}
                className="
                text-neutral-400
                hover:text-neutral-300
                  cursor-pointer
                  hover:underline
                "
              >
                Remember your password? Sign in
              </Typography>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}
