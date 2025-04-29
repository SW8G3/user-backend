import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    files: ["**/__tests__/**/*.js", "**/*.test.js"], // Target test files
    languageOptions: {
      globals: {
        ...globals.jest, // Add Jest globals
      },
    },
  },
];