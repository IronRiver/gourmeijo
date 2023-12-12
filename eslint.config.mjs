import path from "path";

import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const config = [
  {
    files: ["**/*.{js,cjs,mjs,jsx}", "**/*.{ts,cts,mts,tsx}"],
  },
  {
    ignores: [
      // default
      // "**/node_modules/",
      //".git/",

      // next.js
      "/.next/",
      "/out/",

      // production
      "/build",

      // vercel
      ".vercel",

      // typescript
      "next-env.d.ts",

      // storybook
      "storybook-static/",
    ],
  },

  // common
  js.configs.recommended,

  // Next.js
  ...compat.extends("next/core-web-vitals"),

  // import
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "unknown",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always-and-inside-groups",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "{.,..}/**/*.+(css|sass|less|scss|pcss|styl)",
              group: "unknown",
              position: "after",
            },
          ],
        },
      ],
    },
  },

  // typescript
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      ...typescript.configs["recommended-type-checked"].rules,
      ...typescript.configs["stylistic-type-checked"].rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // prettier
  prettier,
];

export default config;
