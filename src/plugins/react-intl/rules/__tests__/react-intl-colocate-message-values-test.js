/* @flow */
import rule from '../react-intl-colocate-message-values';
import RuleTester from '../../../../utils/RuleTester';

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

ruleTester.run('react-intl-colocate-message-values', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        const test = defineMessages({
          test: {
            id: 'some_id',
            defaultMessage: "Test message without arguments"
          },
        });
      `,
    },
    {
      filename: 'test.js',
      code: `
        // missing defaultMessage
        const test = defineMessages({
          test2: {
            id: 'some_id',
          },
        });
      `,
    },
    {
      filename: 'test.js',
      code: `
        // when defineMessages value is invalid
        const test = defineMessages({
          id: 'some_id',
          defaultMessage: "Test message {test}"
        });
      `,
    },
    {
      filename: 'test.js',
      code: `
        // when defaultMessage is invalid
        const test = defineMessages({
          id: 'some_id',
          defaultMessage: "Test message {test"
        });
      `,
    },
  ],

  invalid: [
    {
      filename: 'test.js',
      code: `
        const test = defineMessages({
          test: {
            id: 'some_id',
            defaultMessage: "Test message {test}"
          },
        });
      `,
      errors: [
        {
          severity: 1,
          message:
            'Use FormattedMessage/formatMessage instead of defineMessages for intl message containing args.',
          line: 3,
          column: 11,
          nodeType: 'Identifier',
          endLine: 3,
          endColumn: 15,
        },
      ],
    },
  ],
});
