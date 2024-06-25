"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get the data off the form
  const username = formData.get("username");
  const password = formData.get("password");

  // console.log(username, password);

  //  Send to our api route
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const json = await res.json();

  cookies().set("session", json.token, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
    path: "/",
    sameSite: "strict",
  });

  // Redirect to login if success
  if (res.ok) {
    redirect("/dashboard");
  } else {
    return json.error;
  }
}