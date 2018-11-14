/* @flow */
import { ConfigTester } from './test-utils';
import dedent from 'dedent-js';
import path from 'path';

const configTester = new ConfigTester({
  configFile: path.resolve(__dirname, './js-eslintrc.js'),
});

// possible-errors
configTester.run('for-direction', 'error');

configTester.run('getter-return', 'error', {
  valid: [
    {
      code: `
        class Test {
          get name(){
              return "nicholas";
          }
        }
      `,
    },
    {
      code: `
        class Test {
          get name(){
              return;
          }
        }
      `,
    },
  ],
});

configTester.run('no-async-promise-executor', 'error');

configTester.run('no-await-in-loop', 'error');
configTester.run('playlyfe/babel-no-await-in-loop', 'off');

configTester.run('no-compare-neg-zero', 'error');

configTester.run('no-cond-assign', 'error', {
  valid: [{ code: 'if (a === test) {}' }],
  invalid: [
    { code: 'if (a = test) {}' },
    { code: 'if ((a = test) !== null) {}' },
  ],
});

configTester.run('no-console', 'warn', {
  invalid: [
    { code: "console.log('test')" },
    { code: "console.warn('test')" },
    { code: "console.error('test')" },
  ],
});

configTester.run('no-constant-condition', 'error', {
  invalid: [{ code: 'if (false) {}' }],
});

configTester.run('no-control-regex', 'error', {
  invalid: [{ code: 'const regex = new RegExp("\x1f");' }],
});

configTester.run('no-debugger', 'error', {
  invalid: [{ code: 'function test() { debugger; }' }],
});

configTester.run('no-dupe-args', 'error');

configTester.run('no-dupe-keys', 'error', {
  invalid: [{ code: 'const test = { a: 5, b: 5, a: 6 };' }],
});

configTester.run('no-duplicate-case', 'error', {
  invalid: [
    {
      code: `
        switch (test) {
          case 1: break;
          case 2: break;
          case 1: break;
        }
      `,
    },
    {
      code: `
        switch (test) {
          case a: break;
          case 2: break;
          case a: break;
        }
      `,
    },
  ],
});

configTester.run('no-empty-character-class', 'error', {
  invalid: [{ code: 'const regex = /^abc[]/;' }],
});

configTester.run('no-empty', 'error', {
  invalid: [{ code: 'if (test) { }' }],
});

configTester.run('no-ex-assign', 'error', {
  invalid: [{ code: " try { console.log('tst') } catch (e) { e = 10; }" }],
});

configTester.run('no-extra-boolean-cast', 'error', {
  invalid: [{ code: ' if (!!test) {} ' }],
});

configTester.run('no-extra-parens', 'off', {
  // valid: [
  //   { code: `a = (b * c) + 10;`},
  //   { code: `(0).toString(32);`},
  //   {
  //     code: `
  //       const test = (
  //         <div
  //           className="test"
  //           onClick={onClick}
  //         />
  //       );
  //     `,
  //   },
  //   {
  //     code: `
  //     `,
  //   }
  // ],
  // invalid: [
  //   { code: `a = (b * c);` },
  //   { code: `function test() { return (a = 5); }` },
  //   { code: `const test = (function() {})`},
  //   { code: `const test = (() => {})`},
  // ],
});

configTester.run('no-extra-semi', 'error', {
  valid: [{ code: 'function test() { }' }],
  invalid: [{ code: 'const a = 5;;' }, { code: 'function test() { };' }],
});

configTester.run('no-func-assign', 'error', {
  invalid: [
    {
      code: `
        function test() {}
        test = test2;
      `,
    },
  ],
});

configTester.run('no-inner-declarations', 'error', {
  invalid: [
    {
      code: `
        if (test) { function testFunc() {} }
      `,
    },
    {
      code: `
        if (test) { var testVar = 5; }
      `,
    },
  ],
});

configTester.run('no-invalid-regexp', 'error');

configTester.run('no-irregular-whitespace', 'error');

configTester.run('no-misleading-character-class', 'error');

configTester.run('no-obj-calls', 'error', {
  invalid: [{ code: 'const test = Math();' }],
});

