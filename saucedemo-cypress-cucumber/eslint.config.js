const cypress = require("eslint-plugin-cypress");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        Cypress: "readonly",
        cy: "readonly",
        document: "readonly",
        expect: "readonly",
        localStorage: "readonly",
        module: "readonly",
        process: "readonly",
        require: "readonly",
        window: "readonly",
      },
    },
    plugins: {
      cypress,
    },
    rules: {
      ...cypress.configs.recommended.rules,
      "no-undef": "error",
    },
  },
];
