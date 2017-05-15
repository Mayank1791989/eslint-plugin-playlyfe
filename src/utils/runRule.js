/* @flow */
import { linter } from 'eslint';

export default function runRule(code: string, rule: Object) {
  linter.defineRule('test-rule', rule);
  return linter.verify(code, {
    rules: { 'test-rule': 1 },
    parser: 'babel-eslint',
  }, 'runRule.js', false);
}
