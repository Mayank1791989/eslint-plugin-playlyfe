/* @flow */
import rule from '../react-intl-valid-message';
import RuleTester from '../../../../utils/RuleTester';

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

ruleTester.run('react-intl-valid-message', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `
        <FormattedMessage
          id="some_id"
          defaultMessage="Test message without any argument"
        />
      `,
    },
  ],
  invalid: [
    {
      filename: 'test.js',
      code: `
        <FormattedMessage
          id="some_id"
          defaultMessage="Test message without any argument {var}}"
        />
      `,
      errors: [
        {
          severity: 1,
          message: `Invalid message: Expected "'", "\\\\#", "\\\\\\\\", "\\\\u", "\\\\{", "\\\\}", "{", [^{}\\\\\\0-\\x1F\\x7F \\t\\n\\r], end of input, or whitespace but "}" found.`,
          line: 4,
          column: 26,
          endLine: 4,
          endColumn: 68,
        },
      ],
    },

    {
      filename: 'test.js',
      code: `
        intl.formatMessage({
          id: "some_id",
          defaultMessage: "Test message without any argument {var}}",
        });
      `,
      errors: [
        {
          severity: 1,
          message: `Invalid message: Expected "'", "\\\\#", "\\\\\\\\", "\\\\u", "\\\\{", "\\\\}", "{", [^{}\\\\\\0-\\x1F\\x7F \\t\\n\\r], end of input, or whitespace but "}" found.`,
          line: 4,
          column: 27,
          endLine: 4,
          endColumn: 69,
        },
      ],
    },

    // defineMessages
    {
      filename: 'test.js',
      code: `
        defineMessages({
          test: {
            id: "some_id",
            defaultMessage: "Test message without any argument {var}}",
          }
        });
      `,
      errors: [
        {
          severity: 1,
          message: `Invalid message: Expected "'", "\\\\#", "\\\\\\\\", "\\\\u", "\\\\{", "\\\\}", "{", [^{}\\\\\\0-\\x1F\\x7F \\t\\n\\r], end of input, or whitespace but "}" found.`,
          line: 5,
          column: 29,
          endLine: 5,
          endColumn: 71,
        },
      ],
    },
  ],
});
