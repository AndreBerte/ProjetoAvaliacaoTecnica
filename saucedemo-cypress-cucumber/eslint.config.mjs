import eslint from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  {
    ignores: [
      "node_modules/**",
      "allure-report/**",
      "allure-results/**",
      "cypress/screenshots/**",
      "cypress/videos/**",
    ],
  },
  eslint.configs.recommended,
  {
    files: ["cypress/**/*.js", "cypress.config.js"],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      "no-console": "warn",
    },
  },
];