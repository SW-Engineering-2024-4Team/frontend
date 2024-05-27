module.exports = {
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  