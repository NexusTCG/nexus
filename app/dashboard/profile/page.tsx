"use client";

import React, { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { DashboardContext } from "@/app/context/DashboardContext";

export default function Profile() {
  const { userProfileData } = useContext(DashboardContext);
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      if (userProfileData?.username) {
        router.push(`/dashboard/profile/${userProfileData?.username.toLowerCase()}`);
      }
    }; 
    redirect();
  }, [
    userProfileData?.username, 
    router
  ]);

  console.log(
    "userProfileData", 
    userProfileData, 
    userProfileData?.username
  );

  return <div>Loading...</div>;
};