import { Metadata } from "next";
import React from "react";

import "./globals.css";
import GlobalCssPriority from "./providers/GlobalCssPriority";
import { PatchDOMForBrowserExtensionsScript } from "./providers/PatchDOMForBrowserExtensionsScript";
import ThemeRegistry from "./providers/ThemeRegistry";
import { lightTheme } from "./themes";
import { noto_sans_jp } from "./themes/fonts";
import { Header } from "./ui/Header";

export const metadata: Metadata = {
  title: "ぐるMeijo",
  description: "名城大学のみんなのためのごはんマップ",
};

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalCssPriority>
        <ThemeRegistry options={lightTheme}>{children}</ThemeRegistry>
      </GlobalCssPriority>
      <PatchDOMForBrowserExtensionsScript />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={noto_sans_jp.className}>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
