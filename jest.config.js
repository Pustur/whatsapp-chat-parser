const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/*.ts'],
  globalSetup: './global-setup.js',
};

module.exports = config;
