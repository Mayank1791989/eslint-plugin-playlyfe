/* @flow */
module.exports = {
  testRegex: '__tests__/.*-test.js$',
  testEnvironment: 'node',
  moduleDirectories: ['local_modules', 'node_modules'],
  roots: ['<rootDir>/src'],
  coveragePathIgnorePatterns: ['<rootDir>/src/__tests__/test-utils/'],
};
