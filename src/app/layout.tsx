import { Metadata } from "next";
import React from "react";

import "./globals.css";
import GlobalCssPriority from "./providers/GlobalCssPriority";
import ThemeRegistry from "./providers/ThemeRegistry";
import { lightTheme } from "./themes";
import { noto_sans_jp } from "./themes/fonts";
import { PatchDOMForBrowserExtensionsScript } from "./utils/patch-dom-for-browser-extensions/component";

export const metadata: Metadata = {
  title: "ぐるMeijo",
  description: "名城大学のみんなのためのごはんマップ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <ThemeRegistry options={lightTheme}>
        <GlobalCssPriority>
          <body className={noto_sans_jp.className}>{children}</body>
        </GlobalCssPriority>
      </ThemeRegistry>
      <PatchDOMForBrowserExtensionsScript />
    </html>
  );
}
