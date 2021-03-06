/* @flow */
import rule from '../react-intl-no-empty-translation';
import dedent from 'dedent-js';
import RuleTester from 'test-utils/RuleTester';

const ruleTester = new RuleTester();

const defaultOptions = {
  parser: require.resolve('babel-eslint'),
};

ruleTester.run('react-intl-no-empty-translation', rule, {
  valid: [
    {
      code: `
        export default {
          'some.valid.id': 'translation',
        }
      `,
      ...defaultOptions,
    },

    {
      code: dedent`
        export default {
          'some.id.with.missing.translation': '',
        }
      `,
      ...defaultOptions,
      filename: 'not_intl_file.js',
    },
  ],

  invalid: [
    {
      code: dedent`
        export default {
          'some.id.with.missing.translation': '',
        }
      `,
      errors: [
        {
          message: 'missing translation',
          type: 'Literal',
          line: 2,
          column: 39,
        },
      ],
      ...defaultOptions,
    },
  ],
});
