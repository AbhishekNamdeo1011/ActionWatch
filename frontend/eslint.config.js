import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist",
    "node_modules",
  ]),

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      /*
      -----------------------------------------
      React
      -----------------------------------------
      */

      // React 17+ / React 19 automatic JSX runtime
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^React$",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      /*
      -----------------------------------------
      React Refresh
      -----------------------------------------
      */

      // Shadcn exports helper functions like buttonVariants.
      // This rule incorrectly flags them.
      "react-refresh/only-export-components": "off",

      /*
      -----------------------------------------
      General
      -----------------------------------------
      */

      "no-console": "off",

     "no-debugger": "off",

      "no-constant-condition": "warn",
    },
  },
]);