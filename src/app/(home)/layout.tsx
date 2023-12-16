import { type User } from "firebase/auth";
import { ReactNode } from "react";

import { getAuthenticatedApp } from "@/app/lib/firebase/admin";

import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { currentUser } = await getAuthenticatedApp();
  return (
    <>
      <Header initialUser={currentUser?.toJSON() as unknown as User} />
      <main className="flex-grow flex flex-col items-stretch">{children}</main>
      <Footer />
    </>
  );
}
