import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  { files: ["**/*.{js,ts,cjs,mjs}"] },
  {
    ignores: ["**/node_modules/", "**/dist/"],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // taken from https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#custom-grouping
            ["^\\u0000"],
            ["^node:"],
            ["^@?(?!(src|test|utils))\\w"],
            ["^"],
            ["^\\."],
          ],
        },
      ],
    },
  },
  {
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "max-params": "off",
      "no-throw-literal": "off",
      "no-useless-return": "error",
      "object-shorthand": "error",
      "prefer-destructuring": "off",
      "prefer-promise-reject-errors": "off",
    },
  },
];
