/* @flow */
import { ConfigTester } from './test-utils';
import path from 'path';

const configTester = new ConfigTester({
  configFile: path.join(__dirname, './flow-eslintrc.js'),
});

configTester.run('playlyfe/flow-boolean-style', 'error', {
  valid: [{ code: 'type X = boolean;' }],
  invalid: [{ code: 'type X = bool;' }],
});

configTester.run('playlyfe/flow-boolean-style', 'error', {
  valid: [{ code: 'type X = boolean;' }],
  invalid: [{ code: 'type X = bool;' }],
});

configTester.run('playlyfe/flow-delimiter-dangle', 'error', {
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

configTester.run('playlyfe/flow-generic-spacing', 'error', {
  valid: [{ code: 'type X = Promise<string>' }],
  invalid: [
    { code: 'type X = Promise< string>' },
    { code: 'type X = Promise< string >' },
    { code: 'type X = Promise<string >' },
  ],
});

configTester.run('playlyfe/flow-no-dupe-keys', 'error');
configTester.run('playlyfe/flow-no-primitive-constructor-types', 'error');
configTester.run('playlyfe/flow-no-weak-types', 'warn');

configTester.run('playlyfe/babel-flow-object-type', 'off');
configTester.run('playlyfe/flow-object-type-delimiter', 'error', {
  valid: [{ code: 'type test = { test1: string, test2: string };' }],
  invalid: [{ code: 'type test = { test1: string; test2: string };' }],
});

configTester.run('playlyfe/flow-require-parameter-type', 'off');
configTester.run('playlyfe/flow-require-return-type', 'off');

configTester.run('playlyfe/flow-require-valid-file-annotation', 'error', {
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

configTester.run('playlyfe/flow-require-variable-type', 'off');

configTester.run('playlyfe/flow-semi', 'error', {
  valid: [{ code: 'type test = string;' }],
  invalid: [{ code: 'type test = string' }],
});

configTester.run('playlyfe/flow-sort-keys', 'off');

configTester.run('playlyfe/flow-space-after-type-colon', 'error', {
  valid: [{ code: 'type test = { a: string };' }],
  invalid: [{ code: 'type test = { a:string };' }],
});

configTester.run('playlyfe/flow-space-before-generic-bracket', 'error', {
  valid: [{ code: 'type test = Promise<string>;' }],
  invalid: [{ code: 'type test = Promise <string>;' }],
});

configTester.run('playlyfe/flow-space-before-type-colon', 'error', {
  valid: [{ code: 'type test = { a: string };' }],
  invalid: [{ code: 'type test = { a : string };' }],
});

configTester.run('playlyfe/flow-type-id-match', 'error', {
  valid: [{ code: 'type Test = string;' }, { code: 'type _Test = string;' }],
  invalid: [{ code: 'type test = string;' }],
});

configTester.run('playlyfe/flow-union-intersection-spacing', 'error', {
  valid: [{ code: 'type Test = A | B;' }, { code: 'type Test = A & B;' }],
  invalid: [{ code: 'type Test = A|B;' }, { code: 'type Test = A&B;' }],
});

configTester.run('playlyfe/flow-use-flow-type', 'error');
configTester.run('playlyfe/flow-valid-syntax', 'off');
configTester.run('playlyfe/flow-no-types-missing-file-annotation', 'error');
