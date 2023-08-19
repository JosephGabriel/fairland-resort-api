import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  globalSetup: './config/global-setup.ts',
  globalTeardown: './config/global-teardown.ts',
};

export default config;
