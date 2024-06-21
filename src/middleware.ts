import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import * as jose from "jose";

// secret
const secretKey = "MRKHiMsRTzF1nNlAtJXnI6mjA7aQRbj3D4d2GQt0HDk=";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check for cookie
  const cookie = cookies().get("session");
  if (!cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Validate it
  // const secret = new TextEncoder().encode(secretKey);
  // const jwt = cookie.value;

  // try {
  //   const { payload } = await jose.jwtVerify(jwt, secret, {});
  //   console.log(payload);
  // } catch (err) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/payments"]
};