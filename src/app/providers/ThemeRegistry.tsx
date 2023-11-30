"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

import EmotionRegistry from "./EmotionRegistry";

export default function ThemeRegistry({
  options,
  children,
}: {
  options?: ThemeOptions;
  children?: React.ReactNode;
}) {
  return (
    <EmotionRegistry options={{ key: "css" }}>
      <ThemeProvider theme={createTheme({ ...options })}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionRegistry>
  );
}
