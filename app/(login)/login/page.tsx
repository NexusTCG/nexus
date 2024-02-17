"use client";

import React, { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import clsx from "clsx";
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
  Button
} from "@mui/material";
import {
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const supabase = createClient();
  
  async function sendResetPassword() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: resetData, error } =
        await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setData((prev: { email: string; password: string }) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  };

  function handleMouseDownPassword(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
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
            Log in
            
          </Typography>
          <Typography
            variant="subtitle1"
            className="
              font-light
            "
          >
            Enter your credentials to continue
          </Typography>
        </Box>
        
        {!resetPassword && (
          <form
            action={"/auth/login-user"}
            method="post"
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
                  cta="Log in with Google"
                  provider="google"
                  disabled={false}
                />
                <OAuthButton
                  cta="Log in with Discord"
                  provider="discord"
                  disabled={false}
                />
                <OAuthButton
                  cta="Log in with GitHub"
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
                "
              >
                {/* Email input */}
                <FormControl
                  sx={{ m: 1, width: '25ch' }} 
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
                    type="email"
                    className="
                      w-full
                    "
                  />
                </FormControl>

                {/* Password Input */}
                <FormControl
                  sx={{ m: 1, width: '25ch' }} 
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
                <Typography
                  variant="subtitle2"
                  className="
                  text-neutral-400
                  hover:text-neutral-300
                    cursor-pointer
                    hover:underline
                    py-1
                  "
                >
                  Forgot your password?
                </Typography>
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={false}
                  // color={true ? "success" : "primary"}
                  color="primary"
                  size="large"
                  className="
                    w-full
                    mt-2
                  "
                >
                  Log in
                </Button>
                
              </Box>

              {/* <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                Sign In
              </button> */}

              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </Box>
          </form>
        )}

        {resetPassword && (
          <Box className="grid gap-4">
            <Box className="grid">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={data?.email}
                onChange={handleChange}
              />
            </Box>
            {success && (
              <Box className="bg-green-100 text-green-500 p-4 rounded">
                Success! Check your email for a link to reset your password.
              </Box>
            )}
            <Box>
              <button
                className="px-4 py-2 bg-blue-500 rounded cursor-pointer"
                onClick={sendResetPassword}
              >
                Reset my password
              </button>
            </Box>
          </Box>
        )}
        <p
          onClick={() => setResetPassword(!resetPassword)}
          className={clsx(
            "cursor-pointer hover:underline",
            resetPassword ? "text-green-500" : "text-foreground",
          )}
        >
          {resetPassword ? "Login" : "Reset password"}
        </p>
        {/* Conditionally render & Move inside form */}
        <Typography
          variant="subtitle1"
          className="cursor-pointer hover:underline"
        >
          Don&apos;t have an account? Sign up
        </Typography>
        <button
          formAction={"/auth/register-user"}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
      </Box>
    </Box>
  );
}
