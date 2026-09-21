const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  config.env.stepDefinitions = "cypress/e2e/step_definitions/**/*.js";
  await addCucumberPreprocessorPlugin(on, config);

  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on("file:preprocessor", bundler);
  allureWriter(on, config);

  return config;
}

module.exports = defineConfig({
  e2e: {
    apiBaseUrl: 'https://brasilapi.com.br',
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: 32,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    env: {
      allureReuseAfterSpec: true,
      allureResultsPath: "allure-results",
      tags: process.env.CYPRESS_TAGS || "",
      stepDefinitions: "cypress/e2e/step_definitions/**/*.js",
    },
  },
});