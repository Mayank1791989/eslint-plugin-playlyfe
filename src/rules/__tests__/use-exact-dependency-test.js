/* @flow */
import rule from '../use-exact-dependency';
import dedent from 'dedent-js';
import RuleTester from '../../utils/RuleTester';

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

const baseConfig = {
  parser: 'babel-eslint',
  filename: 'package.json',
};

ruleTester.run('use-exact-dependency', rule, {
  valid: [
    {
      code: dedent`
        const json = {
          "dependencies": {
            "dependency1": "1.2.3"
          }
        };
      `,
      ...baseConfig,
    },

    // not report if file not package.json
    {
      code: dedent`
        const json = {
          "dependencies": {
            "dependency1": "^1.2.3",
            "dependency2": "~1.2.3",
            "dependency3": "1.2.3"
          }
        };
      `,
      ...baseConfig,
      filename: 'some.json',
    },
  ],

  invalid: [
    {
      code: dedent`
        const json = {
          "dependencies": {
            "dependency1": "^1.2.3",
            "dependency2": "~1.2.3",
            "dependency3": "1.2.3"
          }
        };
      `,
      errors: [
        {
          message: 'use-exact-dependency',
          type: 'Literal',
          line: 3,
          column: 20,
        },
        {
          message: 'use-exact-dependency',
          type: 'Literal',
          line: 4,
          column: 20,
        },
      ],
      ...baseConfig,
    },
  ],
});
