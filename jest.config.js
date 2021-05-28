const config = {
  preset: 'ts-jest',
  collectCoverageFrom: ['src/*.ts'],
  globalSetup: './global-setup.js',
};

module.exports = config;
