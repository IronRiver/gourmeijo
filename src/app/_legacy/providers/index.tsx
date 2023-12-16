import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

import { lightTheme } from "../themes";

import EmotionRegistry from "./EmotionRegistry";
import GlobalCssPriority from "./GlobalCssPriority";
import { PatchDOMForBrowserExtensionsScript } from "./PatchDOMForBrowserExtensionsScript";
import ThemeRegistry from "./ThemeRegistry";

export function Providers({ children }: { children: ReactNode }) {
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
