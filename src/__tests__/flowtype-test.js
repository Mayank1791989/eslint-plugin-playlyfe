/* @flow */
import { ConfigTester } from './test-utils';
import path from 'path';

const configTester = new ConfigTester({
  configFile: path.join(__dirname, './flowtype-eslintrc.js'),
});

configTester.run('playlyfe/flowtype-array-style-complex-type', 'error', {
  valid: [{ code: 'type X = Array<?string>;' }],
  invalid: [{ code: 'type X = (?string)[];' }],
});

configTester.run('playlyfe/flowtype-array-style-simple-type', 'error', {
  valid: [{ code: 'type X = Array<string>;' }],
  invalid: [{ code: 'type X = string[];' }],
});

configTester.run('playlyfe/flowtype-boolean-style', 'error', {
  valid: [{ code: 'type X = boolean;' }],
  invalid: [{ code: 'type X = bool;' }],
});

configTester.run('playlyfe/flowtype-boolean-style', 'error', {
  valid: [{ code: 'type X = boolean;' }],
  invalid: [{ code: 'type X = bool;' }],
});

configTester.run('playlyfe/flowtype-delimiter-dangle', 'error', {
  valid: [
    { code: 'type test = { test: string, test2: string };' },
    {
      code: `
        type test = {
          test: string,
          test2: string,
        };
      `,
    },
  ],
  invalid: [
    { code: 'type test = { test: string, test2: string, };' },
    {
      code: `
        type test = {
          test: string,
          test2: string
        };
      `,
    },
  ],
});

configTester.run('playlyfe/flowtype-generic-spacing', 'error', {
  valid: [{ code: 'type X = Promise<string>' }],
  invalid: [
    { code: 'type X = Promise< string>' },
    { code: 'type X = Promise< string >' },
    { code: 'type X = Promise<string >' },
  ],
});
configTester.run('playlyfe/flowtype-newline-after-flow-annotation', 'error', {
  valid: [
    {
      code: `
        /* @flow */
        const test = "test";
      `,
    },
  ],
  invalid: [
    {
      code: `
        /* @flow */

        const test = "test";
      `,
    },
  ],
});

configTester.run('playlyfe/flowtype-no-dupe-keys', 'error');
configTester.run('playlyfe/flowtype-no-existential-type', 'error');
configTester.run('playlyfe/flowtype-no-flow-fix-me-comments', 'off');
configTester.run('playlyfe/flowtype-no-mutable-array', 'off');
configTester.run('playlyfe/flowtype-no-primitive-constructor-types', 'error');
configTester.run('playlyfe/flowtype-no-weak-types', 'warn');

configTester.run('playlyfe/babel-flowtype-object-type', 'off');
configTester.run('playlyfe/flowtype-object-type-delimiter', 'error', {
  valid: [
    {
      code: `
        type test = {
          test1: int,
          test2: string,
        };
      `,
    },
  ],
  // invalid: [{ code: 'type test = { test1: string; test2: string };' }],
});

configTester.run('playlyfe/flowtype-require-exact-type', 'off');
configTester.run('playlyfe/flowtype-require-parameter-type', 'off');
configTester.run('playlyfe/flowtype-require-return-type', 'off');
configTester.run('playlyfe/flowtype-require-types-at-top', 'off');

configTester.run('playlyfe/flowtype-require-valid-file-annotation', 'error', {
  valid: [
    {
      code: `
        /* @flow */
        type test = 'hllo';
      `,
    },
  ],

  invalid: [
    {
      // dont allow files without flow annotation
      code: `
        const value = 10;
      `,
    },
    {
      // report error if not block
      code: `
        // @flow
      `,
    },
    {
      // should be first statement
      code: `
        type test = 'hllo';
        /* @flow */
      `,
    },
  ],
});

configTester.run('playlyfe/flowtype-require-variable-type', 'off');

configTester.run('playlyfe/flowtype-semi', 'error', {
  valid: [{ code: 'type test = string;' }],
  invalid: [{ code: 'type test = string' }],
});

configTester.run('playlyfe/flowtype-sort-keys', 'off');

configTester.run('playlyfe/flowtype-space-after-type-colon', 'error', {
  valid: [{ code: 'type test = { a: string };' }],
  invalid: [{ code: 'type test = { a:string };' }],
});

configTester.run('playlyfe/flowtype-space-before-generic-bracket', 'error', {
  valid: [{ code: 'type test = Promise<string>;' }],
  invalid: [{ code: 'type test = Promise <string>;' }],
});

configTester.run('playlyfe/flowtype-space-before-type-colon', 'error', {
  valid: [{ code: 'type test = { a: string };' }],
  invalid: [{ code: 'type test = { a : string };' }],
});

configTester.run('playlyfe/flowtype-type-import-style', 'error', {
  valid: [
    {
      code: `import { type Test } from './test';`,
    },
  ],
  invalid: [
    {
      code: `import type { Test } from './test';`,
    },
  ],
});

configTester.run('playlyfe/flowtype-type-id-match', 'error', {
  valid: [{ code: 'type Test = string;' }, { code: 'type _Test = string;' }],
  invalid: [{ code: 'type test = string;' }],
});

configTester.run('playlyfe/flowtype-union-intersection-spacing', 'error', {
  valid: [{ code: 'type Test = A | B;' }, { code: 'type Test = A & B;' }],
  invalid: [{ code: 'type Test = A|B;' }, { code: 'type Test = A&B;' }],
});

configTester.run('playlyfe/flowtype-use-flow-type', 'error');
configTester.run('playlyfe/flowtype-valid-syntax', 'off');
configTester.run('playlyfe/flowtype-no-types-missing-file-annotation', 'error');

configTester.run('playlyfe/flowtype-no-unused-expressions', 'error', {
  valid: [
    {
      code: `
        const styles = [
          isEnabled && a.enabled,
        ];
      `,
    },
    {
      code: `
        const test = isValid && 100;
      `,
    },
    {
      code: `
        const test = 5;
        (foo: number);
      `,
    },
  ],
  invalid: [
    { code: 'if (test) { test + 1; }' },
    {
      code: `
        isValid && printValid();
      `,
    },
    {
      code: `
        isValid ? printValid() : printInvalid();
      `,
    },
  ],
});
