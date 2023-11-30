import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import { darkTheme, lightTheme } from "../src/app/themes";

import type { Preview } from "@storybook/react";

import "../src/app/globals.css";

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
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: createTheme(lightTheme),
        dark: createTheme(darkTheme),
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
} as const satisfies Preview;

export default preview;
