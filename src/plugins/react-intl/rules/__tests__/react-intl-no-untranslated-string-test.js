/* @flow */
import rule from '../react-intl-no-untranslated-string';
import dedent from 'dedent-js';
import RuleTester from 'test-utils/RuleTester';

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const error = (others = {}) => ({
  message: 'no-untranslated-string',
  ...others,
});

ruleTester.run('react-intl-no-untranslated-string', rule, {
  valid: [
    {
      code: '<div allowedAttr={"test"} />',
    },
    {
      code: '<div title={<FormattedMessage defaultMessage="string" />} />',
    },
    {
      code: '<div> <FormattedMessage defaultMessage="string" /> </div>',
    },

    // dont report for whitespace literal
    {
      code: '<div> <i /> </div>',
    },
  ],

  invalid: [
    // attributes tests
    {
      code: '<div title="string" />',
      errors: [error({ line: 1, column: 12 })],
    },

    {
      code: '<div title={"string"} />',
      errors: [error({ line: 1, column: 13 })],
    },

    {
      // don't crash for non-string attributes
      code: '<div title={false} />',
      errors: [error({ line: 1, column: 13 })],
    },

    {
      /* eslint-disable no-template-curly-in-string */
      code: '<div title={`string ${h} hello`} />',
      /* eslint-enable no-template-curly-in-string */
      errors: [error({ line: 1, column: 13 })],
    },

    // children
    {
      code: '<div>String</div>',
      errors: [error({ line: 1, column: 6 })],
    },

    {
      code: '<div> { "String" } </div>',
      errors: [error({ line: 1, column: 9 })],
    },

    {
      /* eslint-disable no-template-curly-in-string */
      code: '<div>  { `String hello ${a} test` } </div>',
      /* eslint-enable no-template-curly-in-string */
      errors: [error({ line: 1, column: 10 })],
    },

    // report correct position if whitespace in string starting
    {
      code: dedent`
        <div>
          String
        </div>
      `,
      errors: [error({ line: 2, column: 3 })],
    },

    {
      code: dedent`
        <div>

          String
        </div>
      `,
      errors: [error({ line: 3, column: 3 })],
    },

    {
      code: dedent`
        <div
          xyz="5"
        >    String
        </div>
      `,
      errors: [error({ line: 3, column: 6 })],
    },

    {
      code: dedent`
        <div>
          ####ReportCorrectlyIfSpecialCharacters
        </div>
      `,
      errors: [error({ line: 2, column: 3 })],
    },
  ],
});
