import { noto_sans_jp } from "./fonts";

import type { ThemeOptions } from "@mui/material";

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: noto_sans_jp.style.fontFamily,
  },
} as const satisfies ThemeOptions;