configTester.run('no-prototype-builtins', 'error');

configTester.run('no-regex-spaces', 'error', {
  invalid: [{ code: 'const test = /test    test2/;' }],
});

configTester.run('no-sparse-arrays', 'error', {
  invalid: [{ code: 'const test = [1,,2];' }],
});

configTester.run('no-template-curly-in-string', 'error');

configTester.run('no-unexpected-multiline', 'error');
configTester.run('no-unreachable', 'error');
configTester.run('no-unsafe-finally', 'error');
configTester.run('no-unsafe-negation', 'error');
configTester.run('require-atomic-updates', 'error');
configTester.run('use-isnan', 'error');

configTester.run('valid-jsdoc', 'off'); // we dont use jsdoc
configTester.run('valid-typeof', 'error');

// best-practices
configTester.run('accessor-pairs', 'error');
configTester.run('array-callback-return', 'error');
configTester.run('block-scoped-var', 'error');

configTester.run('class-methods-use-this', 'off');
configTester.run('complexity', 'error');
configTester.run('consistent-return', 'error');

configTester.run('curly', 'error', {
  valid: [{ code: 'if (test) { return 5; }' }],
  invalid: [{ code: 'if (test) return 5;' }],
});

configTester.run('default-case', 'error');

configTester.run('dot-location', 'error', {
  valid: [
    {
      code: `
        const test = (
          test2
          .abc
        );
      `,
    },
  ],
  invalid: [
    {
      code: `
        const test = (
          test2.
          abc
        );
      `,
    },
  ],
});

configTester.run('dot-notation', 'error');

configTester.run('eqeqeq', 'error', {
  valid: [
    { code: "if (test == null) { console.log('test'); }" },
    { code: "if (test === null) { console.log('test'); }" },
  ],
});

configTester.run('guard-for-in', 'error');
configTester.run('max-classes-per-file', 'error', {
  valid: [
    {
      code: `
        class A {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        class A {}
        class B {}
      `,
    },
  ],
});
configTester.run('no-alert', 'error');
configTester.run('no-caller', 'error');
configTester.run('no-case-declarations', 'error');
configTester.run('no-div-regex', 'error');
configTester.run('no-else-return', 'error');

configTester.run('no-empty-function', 'error', {
  invalid: [
    { code: 'function test() {}' },
    { code: 'const test = () => {};' },
    {
      code: `
        class Test {
          method1() {}
        }
      `,
    },
    {
      code: `
        class Test {
          constructor() {}
        }
      `,
    },
  ],
});

configTester.run('no-empty-pattern', 'error');
configTester.run('no-eq-null', 'off');
configTester.run('no-eval', 'error');
configTester.run('no-extend-native', 'error');
configTester.run('no-extra-bind', 'error');
configTester.run('no-extra-label', 'error');
configTester.run('no-fallthrough', 'error');
configTester.run('no-floating-decimal', 'error');

configTester.run('no-global-assign', 'error');
configTester.run('no-native-reassign', 'off');

configTester.run('no-implicit-coercion', 'error', {
  valid: [
    { code: 'const test = Boolean(test2);' },
    { code: 'const test = Number(date);' },
    { code: 'const string = String(num);' },
  ],
  invalid: [
    { code: 'const test = !!test2;' },
    { code: 'const test = +date;' },
    { code: "const string = '' + num;" },
  ],
});

configTester.run('no-implicit-globals', 'error');
configTester.run('no-implied-eval', 'error');

configTester.run('no-invalid-this', 'off');
configTester.run('playlyfe/babel-no-invalid-this', 'error', {
  valid: [
    {
      code: `
        class Test {
          method() {
            this.a = 5;
          }
        }
      `,
    },
  ],
});

configTester.run('no-iterator', 'error');
configTester.run('no-labels', 'error');
configTester.run('no-lone-blocks', 'error');
configTester.run('no-loop-func', 'error');
configTester.run('no-magic-numbers', 'off');
configTester.run('no-multi-spaces', 'error');
configTester.run('no-multi-str', 'error');
configTester.run('no-new-func', 'error');
configTester.run('no-new-wrappers', 'error');
configTester.run('no-new', 'error');
configTester.run('no-octal-escape', 'error');
configTester.run('no-octal', 'error');

