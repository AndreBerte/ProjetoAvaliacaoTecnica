const globals = require("globals");
const cypress = require("eslint-plugin-cypress");

module.exports = [
  {
    files: ["*/.js"],
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
];