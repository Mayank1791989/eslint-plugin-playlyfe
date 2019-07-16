/* @flow */
import rule from '../react-intl-strict-message-values';
import RuleTester from '../../../../utils/RuleTester';

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

ruleTester.run('react-intl-strict-message-values', rule, {
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

    {
      filename: 'test.js',
      code: `
        intl.formatMessage({
          id: 'some_id',
          defaultMessage: "Test message without any argument",
        });
      `,
    },

    {
      filename: 'test.js',
      code: `
        this.props.intl.formatMessage(
          {
            id: 'some_test',
            defaultMessage: \`{
              val, select,
                x { X }
                y { Y }
            }\`,
          },
          { val },
        )
      `,
    },

    {
      filename: 'test.js',
      code: `
        <FormattedMessage
          id="some_id"
          defaultMessage="{val, select, x { X } y { Y }}"
          values={{ val }}
        />
      `,
    },

    {
      filename: 'test.js',
      code: `
        intl.formatMessage({ ...someMessage });
      `,
    },

    // no defaultMessage
    {
      filename: 'test.js',
      code: `
        intl.formatMessage({ id: 'test' });
      `,
    },
    {
      filename: 'test.js',
      code: `
        <FormattedMessage id="test" />
      `,
    },

    // not throw for invalid message
    {
      filename: 'test.js',
      code: `
        <FormattedMessage
          id="test"
          defaultMessage="Test some {var"
        />
      `,
    },

    // not report for values if invalid message
    {
      filename: 'test.js',
      code: `
        <FormattedMessage
          id="test"
          defaultMessage="Tester some {var} }}}}}"
          values={{ var: 'tester' }}
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
          defaultMessage="Test message {val}"
          values={{}}
        />
      `,
      errors: [
        {
          severity: 1,
          message: "Message arg 'val' value not provided",
          line: 4,
          column: 40,
          endLine: 4,
          endColumn: 45,
        },
        {
          severity: 1,
          message: "Missing values for message args ['val']",
          line: 5,
          column: 19,
          endLine: 5,
          endColumn: 21,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        intl.formatMessage({
          id: 'some_id',
          defaultMessage: 'Test message {val}',
        }, {})
      `,
      errors: [
        {
          severity: 1,
          message: "Message arg 'val' value not provided",
          line: 4,
          column: 41,
          endLine: 4,
          endColumn: 46,
        },
        {
          severity: 1,
          message: "Missing values for message args ['val']",
          line: 5,
          column: 12,
          endLine: 5,
          endColumn: 14,
        },
      ],
    },

    // if values missing
    {
      filename: 'test.js',
      code: `
        <FormattedMessage
          id="some_id"
          defaultMessage="Test message {val}"
        />
      `,
      errors: [
        {
          severity: 1,
          message: 'Missing prop `values`',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 26,
        },
        {
          severity: 1,
          message: "Message arg 'val' value not provided",
          line: 4,
          column: 40,
          endLine: 4,
          endColumn: 45,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        intl.formatMessage({
          id: 'some_id',
          defaultMessage: "Test message {val}",
        });
      `,
      errors: [
        {
          severity: 1,
          message: 'Missing arg `values`',
          line: 2,
          column: 14,
          endLine: 2,
          endColumn: 27,
        },
        {
          severity: 1,
          message: "Message arg 'val' value not provided",
          line: 4,
          column: 41,
          endLine: 4,
          endColumn: 46,
        },
      ],
    },

    // report unknown args in values
    {
      filename: 'test.js',
      code: `
        <FormattedMessage
          id='some_id'
          defaultMessage="Test message {val}"
          values={{ val, xtest }}
        />
      `,
      errors: [
        {
          severity: 1,
          message: "Unknown message arg 'xtest' value provided",
          line: 5,
          column: 26,
          endLine: 5,
          endColumn: 31,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        intl.formatMessage({
          id: 'some_id',
          defaultMessage: "Test message {val}",
        }, { val, xtest });
      `,
      errors: [
        {
          severity: 1,
          message: "Unknown message arg 'xtest' value provided",
          line: 5,
          column: 19,
          endLine: 5,
          endColumn: 24,
        },
      ],
    },
  ],
});
