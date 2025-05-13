
module.exports = {
  testEnvironment: 'node',
  automock: false,
  reporters: ['default', 'jest-junit'],
  transform: {
    '.(ts)': 'ts-jest',
  },
  testRegex: '(\\.(test|ispec|uspec))\\.(ts)$',
  roots: [
    '<rootDir>/packages/core',
    '<rootDir>/packages/node',
    '<rootDir>/packages/cli',
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  setupFiles: [
    //'<rootDir>/core/test/testEnv.js',
  ]
};
