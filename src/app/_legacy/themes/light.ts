import { noto_sans_jp } from "./fonts";

import type { ThemeOptions } from "@mui/material";

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
