"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterFormSchema from "@/app/utils/schemas/RegisterFormSchema";
import LoginFormSchema from "@/app/utils/schemas/LoginFormSchema";
import PasswordResetSchema  from "@/app/utils/schemas/PasswordResetSchema";
import { createClient } from "@/app/lib/supabase/client";
import OAuthButton from "@/app/components/auth/OAuthButton";
import Image from "next/image";
import Link from "next/link"
import clsx from "clsx";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress
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
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [showPasswordResetAlert, setShowPasswordResetAlert] = useState<boolean>(false);
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState<boolean>(true);
  const [authBg, setAuthBg] = useState<number | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);
  
  const supabase = createClient();
  // const authBg = Math.floor(Math.random() * 13) + 1;
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      ...(showSignUp ? { confirmPassword: "" } : {}),
    },
    resolver: zodResolver(showSignUp ? RegisterFormSchema : LoginFormSchema),
    mode: "onChange"
  });

  // Methods for auth form
  const {
    register,
    handleSubmit,
    watch,
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

  const form = watch();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Set random background image
  useEffect(() => {
    if (authBg !== null) return;
    const randomBg = Math.floor(Math.random() * 13) + 1;
    setAuthBg(randomBg);
  }, []);

  // Check if passwords match
  useEffect(() => {
      if (!showSignUp) {
        return;
      } else {
        if (
          password === confirmPassword
        ) {
          setConfirmPasswordMatch(true);
        } else if (
          password !== confirmPassword
        ) {
          setConfirmPasswordMatch(false);
        }
      }
  }, [
    showSignUp, 
    password, 
    confirmPassword
  ]);

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
  async function onPasswordReset(
    data: PasswordResetFormData
  ) {
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
    setTimeout(() => {
      setShowPasswordResetAlert(false)
    }, 5000);
  };

  // Form submission function
  async function onSubmit(data: {
    email: string;
    password: string
  }) {
    const { email, password } = data;
    const endpoint = showSignUp ? "/auth/register-user" : "/auth/login-user";

    console.log('im here')
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
          password,
        })
      });

      const resultUrl = response.url;

      if (!response.ok) {
        const result = await response.json();
        setShowLoginAlert(true);
        if(showSignUp) {
          if (result.error && result.error.includes("Password is known to be weak and easy to guess, please choose a different one.")) {
            setAlertInfo({
              type: "error",
              message: "Your password is too easy to guess. Please choose a stronger password."
            });
          } 
        } else {
          setAlertInfo({
            type: "error",
            message: "Failed to process request. Please try again."
          });
        }
      } else if (response.ok) {
        window.location.href = resultUrl;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertInfo({
        type: "error",
        message: "An unexpected error occurred. Please try again."
      });
    };

    setTimeout(() => {
      setShowLoginAlert(true);
    }, 10000);
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
        lg:flex-row-reverse
        justify-center
        lg:justify-between
        items-center
        w-full
        h-[100vh]
        bg-neutral-950
        lg:px-48
        px-8
        lg:gap-12
        gap-8
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
        id="login-logo-container"
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
              onSubmit={(e) => {
                console.log(e)
                methods.clearErrors()
                handleSubmit(onSubmit)(e)
                // handleSubmit(onSubmit)
              }}
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
                  gap-4
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
                    gap-2
                  "
                >
                  <OAuthButton
                    cta={showSignUp ? "Sign up with Google" : "Log in with Google"}
                    provider="google"
                    disabled={false}
                  />
                  <OAuthButton
                    cta={showSignUp ? "Sign up with GitHub" : "Log in with GitHub"}
                    provider="github"
                    disabled={false}
                  />
                  <OAuthButton
                    cta={showSignUp ? "Sign up with Discord" : "Log in with Discord"}
                    provider="discord"
                    disabled={false}
                  />
                  <OAuthButton
                    cta={showSignUp ? "Sign up with Twitch" : "Log in with Twitch"}
                    provider="twitch"
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
                  <Box
                    id="email-password-container"
                    className="
                      flex
                      flex-col
                      justify-center
                      items-center
                      w-full
                      gap-2
                    "
                  >
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
                          <InputAdornment
                            position="end"
                            className="
                              mr-2
                            "
                          >
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
                    {!errors.password && showSignUp && form.password !== "" && (
                      <Typography
                        variant="caption"
                        display="block"
                        className="
                          text-neutral-400
                        "
                      >
                        Passwords must be at least 8 characters long and contain numbers, letters, and special characters.
                      </Typography>
                    )}
                    {errors.password && (
                      <Typography
                        color="error"
                        variant="caption"
                        display="block"
                      >
                        {errors.password.message}
                      </Typography>
                    )}

                    {/* Confirm Password Input */}
                    {showSignUp && (
                      <FormControl
                        variant="outlined"
                        className="w-full"
                      >
                        <InputLabel
                          htmlFor="confirm-password-input"
                        >
                          Confirm password
                        </InputLabel>
                        <OutlinedInput
                          id="confirm-password-input"
                          label="Confirm password"
                          placeholder="••••••••"
                          {...register("confirmPassword")}
                          error={Boolean(errors.password)}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment
                              position="end"
                              className="
                                mr-2
                              "
                            >
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
                    )}

                    {showSignUp && (
                      <Typography
                        variant="body2"
                        className={clsx("",
                          {
                            "text-green-500": confirmPasswordMatch,
                            "text-red-500": !confirmPasswordMatch
                          }
                        )}
                      >
                        {confirmPasswordMatch ? "Passwords match." : "Passwords do not match."}
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
                  </Box>

                  {/* Terms of Service Checkbox */}
                  {showSignUp && (
                    <Box
                      id="terms-checkbox-container"
                      className="
                        flex
                        flex-row
                        justify-between
                        items-center
                        w-full
                        gap-8
                      "
                    >
                      <Typography
                        variant="caption"
                        component="span"
                        className="
                        flex-grow
                        flex-row
                        flex-wrap
                        justify-start
                        items-center
                        gap-1
                        text-neutral-400
                        "
                      >
                        By signing up, you agree to our {""}
                        <Link
                          href="/terms"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Typography
                            variant="caption"
                            className="
                            text-teal-500
                            hover:text-teal-400
                            "
                          >
                            Terms of Service
                          </Typography>
                        </Link>
                        {""} and {""}
                        <Link
                          href="/policies"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Typography
                            variant="caption"
                            className="
                            text-teal-500
                            hover:text-teal-400
                            "
                          >
                            Policies
                          </Typography>
                        </Link>
                      </Typography>
                      <FormControlLabel
                        required
                        control={
                          <Checkbox
                            defaultChecked
                            onClick={() => setCheckedCheckbox(!checkedCheckbox)}
                          />
                        }
                        label="Required"
                        className="
                          justify-start
                          items-center
                          w-2/5
                          -mr-2
                        "
                      />
                    </Box>
                  )}

                  {/* Sign Up Button */}
                  {showSignUp && checkedCheckbox && ( 
                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={
                        isSubmitting && 
                        isValid && 
                        !checkedCheckbox 
                        ? true : false
                      }
                      color={isValid ? "success" : "primary"}
                      size="large"
                      className="
                        w-full
                        gap-2
                      "
                    >
                      {isSubmitting ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <CircularProgress
                            size={24}
                            color="inherit"
                          />
                          <Typography
                            variant="button" 
                            sx={{ 
                              textTransform: 'none'
                            }}
                          >
                            Signing up...
                          </Typography>
                        </Box>
                      ) : "Sign up"}
                    </Button>
                  )}
                  {/* Sign In Button */}
                  {!showSignUp && ( 
                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={
                        isSubmitting && 
                        isValid 
                        ? true : false
                      }
                      color={isValid ? "success" : "primary"}
                      size="large"
                      className="
                        w-full
                      "
                    >
                      {isSubmitting ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <CircularProgress
                            size={24}
                            color="inherit"
                          />
                          <Typography
                            variant="button" 
                            sx={{ 
                              textTransform: 'none'
                            }}
                          >
                            Signing in...
                          </Typography>
                        </Box>
                      ) : "Sign in"}
                    </Button>
                  )}

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
              
              {/* Password Reset Toggle Options */}
              <Box
                id="reset-password-container"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-full
                  gap-2
                  mt-2
                "
              >
                <Typography
                  variant="subtitle2"
                  onClick={() => {
                    setShowResetPassword(!showResetPassword )
                    setShowSignUp(false)
                  }}
                  className="
                  text-neutral-400
                  hover:text-neutral-300
                    cursor-pointer
                    hover:underline
                  "
                >
                  Remember your password? Log in
                </Typography>
                <Box
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
                    Don&apos;t have an account?
                  </Typography>
                  <Typography
                    onClick={() => {
                      setShowResetPassword(!showResetPassword )
                      setShowSignUp(true)
                    }}
                    variant="subtitle2"
                    className="
                    text-teal-500
                    hover:text-teal-300
                      cursor-pointer
                      hover:underline
                    "
                  >
                    Create account
                  </Typography>
                </Box>
              </Box>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}
