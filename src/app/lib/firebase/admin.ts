import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  type ServiceAccount,
  cert,
  getApps as getAdminApps,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

import firebaseConfig from "./config";

const ADMIN_APP_NAME = firebaseConfig.projectId;
const serviceAccount = {
  projectId: firebaseConfig.projectId,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
} satisfies ServiceAccount;

export const adminApp =
  getAdminApps().find((app) => app.name === ADMIN_APP_NAME) ??
  initializeAdminApp(
    { ...firebaseConfig, credential: cert(serviceAccount) },
    ADMIN_APP_NAME
  );
export const adminAuth = getAdminAuth(adminApp);

export async function getAuthenticatedApp() {
  const noSessionReturn = { app: null, currentUser: null };
  const session = getSession();
  if (session == null) {
    return noSessionReturn;
  }

  try {
    const decodedIdToken = await adminAuth.verifySessionCookie(session);
    const app = initializeAuthenticatedApp(decodedIdToken.uid);
    const auth = getAuth(app);

    // handle revoked tokens
    await adminAuth.verifySessionCookie(session, true);

    return { app, currentUser: auth.currentUser };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return noSessionReturn;
  }
}

export function getSession() {
  return cookies().get("__session")?.value;
}

function initializeAuthenticatedApp(uid: string) {
  const random = Math.random().toString(36).split(".")[1];
  const appName = `authenticated-context:${uid}:${random}`;

  const app = initializeApp(firebaseConfig, appName);

  return app;
}
