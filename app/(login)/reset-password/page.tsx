"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordSchema from "@/app/utils/schemas/PasswordSchema";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Typography,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  Button,
  Alert
} from "@mui/material";
import {
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(PasswordSchema),
    mode: "onChange"
  });

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
  const form = watch();

  // Check if passwords match
  useEffect(() => {
    if (form.password !== form.confirmPassword) {
      setAlertInfo({
        type: "error",
        message: "Passwords do not match! Please try again."
      });
      setShowAlert(true);
    } else if (
        form.password === form.confirmPassword &&
        form.password !== "" && form.confirmPassword !== "" &&
        form.password.length >= 8 && form.confirmPassword.length >= 8
      ) {
      setAlertInfo({
        type: "success",
        message: "Passwords match!"
      });
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [form.password, form.confirmPassword]);

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

  // Refactor function
  async function onSubmit(data: {
    password: string;
    confirmPassword: string;
  }) {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setAlertInfo({
        type: "error",
        message: "Passwords do not match! Please try again."
      });
      setShowAlert(true);
    }

    try {
      const {
        data: resetData,
        error
      } = await supabase
        .auth
        .updateUser({
        password: data.password,
      });
  
      if (resetData) {
        setAlertInfo({
          type: "success",
          message: "Success! Your password has been reset. Redirecting to login..."
        });
        
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
  
        router.push("/login");
      }
      if (error) console.log(error);
    } catch (error) {
      setAlertInfo({
        type: "error",
        message: "An error occurred. Please try again."
      });
      setShowAlert(true);
    };
  };

  return (
    <Box
      id="reset-password-outer-container"
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
        id="reset-password-inner-container"
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
          id="reset-password--header-container"
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
            Enter your new password to log in
          </Typography>
        </Box>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <Box
              id="reset-password-inputs-container"
              className="
                flex
                flex-col
                justify-center
                items-center
                w-full
                gap-4
              "
            >
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

              {/* Confirm Password Input */}
              <FormControl
                variant="outlined"
                className="w-full"
              >
                <InputLabel
                  htmlFor="confirm-password-input"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="confirm-password-input"
                  label="Confirm password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
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

              {showAlert && (<Alert
                severity={alertInfo?.type}
                className="w-full"
              >
                {alertInfo?.message}
              </Alert>)}

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
                Reset password
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};