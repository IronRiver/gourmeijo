import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import path from "path";
import { fileURLToPath } from "url";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const config = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("plugin:storybook/recommended"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      ...typescript.configs["recommended-type-checked"].rules,
      ...typescript.configs["stylistic-type-checked"].rules,
    },
  },
  prettier,
];

export default config;
