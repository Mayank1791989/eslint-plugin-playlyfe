/* @flow */
import { ConfigTester } from './test-utils';
import path from 'path';

const configTester = new ConfigTester({
  configFile: path.resolve(__dirname, './react-eslintrc.js'),
});

configTester.run('jsx-quotes', 'error', {
  valid: [{ code: '<div name="react" />' }],
  invalid: [{ code: "<div name='react' />" }],
});

configTester.run('playlyfe/react-boolean-prop-naming', 'off');
configTester.run('playlyfe/react-button-has-type', 'error');
configTester.run('playlyfe/react-default-props-match-prop-types', 'error', {
  invalid: [
    {
      code: `
        type Props = {
          value: string,
          disabled: boolean,
        };

        class Test extends React.Component {
          static props: Props;

          static defaultProps = {
            disabled: false
          };
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-destructuring-assignment', 'error', {
  valid: [
    {
      code: `
        class Test extends React.Component {
          render() {
            const { props } = this;
            return <div className={props.className} />;
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        class Test extends React.Component {
          render() {
            return <div className={this.props.className} />;
          }
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-display-name', 'error');
configTester.run('playlyfe/react-forbid-component-props', 'off');
configTester.run('playlyfe/react-forbid-dom-props', 'off');

configTester.run('playlyfe/react-forbid-prop-types', 'error', {
  invalid: [
    {
      code: `
        class Component extends React.Component {
          static propTypes = {
            y: PropTypes.array.isRequired,
          };
          render() {
            return <div />;
          }
        }
      `,
    },
    {
      code: `
        class Component extends React.Component {
          static propTypes = {
            x: PropTypes.object.isRequired,
          };
          render() {
            return <div />;
          }
        }
      `,
    },
    {
      code: `
        class Component extends React.Component {
          static propTypes = {
            z: PropTypes.any.isRequired,
          };
          render() {
            return <div />;
          }
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-no-array-index-key', 'warn');
configTester.run('playlyfe/react-no-children-prop', 'off');

configTester.run('playlyfe/react-no-danger', 'error', {
  invalid: [
    {
      code: `
        const Component = <div dangerouslySetInnerHTML={{ __html: "Hello World" }} />;
      `,
    },
  ],
});

configTester.run('playlyfe/react-no-danger-with-children', 'error');

configTester.run('playlyfe/react-no-deprecated', 'error');

configTester.run('playlyfe/react-no-did-mount-set-state', 'error', {
  invalid: [
    {
      code: `
        class Test extends React.Component {
          componentDidMount() {
            this.setState({ name: 'eslint' });
          }
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-no-did-update-set-state', 'error', {
  invalid: [
    {
      code: `
        class Test extends React.Component {
          componentDidUpdate() {
            this.setState({ name: 'eslint' });
          }
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-no-direct-mutation-state', 'error', {
  invalid: [
    {
      code: `
        class Test extends React.Component {
          handleAction() {
            this.state.name = 'test';
          }

          render() {
            return <div />;
          }
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-no-find-dom-node', 'error');
configTester.run('playlyfe/react-no-is-mounted', 'error');
configTester.run('playlyfe/react-no-multi-comp', 'off');
configTester.run(
  'playlyfe/react-no-redundant-should-component-update',
  'error',
);

configTester.run('playlyfe/react-no-render-return-value', 'error');
configTester.run('playlyfe/react-no-set-state', 'off');
configTester.run('playlyfe/react-no-typos', 'error');

configTester.run('playlyfe/react-no-string-refs', 'error');
configTester.run('playlyfe/react-no-unescaped-entities', 'error');

configTester.run('playlyfe/react-no-unknown-property', 'error', {
  invalid: [
    {
      code: `
        <div class="button" />
      `,
    },
  ],
});
configTester.run('playlyfe/react-no-unsafe', 'error');

configTester.run('playlyfe/react-no-unused-prop-types', 'off');
configTester.run('playlyfe/react-no-unused-state', 'error');

configTester.run('playlyfe/react-prefer-es6-class', 'error', {
  invalid: [
    {
      code: `
        import React from 'react';
        const Component = React.createClass({
          render() {
            return <div />;
          }
        });
      `,
    },
  ],
});

configTester.run('playlyfe/react-prefer-stateless-function', 'off');

configTester.run('playlyfe/react-prop-types', 'error', {
  invalid: [
    {
      code: `
        class Test extends React.Component {
          static propTypes = {
            name: PropTypes.string.isRequired,
          };
          render() {
            return <div name={this.props.unknown} />;
          }
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-react-in-jsx-scope', 'error', {
  valid: [
    {
      code: `
        import React from 'react';
        <div />
      `,
    },
  ],
  invalid: [
    {
      code: `
        <div />
      `,
    },
  ],
});

configTester.run('playlyfe/react-require-default-props', 'off');

configTester.run('playlyfe/react-require-optimization', 'off');

configTester.run('playlyfe/react-require-render-return', 'error');

configTester.run('playlyfe/react-self-closing-comp', 'error', {
  invalid: [{ code: '<div name="react"></div>' }],
});

configTester.run('playlyfe/react-sort-comp', 'error');

configTester.run('playlyfe/react-sort-prop-types', 'off');
configTester.run('playlyfe/react-style-prop-object', 'error');

configTester.run('playlyfe/react-jsx-boolean-value', 'error', {
  valid: [
    {
      code: '<div disabled={true} />',
    },
  ],
  invalid: [{ code: '<div disabled />' }],
});

configTester.run('playlyfe/react-jsx-child-element-spacing', 'error', {
  valid: [
    {
      code: '<div>Hello</div>',
    },
  ],
  invalid: [
    {
      code: `<div>
        Sooome link
        <a>Tst</a>
      </div>`,
    },
  ],
});

configTester.run('playlyfe/react-jsx-closing-bracket-location', 'error', {
  valid: [
    {
      code: `
        <div name="eslint" />
      `,
    },
    {
      code: `
        <div
          name="eslint"
          style="styles"
        />
      `,
    },
  ],
  invalid: [
    {
      code: `
        <div name="eslint"
          />
      `,
    },
    {
      code: `
        <div
          name="eslint"
          styles="style" />
      `,
    },
    {
      code: `
        <div
          name="eslint"
          styles="style" >
          Hello
        </div>
      `,
    },
    {
      code: `
        const a = (
          <div
            name="eslint"
            styles="styles"
        />
        );
      `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-closing-tag-location', 'error', {
  valid: [
    {
      code: `
        function test() {
          return (
            <div>
              <h1>Hello</h1>
              <h1>Test</h1>
            </div>
          )
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        function test() {
          return (
            <div>
              <h1>Hello</h1>
              <h1>Test</h1>
              </div>
          )
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-curly-newline', 'error', {
  valid: [
    {
      code: `
        <div>
          { foo }
        </div>
      `,
    },
    {
      code: `
        <div>
          {
            foo
          }
        </div>
      `,
    },
  ],
  invalid: [
    {
      code: `
        <div>
          { foo
          }
        </div>
      `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-curly-spacing', 'error', {
  valid: [
    { code: '<div value={5} />' },
    {
      code: `
        <div
          value={5}
          styles={
            <div className="test" />
          }
        />
      `,
    },
  ],
  invalid: [{ code: '<div value={ 5 } />' }],
});

configTester.run('playlyfe/react-jsx-equals-spacing', 'error', {
  invalid: [{ code: '<div name = "eslint" />' }],
});

configTester.run('playlyfe/react-jsx-filename-extension', 'off');

configTester.run('playlyfe/react-jsx-first-prop-new-line', 'error', {
  valid: [
    {
      code: `
        <div
          value={{
            test1: 1,
            test2: 1,
          }}
        />
      `,
    },
    { code: '<div value={{ test: 1 }} />' },
  ],

  invalid: [
    {
      code: `
        <div value={{
            test1: 1,
            test2: 1,
          }}
        />
      `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-handler-names', 'off');

configTester.run('playlyfe/react-jsx-indent', 'off', {
  // valid: [
  //   {
  //     code: `
  //       <div>
  //         <div>Test</div>
  //       </div>
  //     `,
  //   },
  //   {
  //     code: `
  //       <div>
  //         {test
  //           ? <div>
  //               <li>Item1</li>
  //             </div>
  //           : <div>False</div>
  //         }
  //       </div>
  //     `,
  //   },
  // ],
  // invalid: [
  //   {
  //     code: `
  //       <div>
  //           <div>Test</div>
  //       </div>
  //     `,
  //   },
  //   {
  //     code: `
  //       <div>
  //       <div>Test</div>
  //       </div>
  //     `,
  //   },
  // ],
});

configTester.run('playlyfe/react-jsx-indent-props', 'off', {
  // valid: [
  //   {
  //     code: `
  //       <div
  //         value={5}
  //         styles="styles"
  //       />
  //     `,
  //   },
  //   {
  //     // issue with ternary
  //     code: `
  //       <div>
  //         {someCondition
  //           ? <div
  //               id="test"
  //               className="test"
  //             />
  //           : <div id="test2" />
  //         }
  //       </div>
  //     `,
  //   },
  // ],
  // invalid: [
  //   {
  //     title: 'only 2 spaces indentation',
  //     code: `
  //       <div
  //           value={5}
  //           styles="styles"
  //       />
  //     `,
  //   },
  // ],
});

configTester.run('playlyfe/react-jsx-key', 'error', {
  invalid: [
    {
      code: `
      <div>
        {list.map((item) => (
          <ListItem item={item} />
        ))}
      </div>
    `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-max-props-per-line', 'error', {
  valid: [
    {
      code: '<div name="react" />',
    },
  ],
  invalid: [{ code: '<div name="react" styles="styles" />' }],
});

configTester.run('playlyfe/react-jsx-no-bind', 'error', {
  invalid: [
    // ref not allowed for now
    {
      code: `
        <button
          ref={(c) => this.node = c}
        >
          Click
        </button>
      `,
    },
    // arrow functions
    {
      code: `
        <button
          onClick={() => this.setState({show: true})}
        >
          Click
        </button>
      `,
    },
    // .bind functions
    {
      code: `
        <button
          onClick={this.handleClick.bind(this)}
        >
          Click
        </button>
      `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-no-comment-textnodes', 'error', {
  valid: [
    {
      code: `
        <div name = "eslint">
          {/* name span */}
          <span>Name</span>
        </div>
      `,
    },
  ],
  invalid: [
    {
      code: `
        <div name = "eslint">
          /* name span */
          <span>Name</span>
        </div>
      `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-no-duplicate-props', 'error', {
  invalid: [
    { code: '<div name="react" name="styles" />' },
    // dont allow case match
    { code: '<div name="react" Name="styles" />' },
  ],
});

configTester.run('playlyfe/react-jsx-no-literals', 'error');

configTester.run('playlyfe/react-jsx-no-target-blank', 'error', {
  invalid: [
    {
      code: '<a target="_blank" href="http://example.com/"></a>',
    },
  ],
});

configTester.run('playlyfe/react-jsx-no-undef', 'error', {
  valid: [
    {
      code: `
      import CustomButton from './ui';

      <CustomButton name="react" name="styles" />
    `,
    },
  ],
  invalid: [
    {
      code: `
      <CustomButton name="react" name="styles" />
    `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-one-expression-per-line', 'error');

configTester.run('playlyfe/react-jsx-curly-brace-presence', 'error', {
  valid: [
    // props
    {
      code: '<Test name="test" />',
    },
    {
      code: '<Test value={5} />',
    },
    {
      code: '<Test value={some_var} />',
    },
    // children
    {
      code: '<Test>Hello</Test>',
    },
  ],
  invalid: [
    {
      code: '<Test name={"test"} />',
    },
    {
      code: '<Test value={`value`} />',
    },
    // children
    {
      code: '<Test>{"Hello"}</Test>',
    },
  ],
});

configTester.run('playlyfe/react-jsx-pascal-case', 'error', {
  valid: [
    { code: '<div />' },
    { code: '<XYZHello />' },
    { code: '<_XYZHello />' },
    { code: '<Header.Title />' },
  ],
  invalid: [
    { code: '<Custom_Button name="react" />' },
    { code: '<__Custom_Button name="react" />' },
    { code: '<_Custom_Button name="react" />' },
  ],
});

configTester.run('playlyfe/react-jsx-sort-props', 'off');
configTester.run('playlyfe/react-jsx-sort-default-props', 'off');

configTester.run('playlyfe/react-jsx-space-before-closing', 'off');

configTester.run('playlyfe/react-jsx-tag-spacing', 'error', {
  valid: [{ code: '<div name="react" />' }],
  invalid: [
    { code: '<div name="react"/>' },
    { code: '< div name="react" />' },
    { code: '<div name="react" / >' },
  ],
});

configTester.run('playlyfe/react-jsx-uses-react', 'error');
configTester.run('playlyfe/react-jsx-uses-vars', 'error');

configTester.run('playlyfe/react-jsx-wrap-multilines', 'error', {
  invalid: [
    {
      code: `
        const component = () => {
          return <div
            name="eslint"
          />;
        }
      `,
    },
    {
      code: `
        const component = <div
          name="eslint"
        />;
      `,
    },
  ],
});

configTester.run('playlyfe/react-forbid-elements', 'off');
configTester.run('playlyfe/react-forbid-foreign-prop-types', 'off');
configTester.run('playlyfe/react-no-access-state-in-setstate', 'error');
configTester.run('playlyfe/react-void-dom-elements-no-children', 'error', {
  valid: [
    {
      code: `
        <img />
      `,
    },
  ],
  invalid: [
    {
      code: `
        <img>Hello</img>
      `,
    },
  ],
});

configTester.run('playlyfe/react-style-no-numeric-string-value', 'error');
configTester.run('playlyfe/react-no-will-update-set-state', 'error');
configTester.run('playlyfe/react-jsx-max-depth', 'off');
configTester.run('playlyfe/react-jsx-props-no-multi-spaces', 'error', {
  valid: [{ code: '<div id="test" style={{ color: \'red\' }} />' }],
  invalid: [{ code: '<div id="test"  style={{ color: \'red\' }} />' }],
});
configTester.run('playlyfe/react-no-this-in-sfc', 'error', {
  valid: [{ code: 'function Test(props) { return <div>{props.name}</div> }' }],
  invalid: [
    { code: 'function Test(props) { return <div>{this.props.name}</div> }' },
  ],
});

configTester.run('playlyfe/class-property-no-use-before-define', 'error', {
  valid: [
    {
      code: `
        class Component extends React.Component {
          state = {
            val: this.props.val,
          };
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-jsx-fragments', 'error', {
  valid: [
    { code: '<><Foo /></>' },
    { code: '<React.Fragment key="key"><Foo /></React.Fragment>' },
  ],
  invalid: [{ code: '<React.Fragment><Foo /></ React.Fragment>' }],
});

configTester.run('playlyfe/react-state-in-constructor', 'error', {
  valid: [
    {
      code: `
        class Foo extends React.Component {
          state = { bar: 0 }
          render() {
            return <div>Foo</div>
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        class Foo extends React.Component {
          constructor(props) {
            super(props)
            this.state = { bar: 0 }
          }
          render() {
            return <div>Foo</div>
          }
        }
      `,
    },
  ],
});

configTester.run('playlyfe/react-static-property-placement', 'off');

configTester.run('playlyfe/react-jsx-props-no-spreading', 'error', {
  invalid: [{ code: '<img {...props} />' }, { code: '<Test {...props} />' }],
});

configTester.run('playlyfe/react-prefer-read-only-props', 'off');
