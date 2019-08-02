/* @flow */
import ConfigTester from 'test-utils/ConfigTester';
import path from 'path';

const configTester = new ConfigTester({
  configFile: path.resolve(__dirname, 'testing-jest-eslintrc.js'),
});

configTester.run('no-restricted-properties', 'error', {
  invalid: [
    { code: 'describe.only(a, () => {});' },
    { code: 'describe.skip(a, () => {});' },

    { code: 'it.only(a, () => {});' },
    { code: 'it.skip(a, () => {});' },

    { code: 'test.only(a, () => {});' },
    { code: 'test.skip(a, () => {});' },
  ],
});

configTester.run('no-restricted-globals', 'error', {
  invalid: [
    { code: 'xdescribe(a, () => {});' },
    { code: 'fdescribe(a, () => {});' },

    { code: 'xit(a, () => {});' },
    { code: 'fit(a, () => {});' },

    { code: 'xtest(a, () => {});' },
    { code: 'ftest(a, () => {});' },
  ],
});
