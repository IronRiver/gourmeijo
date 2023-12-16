"use server";

import { cookies } from "next/headers";

import { adminAuth } from "../admin";

export async function sessionLogin(idToken: string) {
  const cookieStore = cookies();
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  cookieStore.set("__session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

export async function sessionLogout() {
  const cookieStore = cookies();
  const session = cookieStore.get("__session")?.value;
  if (session != null) {
    cookieStore.delete("__session");
    try {
      const decodedClaims = await adminAuth.verifySessionCookie(session, true);
      if (decodedClaims) {
        await adminAuth.revokeRefreshTokens(decodedClaims.sub);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
