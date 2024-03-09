"use client";

import React, { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { DashboardContext } from "@/app/context/DashboardContext";

export default function Profile() {
  const { userProfileData } = useContext(DashboardContext);
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      if (userProfileData?.username) {
        console.log(userProfileData?.username.toLowerCase());
        router.push(`/dashboard/profile/${userProfileData?.username.toLowerCase()}`);
      }
    }; 
    redirect();
  }, [userProfileData?.username, router]);

  return <div>Loading...</div>;
};