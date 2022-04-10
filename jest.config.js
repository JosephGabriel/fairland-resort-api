/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  watchAll: true,
  verbose: true,
  globalSetup: "./config/globalSetup.ts",
  globalTeardown: "./config/globalTeardown.ts",
};
