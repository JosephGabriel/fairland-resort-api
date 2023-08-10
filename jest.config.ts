import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchAll: true,
  verbose: true,
  collectCoverage: true,
  globalSetup: './config/global-setup.ts',
  globalTeardown: './config/global-teardown.ts',
};

export default config;
