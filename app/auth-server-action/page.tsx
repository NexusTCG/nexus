import React from "react";
import { AuthForm } from "./components/AuthForm";
import readUserSession from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default async function page() {
	const {data} = await readUserSession();
	if (data.session) {
		// If there is a session, redirect
		return redirect("/login");
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-96">
				<AuthForm />
			</div>
		</div>
	);
}