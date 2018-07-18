/* @flow */
import rule from '../freeze-const-object';
import dedent from 'dedent-js';
import RuleTester from '../../../../utils/RuleTester';

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

const baseConfig = {
  parser: 'babel-eslint',
  filename: 'test.js',
};

ruleTester.run('freeze-const-object', rule, {
  valid: [
    {
      code: dedent`
        const SOME_CONST_VAR = Object.freeze({ a: 5 });
      `,
      ...baseConfig,
    },
    {
      code: dedent`
        const SOME_CONST_VAR = "string";
      `,
      ...baseConfig,
    },
    {
      code: dedent`
        const test = { a: 5 };
      `,
      ...baseConfig,
    },
    {
      code: dedent`
        const test = someFunc({ a: 5 });
      `,
      ...baseConfig,
    },
    {
      code: dedent`
        const { test } = {};
      `,
      ...baseConfig,
    },
  ],

  invalid: [
    {
      code: dedent`
        const TEST = { a: 5 };
      `,

      errors: [
        {
          message: 'Use Object.freeze to freeze constant object value',
          line: 1,
          column: 14,
        },
      ],

      output: dedent`
        const TEST = Object.freeze({ a: 5 });
      `,

      ...baseConfig,
    },
  ],
});
