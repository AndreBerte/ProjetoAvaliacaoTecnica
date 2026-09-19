const cypress = require("eslint-plugin-cypress");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        Cypress: "readonly",
        cy: "readonly",
        expect: "readonly",
      },
    },
    plugins: {
      cypress,
    },
    rules: {
      "cypress/unsafe-to-chain-command": "error",
    },
  },
];
