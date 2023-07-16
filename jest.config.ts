import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchAll: true,
  verbose: true,
  collectCoverage: true,
  globalSetup: './config/globalSetup.ts',
  globalTeardown: './config/globalTeardown.ts',
};

export default config;
