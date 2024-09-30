import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["**/node_modules/", "**/dist/"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        document: "readonly",
        DocumentFragment: "readonly",
        Element: "readonly",
        exports: "readonly",
        HTMLElement: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "max-params": "off",
      "no-throw-literal": "off",
      "no-useless-return": "error",
      "prefer-destructuring": "off",
      "prefer-promise-reject-errors": "off",
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
];
