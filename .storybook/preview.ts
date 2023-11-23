import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import { darkTheme, lightTheme } from "../src/app/themes";

import type { Preview } from "@storybook/react";

import "../src/app/globals.css";

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: createTheme(lightTheme),
      dark: createTheme(darkTheme),
    },
    defaultTheme: "light",
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
} as const satisfies Preview;

export default preview;
