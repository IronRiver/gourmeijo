import "./styles/globals.css";

import EmotionRegistry from "@/components/EmotionRegistry";
import PatchDOMForBrowserExtensionsScript from "@/components/PatchDOMForBrowserExtensionsScript";

import ThemeProvider from "./styles/ThemeProvider";

import { noto_sans_jp } from "./styles/themes";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ぐるMeijo",
  description: "名城大学のみんなのためのごはんマップ",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${noto_sans_jp.className} flex flex-col min-h-screen`}>
        <EmotionRegistry options={{ key: "mui", enableCssLayer: true }}>
          <ThemeProvider>
            {children}
            {modal}
          </ThemeProvider>
        </EmotionRegistry>
        <PatchDOMForBrowserExtensionsScript />
      </body>
    </html>
  );
}
