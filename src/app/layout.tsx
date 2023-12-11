import { Metadata } from "next";
import { ReactNode } from "react";

import { Providers } from "./providers";
import { noto_sans_jp } from "./themes/fonts";

import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "ぐるMeijo",
  description: "名城大学のみんなのためのごはんマップ",
  // icons: {
  //   icon: "/icon.svg",
  // },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <Providers>
        <body className={`${noto_sans_jp.className}`}>
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
