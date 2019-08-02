/* @flow */
import ConfigTester from 'test-utils/ConfigTester';
import path from 'path';

test('all rules used', () => {
  const configTester = new ConfigTester({
    configFile: path.resolve(__dirname, './all-rules-used-eslintrc.js'),
  });

  const ignoreRules = { 'playlyfe/prettier': true };

  const unusedRules = configTester
    .getMissingConfigRules()
    .filter((rule) => !ignoreRules[rule]);

  expect(unusedRules).toEqual([]);
});
