import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    ignores: ["**/node_modules/", "**/dist/"],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
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
      "arrow-body-style": ["error", "as-needed"],
      "max-params": "off",
      "no-throw-literal": "off",
      "no-useless-return": "error",
      "object-shorthand": "error",
      "prefer-destructuring": "off",
      "prefer-promise-reject-errors": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/max-params": ["error", { max: 3 }],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/only-throw-error": "error",
      "@typescript-eslint/prefer-destructuring": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-promise-reject-errors": "error",
    },
  },
];
