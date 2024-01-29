// TODO: Use React-hook-form and MUI components

"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Typography } from "@mui/material";

export default function ResetPassword() {
  const [data, setData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const supabase = createClient();
  const router = useRouter();

  async function confirmPasswords() {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    const { data: resetData, error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (resetData) {
      // Toast success message
      setSuccess(true);
      if (success) {
        setTimeout(() => {
          console.log("Hello, World!");
        }, 2000);
      }
      router.push("/");
    }
    if (error) console.log(error);
  }

  function handlePasswordChange(e: any) {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePasswordVisibilityChange() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 my-24 sm:max-w-md justify-center gap-2 rounded-xl shadow-xl bg-gray-800 border border-gray-700">
      <Typography variant="h1" className="text-left mb-6">
        Reset password
      </Typography>

      <div className="grid">
        <label>Enter your new password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={data?.password}
          onChange={handlePasswordChange}
        />
        <label>Confirm your new password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={data?.confirmPassword}
          onChange={handlePasswordChange}
        />
        {!success && (
          <p
            className={clsx(
              "text-sm text-gray-400 cursor-pointer hover:underline",
              !showPassword && "hover:text-red-400",
              showPassword && "hover:text-green-400",
            )}
            onClick={handlePasswordVisibilityChange}
          >
            {showPassword ? "Hide password" : "Show password"}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-400">Password reset successful!</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 rounded cursor-pointer"
          onClick={confirmPasswords}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
