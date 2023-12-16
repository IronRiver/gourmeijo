import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import firebaseConfig from "./config";

const DEFAULT_APP_NAME = "[DEFAULT]";
export const app =
  getApps().find((app) => app.name === DEFAULT_APP_NAME) ??
  initializeApp(firebaseConfig, DEFAULT_APP_NAME);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (process.env.NEXT_PUBLIC_AUTH_EMULATOR_HOST) {
  const url = new URL(`http://${process.env.NEXT_PUBLIC_AUTH_EMULATOR_HOST}`);
  connectAuthEmulator(auth, url.toString());
}

if (process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST) {
  const url = new URL(
    `http://${process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST}`
  );
  connectFirestoreEmulator(db, url.hostname, parseInt(url.port));
}

if (process.env.NEXT_PUBLIC_STORAGE_EMULATOR_HOST) {
  const url = new URL(
    `http://${process.env.NEXT_PUBLIC_STORAGE_EMULATOR_HOST}`
  );
  connectStorageEmulator(storage, url.hostname, parseInt(url.port));
}
