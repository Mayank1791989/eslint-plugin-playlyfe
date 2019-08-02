/* @flow */
import RuleTester from 'test-utils/RuleTester';
import rule from '../indent-template-strings';

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const baseConfig = {
  filename: 'test.js',
};

ruleTester.run('indent-template-strings', rule, {
  valid: [
    {
      code: 'const a = someValidTemplateString(`tester`);',
      ...baseConfig,
    },
    {
      code: `
        const a = someValidTemplateString(\`tester {
          xyz
          hello
        }\`);
      `,
      ...baseConfig,
    },
  ],
  invalid: [
    {
      code: `
        const tester = "hello";
        const a = someWrongIndentedTemplateString(\`
                I am some wrong indented
                  { hello }
                \${some_expression}
            \`);
      `,

      output: `
        const tester = "hello";
        const a = someWrongIndentedTemplateString(\`
          I am some wrong indented
            { hello }
          \${some_expression}
        \`);
      `,

      errors: [
        {
          message: 'Not correctly indented',
        },
      ],

      ...baseConfig,
    },
    {
      code: `
        const tester = "hello";
        const a = someWrongIndentedTemplateString(
          \`
                I am some wrong indented
                  { hello }
                \${Tester.getFragment('tester')}
               \`,
          10,
        );
      `,

      output: `
        const tester = "hello";
        const a = someWrongIndentedTemplateString(
          \`
            I am some wrong indented
              { hello }
            \${Tester.getFragment('tester')}
          \`,
          10,
        );
      `,

      errors: [
        {
          message: 'Not correctly indented',
        },
      ],

      ...baseConfig,
    },

    {
      code: `
        const tester = "hello";
        const a = someWrongIndentedTemplateString(\`
          only closing line not indented
              \`);
      `,

      output: `
        const tester = "hello";
        const a = someWrongIndentedTemplateString(\`
          only closing line not indented
        \`);
      `,

      errors: [
        {
          message: 'Not correctly indented',
        },
      ],

      ...baseConfig,
    },
  ],
});
