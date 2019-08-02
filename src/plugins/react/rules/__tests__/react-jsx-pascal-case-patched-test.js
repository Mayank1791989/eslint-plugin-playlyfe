/* @flow */
import RuleTester from 'test-utils/RuleTester';
import rule from '../react-jsx-pascal-case-patched';

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('playlyfe/react-jsx-pascal-case', rule, {
  valid: [
    { code: '<div />' },
    { code: '<XYZHello />' },
    { code: '<_XYZHello />' },
    { code: '<Header.Title />' },
  ],
  invalid: [
    {
      code: '<_Custom_Button name="react" />',
      errors: [
        {
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: '<__Custom_Button name="react" />',
      errors: [
        {
          line: 1,
          column: 1,
        },
      ],
    },
  ],
});
