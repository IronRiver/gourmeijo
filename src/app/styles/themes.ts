import { Noto_Sans_JP } from "next/font/google";

import type { ThemeOptions } from "@mui/material";

export const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#dd3a1e",
    },
    secondary: {
      main: "#775750",
    },
  },
  typography: {
    fontFamily: noto_sans_jp.style.fontFamily,
  },
} as const satisfies ThemeOptions;

export const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ffb4a5",
    },
    secondary: {
      main: "#e7bdb5",
    },
  },
  typography: {
    fontFamily: noto_sans_jp.style.fontFamily,
  },
} as const satisfies ThemeOptions;
