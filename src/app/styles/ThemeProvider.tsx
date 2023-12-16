"use client";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { ReactNode, useMemo } from "react";

import { darkTheme, lightTheme } from "./themes";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () => createTheme(prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
