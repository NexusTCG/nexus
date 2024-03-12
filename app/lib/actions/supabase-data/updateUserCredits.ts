"use server";

import { supabaseAdmin } from "@/app/lib/supabase/admin";

type UpdateUserCreditsOptions = {
  userId: string;
  currentUserCredits: number;
  userCreditsChange: number;
  operation: "add" | "subtract";
};

export default async function updateUserCredits({
  userId,
  currentUserCredits,
  userCreditsChange,
  operation,
}: UpdateUserCreditsOptions): Promise<void> {

  if (userCreditsChange === 0) {
    console.log("No credits to update");
    return;
  }

  const newCredits = operation === "add"
    ? currentUserCredits + userCreditsChange
    : currentUserCredits - userCreditsChange;

  try {
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", userId);
      
    if (error) {
      throw new Error(`Error updating user credits: ${error.message}`);
    }
  } catch (error) {
    console.error("Error updating user credits:", error);
  }
}