configTester.run('no-param-reassign', 'error', {
  invalid: [{ code: 'function test(a) { a = 10; }' }],

  valid: [{ code: 'function test(a) { a.test = 10; }' }],
});

configTester.run('no-proto', 'error');
configTester.run('no-redeclare', 'error');
// configTester.run('no-restricted-properties', 'off'); // see testing
configTester.run('no-return-assign', 'error');
configTester.run('no-return-await', 'error');
configTester.run('no-script-url', 'error');
configTester.run('no-self-assign', 'error');
configTester.run('no-self-compare', 'error');
configTester.run('no-sequences', 'error');
configTester.run('no-throw-literal', 'error');
configTester.run('no-unmodified-loop-condition', 'error');

configTester.run('no-unused-expressions', 'error', {
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

configTester.run('no-unused-labels', 'error');
configTester.run('no-useless-call', 'error');
configTester.run('no-useless-concat', 'error');
configTester.run('no-useless-escape', 'error');
configTester.run('no-useless-return', 'error');
configTester.run('no-void', 'error');
configTester.run('no-warning-comments', 'warn');
configTester.run('no-with', 'error');
configTester.run('prefer-promise-reject-errors', 'error');
configTester.run('radix', 'error');
configTester.run('require-await', 'error');
configTester.run('require-unicode-regexp', 'error');
configTester.run('vars-on-top', 'error');

configTester.run('wrap-iife', 'error', {
  valid: [{ code: "const test = (() => { console.log('test'); })();" }],
});

configTester.run('yoda', 'error');

// strict-mode
configTester.run('strict', 'error', {
  invalid: [
    {
      code: `
        'use strict';
        function test() {}
      `,
    },
  ],
});

// variables
configTester.run('init-declarations', 'error', {
  valid: [
    {
      code: `
        function test() {
          let test1 = 20;
          if (something) {
            test1 = 10;
          } else {
            test1 = 20;
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        function test() {
          let test1;
          if (something) {
            test1 = 10;
          } else {
            test1 = 20;
          }
        }
      `,
    },
  ],
});

configTester.run('no-catch-shadow', 'off');

configTester.run('no-delete-var', 'error', {
  valid: [
    {
      code: `
      // allow deleting object properties
      const obj = { a: 10 };
      delete obj.a;
    `,
    },
  ],
  // already not allowed by babel-parser
  // // invalid: [{
  //  code: `const test = 5; delete test;`,
  // }],
});

configTester.run('no-label-var', 'error');
// configTester.run('no-restricted-globals', 'error'); // see testing
configTester.run('no-shadow-restricted-names', 'error');
configTester.run('no-shadow', 'error');
configTester.run('no-undef-init', 'error');
configTester.run('no-undef', 'error');
configTester.run('no-undefined', 'warn');

configTester.run('no-unused-vars', 'error', {
  valid: [
    { code: 'function test(a, b) { console.log(b); } test(4, 5);' },
    {
      code: `
        const { a, b, c, d, ...otherProps } = this.props;
        console.log(otherProps);
      `,
    },
  ],
  invalid: [{ code: 'function test(a, b) { console.log(a); } test(4, 5);' }],
});

configTester.run('no-use-before-define', 'error', {
  // allow function only
  valid: [
    {
      code: `
        function test2() {
          test();
        }
        function test() {
          return 5;
        }
      `,
    },
  ],

  invalid: [
    {
      code: `
        function test2() {
          test();
        }

        const test = () => {
          return 5;
        };
      `,
    },
  ],
});

// node commonjs
configTester.run('callback-return', 'error');
configTester.run('global-require', 'off');

configTester.run('handle-callback-err', 'error', {
  invalid: [
    { code: 'function x(err, cb) { cb(); }' },
    { code: 'function x(error, cb) { cb(); }' },
    { code: 'function x(someErr, cb) { cb(); }' },
    { code: 'function x(someError, cb) { cb(); }' },
  ],
});

configTester.run('no-buffer-constructor', 'error');

configTester.run('no-mixed-requires', 'error');
configTester.run('no-new-require', 'error');
configTester.run('no-path-concat', 'error');
configTester.run('no-process-env', 'off');
configTester.run('no-process-exit', 'off');

configTester.run('no-restricted-modules', 'error', {
  valid: [{ code: "const _find = require('lodash/find');" }],
  invalid: [{ code: "const _ = require('lodash');" }],
});

configTester.run('no-sync', 'warn');

// styles
configTester.run('array-bracket-newline', 'error', {
  valid: [
    {
      code: `
        var e = [
          () => { console.log('test1'); },
          () => { console.log('test2'); },
        ];
      `,
    },
  ],
  invalid: [
    {
      code: `
        var e = [
          () => { dosomething(); },
          () => { console.log('test2'); } ];
      `,
    },
  ],
});

configTester.run('playlyfe/babel-array-bracket-spacing', 'off');
configTester.run('array-bracket-spacing', 'error', {
  valid: [{ code: 'const arr = [1, 2, 3];' }],
  invalid: [{ code: 'const arr = [ 1, 2, 3 ];' }],
});

configTester.run('array-element-newline', 'off', {
  valid: [
    {
      code: 'const arr = [1, 2, 3];',
    },
    {
      // this is not valid so disabling rule
      code: `
        const arr = [
          1,
          2,
          3,
        ];
      `,
    },
  ],
});

configTester.run('block-spacing', 'error', {
  valid: [{ code: 'function test() { return true; }' }],
  invalid: [{ code: 'function test() {return true;}' }],
});

configTester.run('brace-style', 'error', {
  valid: [
    { code: 'function test() { return true; }' },
    {
      code: `
        function test() {
          return true;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        function test()
        {
          return true;
        }
      `,
    },
  ],
});

configTester.run('capitalized-comments', 'off');

configTester.run('camelcase', 'error', {
  valid: [{ code: 'const SOME_CONSTANT_VALUE = 5;' }],
  invalid: [{ code: 'const some_constant_value = 5;' }],
});

configTester.run('comma-dangle', 'error', {
  valid: [
    { code: 'const test = { test, test2 };' },
    {
      code: `
        const test = {
          test,
          test2,
        };
      `,
    },
    { code: "const test = ['test', 'test2'];" },
    {
      code: `
        const test = [
          test,
          test2,
        ];
      `,
    },
    { code: 'const test = (a, b) => { };' },
    {
      code: `
        const test = (
          test,
          test2,
        ) => {};
      `,
    },
    { code: 'function test(test, test2) { }' },
    {
      code: `
        function test(
          test,
          test2,
        ) { }
      `,
    },
    {
      code: `
        import {
          a,
          b,
        } from 'test';
      `,
    },
    {
      code: `
        export {
          a,
          b,
        } from 'test';
      `,
    },
    {
      // not allow comma after rest operator
      code: `
        const {
          a,
          b,
          c,
          ...d
        } = some_obj;
      `,
    },
  ],
  invalid: [
    { code: 'const test = { a: 5, b: 5, };' },
    {
      code: `
        const test = {
          test,
          test2
        };
      `,
    },
    { code: "const test = ['test', 'test2',];" },
    {
      code: `
        const test = [
          test,
          test2
        ];
      `,
    },
    { code: 'const test = ( a, b, ) => {};' },
    {
      code: `
        const test = (
          test,
          test2
        ) => {};
      `,
    },
    { code: 'function test(test, test2,) {}' },
    {
      code: `
        function test(
          test,
          test2
        ) {};
      `,
    },
    {
      code: `
        import {
          a,
          b
        } from 'test';
      `,
    },
    {
      code: `
        export {
          a,
          b
        } from 'test';
      `,
    },
  ],
});
configTester.run('playlyfe/babel-func-params-comma-dangle', 'off');

configTester.run('comma-spacing', 'error', {
  valid: [{ code: 'const test = { test, test2 }; ' }],
  invalid: [
    { code: 'const test = { test , test2 }; ' },
    { code: 'const test = { test ,test2 }; ' },
  ],
});

configTester.run('comma-style', 'error', {
  valid: [
    {
      code: `
        const test = [
          test1,
          test2,
        ];
      `,
    },
  ],

  invalid: [
    {
      code: `
        const test = [
          test1
          , test2
          , test3
        ];
      `,
    },
  ],
});

configTester.run('computed-property-spacing', 'error', {
  valid: [{ code: 'const t = test[a];' }],
  invalid: [{ code: 'const t = test[ a ];' }],
});

configTester.run('consistent-this', 'error');
configTester.run('eol-last', 'error');

configTester.run('func-call-spacing', 'error', {
  invalid: [{ code: 'test ();' }],
});

configTester.run('func-name-matching', 'off');

// configTester.run('no-multiple-empty-lines', 'error', {
//   invalid: [
//     {
//       code: `
//         /* max empty line 2 */
//         const test = 5;

//         const test2 = 10;
//       `,
//     },
//     {
//       code: `
//         // more than 1 eof
//         const test = 5;

//       `,
//     },
//   ],
// })

configTester.run('func-names', 'error', {
  invalid: [{ code: 'const test = function () { };' }],
});

configTester.run('func-style', 'error', {
  valid: [{ code: 'function test() { }' }, { code: 'const test = () => { };' }],
  invalid: [{ code: 'const test = function () { }; ' }],
});

configTester.run('function-paren-newline', 'error', {
  valid: [
    {
      code: `
        function test(arg1, arg2, arg3, arg4) {
          console.log('test');
        }
      `,
    },
    {
      code: `
        function test(
          arg1,
          arg2,
          arg3,
          arg4,
        ) {
          console.log('test');
        }
      `,
    },
  ],

  invalid: [
    {
      code: `
        function test(arg1, arg2,
          arg3,
          arg4,
        ) {
          console.log('test');
        }
      `,
    },
  ],
});

configTester.run('id-blacklist', 'off');
configTester.run('id-length', 'off');
configTester.run('id-match', 'off');
configTester.run('implicit-arrow-linebreak', 'error');

configTester.run('indent', 'error', {
  valid: [
    // switch case
    {
      code: dedent(`
        switch(test) {
          case 'test':
            console.log('test');
            break;
          default:
            console.log('default');
        }
      `),
    },
    // {
    //   code: `
    //     function test(
    //       x: string,
    //       y: number,
    //     ) {
    //       console.log(x, y);
    //     }
    //   `,
    // },
  ],
  invalid: [
    // switch case
    {
      code: `
        switch(test) {
        case 'test': break;
        default: console.log('default');
        }
      `,
    },
  ],
});

configTester.run('key-spacing', 'error', {
  valid: [{ code: 'const test = { a: 5 };' }],
  invalid: [
    { code: 'const test = { a : 5 };' },
    { code: 'const test = { a :5 };' },
  ],
});

configTester.run('keyword-spacing', 'error');

configTester.run('line-comment-position', 'off');
configTester.run('linebreak-style', 'error');

configTester.run('lines-around-comment', 'off');

configTester.run('lines-between-class-members', 'error', {
  valid: [
    {
      code: `
        class Test {
          props: Props;
          state: State;
        }
      `,
    },
    {
      code: `
        class Test {
          props: Props;

          state: State;
        }
      `,
    },
    {
      code: `
        class Test {
          props: Props;

          handle = () => {
              console.log('handle');
          };

          test = () => {
              console.log('handle');
          };
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        class Test {

          handle = () => {
              console.log('handle');
          };
          test = () => {
              console.log('handle');
          };
        }
      `,
    },
  ],
});

configTester.run('lines-around-directive', 'error');
configTester.run('max-depth', 'error');
configTester.run('max-len', 'error');
configTester.run('max-lines', 'off');
configTester.run('max-lines-per-function', 'off');
configTester.run('max-nested-callbacks', 'error');
configTester.run('max-params', 'off');

configTester.run('max-statements-per-line', 'error', {
  valid: [
    {
      code: `
        if (x === 1) { return; }
      `,
    },
  ],
  invalid: [
    {
      code: `
        if (x === 1) { x += 1; return; }
      `,
    },
  ],
});

configTester.run('max-statements', 'off');
configTester.run('multiline-ternary', 'off');

configTester.run('multiline-comment-style', 'off');

configTester.run('new-cap', 'off'); // cause issues with decorators
configTester.run('playlyfe/babel-new-cap', 'off');

configTester.run('new-parens', 'error');
configTester.run('newline-after-var', 'off');
configTester.run('newline-before-return', 'off');
configTester.run('newline-per-chained-call', 'error');
configTester.run('no-array-constructor', 'error');
configTester.run('no-bitwise', 'error');
configTester.run('no-continue', 'error');
configTester.run('no-inline-comments', 'off');
configTester.run('no-lonely-if', 'error');
configTester.run('no-mixed-operators', 'error');
configTester.run('no-mixed-spaces-and-tabs', 'error');
configTester.run('no-multi-assign', 'error');
configTester.run('no-negated-condition', 'error');
configTester.run('no-nested-ternary', 'error');
configTester.run('no-new-object', 'error');
configTester.run('no-plusplus', 'error');
configTester.run('no-restricted-syntax', 'off');
configTester.run('no-tabs', 'error');
configTester.run('no-ternary', 'off');
configTester.run('no-trailing-spaces', 'error');
configTester.run('no-underscore-dangle', 'off');
configTester.run('no-unneeded-ternary', 'error');
configTester.run('no-whitespace-before-property', 'error');
configTester.run('nonblock-statement-body-position', 'off');

configTester.run('object-curly-newline', 'off');

configTester.run('object-curly-spacing', 'off');
configTester.run('playlyfe/babel-object-curly-spacing', 'error');

configTester.run('object-property-newline', 'error', {
  valid: [
    {
      code: 'const a = { a: 5, b: 5, c: 6 };',
    },
    {
      code: `
        const a = {
          a: 5, b: 5, c: 6
        };
      `,
    },
  ],

  invalid: [
    {
      code: `const a = {
        a: 5, b: 5,
        c: 6
      };`,
    },
    {
      code: `
        const a = { a: 5,
          b: 5, c: 6
        };
      `,
    },
  ],
});

configTester.run('one-var', 'error', {
  valid: [
    {
      code: `
        let test1;
        let test2;
        let test3;
      `,
    },
    {
      code: `
        const test1 = 1;
        const test2 = 2;
        const test3 = 3;
      `,
    },
  ],
  invalid: [
    {
      code: `
        let test1,
          test2,
          test3;
      `,
    },
    {
      code: `
        const test1 = 1,
          test2 = 2,
          test3 = 3;
      `,
    },
  ],
});

configTester.run('one-var-declaration-per-line', 'error');

configTester.run('operator-assignment', 'error');

configTester.run('operator-linebreak', 'error', {
  valid: [
    {
      code: `
        const test = (
          condition1 &&
          condition2 ||
          condition3
        );
      `,
    },
    { code: 'const test = condition1 ? value1 : value2;' },
    {
      code: `
        const test = (
          condition1
            ? value1
            : value2
        );
      `,
    },
  ],
  invalid: [
    {
      code: `
        const test = (
          condition1
          && condition2
          || condition3
        );
      `,
    },
    {
      code: `
        const test = (
          condition1 ?
            value1 :
            value2
        );
      `,
    },
  ],
});

configTester.run('padded-blocks', 'error');
configTester.run('padding-line-between-statements', 'off');
configTester.run('quote-props', 'error');
configTester.run('quotes', 'error');
configTester.run('require-jsdoc', 'off');

configTester.run('semi-spacing', 'error', {
  valid: [{ code: 'const test = test2;' }],
  invalid: [{ code: 'const test = test2 ;' }],
});

configTester.run('semi', 'off');
configTester.run('playlyfe/babel-semi', 'error', {
  valid: [
    {
      code: 'const test = a;',
    },
    {
      code: `
        class Test {
          a = 5;
        }
      `,
    },
  ],
  invalid: [
    {
      code: 'const test = a',
    },
    {
      code: `
        class Test {
          a = 5
        }
      `,
    },
  ],
});

configTester.run('semi-style', 'error', {
  valid: [
    {
      code: `
        const a = 5;
        const b = 6;
      `,
    },
  ],
  invalid: [
    {
      code: `
        const a = 5
        ; const b = 6
      `,
    },
  ],
});

configTester.run('sort-keys', 'off');
configTester.run('sort-vars', 'off');
configTester.run('space-before-blocks', 'error');

configTester.run('space-before-function-paren', 'error', {
  invalid: [
    { code: 'const test = function() { }' },
    { code: 'function test () { }' },
  ],
});

configTester.run('space-in-parens', 'error', {
  valid: [{ code: 'const test = (1 + 2) * 3;' }],
  invalid: [{ code: 'const test = ( 1 + 2 ) * 3;' }],
});

configTester.run('space-infix-ops', 'error', {
  valid: [{ code: 'const test = 1 + 2;' }],
  invalid: [{ code: 'const test = 1+2;' }],
});

configTester.run('space-unary-ops', 'error', {
  valid: [{ code: 'const test = !test2;' }, { code: 'delete test[test2];' }],
  invalid: [
    { code: 'const test = ! test2;' },
    { code: 'delete(test[test2]);' },
  ],
});

configTester.run('spaced-comment', 'error');

configTester.run('switch-colon-spacing', 'error', {
  valid: [
    {
      code: `
        switch (a) {
          case 0: break;
          default: foo();
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        switch (a) {
          case 0 :break;
          default :foo();
        }
      `,
    },
  ],
});

configTester.run('template-tag-spacing', 'error', {
  valid: [
    {
      code: 'const a = Relay.QL`xyz`',
    },
  ],
  invalid: [
    {
      code: 'const a = Relay.QL `xyz`',
    },
  ],
});

configTester.run('unicode-bom', 'error');
configTester.run('wrap-regex', 'off');

// es latest
configTester.run('arrow-body-style', 'error', {
  valid: [],
});

configTester.run('playlyfe/babel-arrow-parens', 'off');
configTester.run('arrow-parens', 'error', {
  invalid: [{ code: 'const test = a => a + 5;' }],
});

configTester.run('arrow-spacing', 'error', {
  valid: [{ code: "const test = () => console.log('test');" }],
  invalid: [
    { code: "const test = ()=> console.log('test');" },
    { code: "const test = () =>console.log('test');" },
    { code: "const test = ()=>console.log('test');" },
  ],
});

configTester.run('constructor-super', 'error');
configTester.run('generator-star-spacing', 'error');

configTester.run('no-class-assign', 'error');

configTester.run('no-confusing-arrow', 'error', {
  valid: [{ code: 'const tst = (a) => (condition ? value1 : value2);' }],
  invalid: [{ code: 'const tst = (a) => condition ? value1 : value2;' }],
});

configTester.run('no-const-assign', 'error');
configTester.run('no-dupe-class-members', 'error');
configTester.run('no-duplicate-imports', 'error');
configTester.run('no-new-symbol', 'error');
configTester.run('no-restricted-imports', 'off');
configTester.run('no-this-before-super', 'error');
configTester.run('no-useless-computed-key', 'error');
configTester.run('no-useless-constructor', 'error');
configTester.run('no-useless-rename', 'error');
configTester.run('no-var', 'error');

// configTester.run('object-shorthand', 'off');
configTester.run('object-shorthand', 'error', {
  valid: [
    {
      code: `
        const test = {
          "test-function": function () { }
        };
      `,
    },
    {
      code: `
        const test = {
          "test-function": function () { },
          ...test2,
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        const test = {
          "test-function"() { }
        };
      `,
    },
    {
      code: `
        const test = {
          ...test2,
          "test-function"() { },
        };
      `,
    },
  ],
});

configTester.run('prefer-arrow-callback', 'error');
configTester.run('prefer-const', 'error');
configTester.run('prefer-destructuring', 'error');
configTester.run('prefer-numeric-literals', 'off');
configTester.run('prefer-reflect', 'off');
configTester.run('prefer-rest-params', 'error');
configTester.run('prefer-spread', 'error');
configTester.run('prefer-template', 'error');
configTester.run('require-yield', 'error');

configTester.run('rest-spread-spacing', 'error', {
  valid: [{ code: 'const [ a, b, ...c] = [1, 2, 3, 4];' }],
  invalid: [{ code: 'const [ a, b, ... c] = [1, 2, 3, 4];' }],
});

configTester.run('symbol-description', 'error');

/* eslint-disable no-template-curly-in-string */
configTester.run('template-curly-spacing', 'error', {
  valid: [{ code: 'const test = `test ${test}`;' }],
  invalid: [
    { code: 'const test = `test ${ test}`;' },
    { code: 'const test = `test ${test }`;' },
    { code: 'const test = `test ${ test }`;' },
  ],
});
/* eslint-enable no-template-curly-in-string */

configTester.run('yield-star-spacing', 'error');
configTester.run('sort-imports', 'off');

configTester.run('playlyfe/freeze-const-object', 'error');
configTester.run('playlyfe/class-property-no-use-before-define', 'error');

test('should able to parse flow function with TypeArguments', () => {
  expect(() => {
    configTester.parse(`
      export default createXYZ<T, T>(val);
    `);
  }).not.toThrow();
});

// js-imports (import plugin Buggy so for now disabling)
// configTester.run('playlyfe/import-no-unresolved', 'error');
// configTester.run('playlyfe/import-named', 'error');
// configTester.run('playlyfe/import-default', 'error');
// configTester.run('playlyfe/import-namespace', 'error');
// configTester.run('playlyfe/import-no-restricted-paths', 'off');
// configTester.run('playlyfe/import-no-absolute-path', 'error');
// configTester.run('playlyfe/import-no-dynamic-require', 'error');
// configTester.run('playlyfe/import-no-internal-modules', 'off');
// configTester.run('playlyfe/import-no-webpack-loader-syntax', 'error');

// configTester.run('playlyfe/import-export', 'error');
// configTester.run('playlyfe/import-no-named-as-default', 'error');
// configTester.run('playlyfe/import-no-named-as-default-member', 'error');
// configTester.run('playlyfe/import-no-deprecated', 'off');
// configTester.run('playlyfe/import-no-extraneous-dependencies', 'error');
// configTester.run('playlyfe/import-no-mutable-exports', 'error');

// configTester.run('playlyfe/import-unambiguous', 'error');
// configTester.run('playlyfe/import-no-commonjs', 'error');
// configTester.run('playlyfe/import-no-amd', 'error');
// configTester.run('playlyfe/import-no-nodejs-modules', 'off');

// configTester.run('playlyfe/import-first', 'error');
// configTester.run('playlyfe/import-no-duplicates', 'error');
// configTester.run('playlyfe/import-no-namespace', 'error');
// configTester.run('playlyfe/import-extensions', 'error', {
//   valid: [
//     {
//       filename: path.resolve(__dirname, './files/test.js'),
//       // .js ignore
//       code: `
//         import test from './sample-js';
//       `,
//     },
//     {
//       filename: path.resolve(__dirname, './files/test.js'),
//       code: `
//         import test from './sample-json.json';
//       `,
//     },
//     {
//       filename: path.resolve(__dirname, './files/test.js'),
//       code: `
//         import test from './sample-css.css';
//       `,
//     },
//     {
//       filename: path.resolve(__dirname, './files/test.js'),
//       code: `
//         import test from './sample-svg.svg';
//       `,
//     },
//   ],
//   invalid: [
//     {
//       filename: path.resolve(__dirname, './files/test.js'),
//       code: `
//         import test from './sample-js.js';
//       `,
//     },
//     {
//       filename: path.resolve(__dirname, './files/test.js'),
//       code: `
//         import test from './sample-css';
//       `,
//     },
//   ],
// });
// configTester.run('playlyfe/import-order', 'off');

// configTester.run('playlyfe/import-newline-after-import', 'error');
// configTester.run('playlyfe/import-prefer-default-export', 'warn');
// configTester.run('playlyfe/import-max-dependencies', 'off');
// configTester.run('playlyfe/import-no-unassigned-import', 'error');
// configTester.run('playlyfe/import-no-named-default', 'error');
