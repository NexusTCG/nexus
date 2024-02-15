"use server";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  redirect("/dashboard/create");
};