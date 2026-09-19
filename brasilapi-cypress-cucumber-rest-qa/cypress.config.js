const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
  allureWriter(on, config);
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://brasilapi.com.br',
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotsFolder: 'evidence/screenshots',
    videosFolder: 'evidence/videos',
    setupNodeEvents,
    env: {
      apiBaseUrl: 'https://brasilapi.com.br',
      maxRequests: 10,
      allure: true
    }
  },
  reporter: 'spec'
});
