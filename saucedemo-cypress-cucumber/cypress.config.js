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
  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on("file:preprocessor", bundler);
  await addCucumberPreprocessorPlugin(on, config);
  allureWriter(on, config);

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://www.saucedemo.com",
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
    screenshotOnRunFailure: true,
    video: true,
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    env: {
      allureReuseAfterSpec: true,
      allureResultsPath: "allure-results",
      tags: process.env.CYPRESS_TAGS || "",
    },
  },
});
