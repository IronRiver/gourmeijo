import { CssBaseline } from "@mui/material";
import { Metadata } from "next";
import { ReactNode } from "react";

import EmotionRegistry from "./providers/EmotionRegistry";
import GlobalCssPriority from "./providers/GlobalCssPriority";
import { PatchDOMForBrowserExtensionsScript } from "./providers/PatchDOMForBrowserExtensionsScript";
import ThemeRegistry from "./providers/ThemeRegistry";
import { lightTheme } from "./themes";
import { noto_sans_jp } from "./themes/fonts";

import { Header } from "./ui/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ぐるMeijo",
  description: "名城大学のみんなのためのごはんマップ",
  icons: {
    icon: "/icon.svg",
  },
};

function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalCssPriority>
        <EmotionRegistry options={{ prepend: true }}>
          <ThemeRegistry options={lightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </ThemeRegistry>
        </EmotionRegistry>
      </GlobalCssPriority>
      <PatchDOMForBrowserExtensionsScript />
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <GlobalProvider>
        <body className={`${noto_sans_jp.className}`}>
          <Header />
          {children}
        </body>
      </GlobalProvider>
    </html>
  );
}
