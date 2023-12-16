"use client";

import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

export default function ThemeRegistry({
  options,
  children,
}: {
  options?: ThemeOptions;
  children?: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={createTheme({ ...options })}>
      {children}
    </ThemeProvider>
  );
}
