import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

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
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "max-params": "off",
      "no-throw-literal": "off",
      "no-useless-return": "error",
      "prefer-destructuring": "off",
      "prefer-promise-reject-errors": "off",
    },
  },
];
