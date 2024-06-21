"use server"

import { logout } from "@/lib/lib"
import { redirect } from "next/navigation"

export default async function logoutAction () {
    await logout()
    redirect('/')
}