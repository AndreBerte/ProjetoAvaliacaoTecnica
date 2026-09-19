const cypress = require("eslint-plugin-cypress");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser,
        Cypress: "readonly",
        cy: "readonly",
        expect: "readonly",
      },
    },
    plugins: {
      cypress,
    },
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },
  {
    files: ["cypress/support/e2e.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
