import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../client";

import { sessionLogin, sessionLogout } from "./actions";

type Tail<T extends unknown[]> = T extends [unknown, ...infer Rest] ? Rest : [];

export function onAuthStateChanged(
  ...args: Tail<Parameters<typeof _onAuthStateChanged>>
): ReturnType<typeof _onAuthStateChanged> {
  return _onAuthStateChanged(auth, ...args);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    await sessionLogin(idToken);
  } catch (error) {
    throw new Error("Error signing in with Google", { cause: error });
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    await sessionLogout();
  } catch (error) {
    throw new Error("Error signing out with Google", { cause: error });
  }
}
