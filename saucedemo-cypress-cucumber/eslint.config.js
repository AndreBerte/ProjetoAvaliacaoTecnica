const cypress = require("eslint-plugin-cypress");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        Cypress: "readonly",
        cy: "readonly",
        expect: "readonly",
        module: "readonly",
        process: "readonly",
        require: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
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
