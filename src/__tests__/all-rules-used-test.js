/* @flow */
import { createRuleFinder } from './test-utils/eslint-utils';
import path from 'path';

test('all rules used', () => {
  const ruleFinder = createRuleFinder(
    path.resolve(__dirname, './all-rules-used-eslintrc.js'),
  );
  const ignoreRuleList = ['playlyfe/prettier'];

  const unusedRules = ruleFinder
    .getUnusedRules()
    .filter(rule => !ignoreRuleList.includes(rule));

  expect(unusedRules).toEqual([]);
});
