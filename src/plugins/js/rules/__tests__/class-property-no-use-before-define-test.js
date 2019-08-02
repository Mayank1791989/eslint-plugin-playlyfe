/* @flow */
import rule from '../class-property-no-use-before-define';
import dedent from 'dedent-js';
import RuleTester from 'test-utils/RuleTester';

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const baseConfig = {
  filename: 'test.js',
};

const message = (propertyName: string) =>
  `class property '${propertyName}' was used before it was defined.`;

ruleTester.run('class-property-no-use-before-define', rule, {
  valid: [
    {
      code: dedent`
        class Test {
          test = this[somevar];
          y = 5;
        }
      `,
      ...baseConfig,
    },
    {
      code: dedent`
        class Test {
          state = {
            val: this.props.value,
          }
        }
      `,
      options: [
        {
          ignoreProperties: ['props'],
        },
      ],
    },
    {
      // works with class Expression
      code: dedent`
        function test() {
          return class Test {
            x = 5;
            y = this.x;
          }
        }
      `,
    },
    {
      code: dedent`
        // works with nested classes
        function createClass() {
          return class Test {
            a = 5;
            b = this.a;
            contructor() {
              const a = class Test2 {
                a = 5;
                b = this.a;
              }
            }
            c = this.b;
            d = this.c;
          }
        }
      `,
    },
    {
      code: dedent`
        class Test {
          x = {
            value: this.getY()
          }
          getY() {
            console.log("this is class method");
          }
        }
      `,
    },
  ],

  invalid: [
    {
      code: dedent`
        class Test {
          test = this.y;
          y = 5;
        }
      `,

      errors: [
        {
          message: message('y'),
          line: 2,
          column: 10,
        },
      ],

      ...baseConfig,
    },

    {
      code: dedent`
        class Test {
          test = this.state.x;
          state = { x: 5 };
        }
      `,

      errors: [
        {
          message: message('state'),
          line: 2,
          column: 10,
        },
      ],

      ...baseConfig,
    },
    {
      code: dedent`
        class Test {
          test = this.y();
          y = 5;
        }
      `,

      errors: [
        {
          message: message('y'),
          line: 2,
          column: 10,
        },
      ],

      ...baseConfig,
    },
    {
      code: dedent`
        class Test {
          test = this.y.test();
          y = 5;
        }
      `,

      errors: [
        {
          message: message('y'),
          line: 2,
          column: 10,
        },
      ],

      ...baseConfig,
    },

    {
      code: dedent`
        class Test {
          test = test(this.y);
          y = 5;
        }
      `,

      errors: [
        {
          message: message('y'),
          line: 2,
          column: 15,
        },
      ],

      ...baseConfig,
    },

    {
      code: dedent`
        class Test {
          test = test([this.y]);
          y = 5;
        }
      `,

      errors: [
        {
          message: message('y'),
          line: 2,
          column: 16,
        },
      ],

      ...baseConfig,
    },

    {
      code: dedent`
        class Test {
          test = [this.y.test()];
          y = 5;
        }
      `,

      errors: [
        {
          message: message('y'),
          line: 2,
          column: 11,
        },
      ],

      ...baseConfig,
    },

    {
      code: dedent`
        class Test {
          state = { x: this._getValue() };
          _getValue = () => {};
        }
      `,

      errors: [
        {
          message: message('_getValue'),
          line: 2,
          column: 16,
        },
      ],

      ...baseConfig,
    },

    {
      // works with class expressions
      code: dedent`
        function test() {
          return class Test {
            state = { x: this._getValue() };
            _getValue = () => {};
          }
        }
      `,

      errors: [
        {
          message: message('_getValue'),
          line: 3,
          column: 18,
        },
      ],

      ...baseConfig,
    },

    {
      code: dedent`
        class Test {
          _getX = createSelector(
            [(x) => x, this._getY],
            () => {}
          );
          _getY = () => {};
        }
      `,

      errors: [
        {
          message: message('_getY'),
          line: 3,
          column: 16,
        },
      ],

      ...baseConfig,
    },
  ],
});
