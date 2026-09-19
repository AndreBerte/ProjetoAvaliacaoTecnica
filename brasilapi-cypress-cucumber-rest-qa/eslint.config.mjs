import eslint from '@eslint/js';
import cypress from 'eslint-plugin-cypress';

export default [
  { ignores: ['node_modules/**', 'allure-report/**', 'allure-results/**', 'evidence/**'] },
  eslint.configs.recommended,
  { files: ['cypress/**/*.js', 'cypress.config.js'], ...cypress.configs.recommended }
];
