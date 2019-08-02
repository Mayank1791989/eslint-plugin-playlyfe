/* @flow */
import rule from '../relay-no-missing-variable-in-props';
import dedent from 'dedent-js';
import RuleTester from 'test-utils/RuleTester';

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const error = (missingVariables, others = {}) => ({
  message: `Missing relay variables in props [${missingVariables.join(',')}]`,
  ...others,
});

ruleTester.run('relay-no-missing-variable-in-props', rule, {
  valid: [
    {
      code: dedent`
        class Parent extends React.Component {
          render() {
            return <div>Test</div>
          }
        }

        export default Relay.createContainer(Parent, {
          fragments: {
            viewer: () => Relay.QL\`
              name
            \`,
          }
        });
      `,
    },
    {
      code: dedent`
        class Parent extends React.Component {
          render() {
            return (
              <div>
                <Child.Test
                  {...this.props}
                  value={this.props.value}
                  variable1={this.props.relay.variables.variable1}
                />
              </div>
            )
          }
        }

        export default Relay.createContainer(Parent, {
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${Child.Test.getFragment('viewer', {variable1: variables.variable1 })}
              }
            \`,
          }
        });
      `,
    },

    // works with functional components
    {
      code: dedent`
        const Parent = {
          Component: (props) => {
            return (
              <div>
                <Child.Test
                  {...props}
                  value={props.value}
                  variable1={props.relay.variables.variable1}
                />
              </div>
            );
          }
        };

        export default Relay.createContainer(Parent.Component, {
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${Child.Test.getFragment('viewer', {variable1: variables.variable1 })}
              }
            \`,
          }
        });
      `,
    },
    // should not crash with inline fragments
    {
      code: dedent`
        class Parent extends React.Component {
          render() { return <div />; }
        }
        export default Relay.createContainer(Parent, {
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${some_fragment}
              }
            \`,
          }
        });
      `,
    },

    // should not confuse with other tagged template strings
    {
      code: dedent`
        class Parent extends React.Component {
          render() { return <div />; }
        }
        export default Relay.createContainer(Parent, {
          initialVariables: {
            description: someTag\`
              some multiline
              tagged template string
            \`,
          },
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${some_fragment}
              }
            \`,
          }
        });
      `,
    },

    // should not fail if spec is not defined as object
    {
      code: dedent`
        class Parent extends React.Component { }
        export default Relay.createContainer(Parent, spec);
      `,
    },

    // should work if relay not present
    {
      code: '<div value="hello" />',
    },

    {
      code: 'const file = "some_plain_non_react_js_file";',
    },

    {
      code: 'const PureComponent = () => <div>Pure React Component</div>;',
    },

    // failed case in code
    {
      code: dedent`
        class UsersManageBatchList extends React.PureComponent {
          _rowRenderer = ({ index, key }: RowRenderOptions) => {
            const user = this.props.users[index];
            return (
              <div key={key}>
                <div>{user.name}</div>
              </div>
            );
          };

          render() {
            return this._rowRenderer({ index: 0, key: 'key' });
          }
        }

        export default Relay.createContainer(UsersManageBatchList, {
          fragments: {
            users: () => Relay.QL\`
              fragment on Player @relay(plural: true) {
                name
              }
            \`,
          },
        });
      `,
    },
  ],

  invalid: [
    {
      code: dedent`
        class Parent extends React.Component {
          render() {
            return (
              <div>
                <Child
                  value={this.props.value}
                />
              </div>
            )
          }
        }

        export default Relay.createContainer(Parent, {
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${Child.getFragment('viewer', {variable1: variables.variable1 })}
              }
            \`,
            player: (variables) => Relay.QL\`
              fragment on Player {
                name
                \${Child.getFragment('player')}
              }
            \`,
          }
        });
      `,

      errors: [error(['variable1'], { line: 5, column: 10 })],
    },

    {
      code: dedent`
        // should works when multiple components in same file
        class Parent extends React.Component {
          render() { return <Child />; }
        }

        class Parent2 extends React.Component {
          render () { return <Child />; }
        }

        Relay.createContainer(Parent, {
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${Child.getFragment('viewer', {variable1: variables.variable1 })}
              }
            \`,
          }
        })

        Relay.createContainer(Parent2, {
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${Child.getFragment('viewer', {variable2: variables.variable2 })}
              }
            \`,
          }
        })
      `,

      errors: [
        error(['variable1'], { line: 3, column: 22 }),
        error(['variable2'], { line: 7, column: 23 }),
      ],
    },

    // should work with pure components
    {
      code: dedent`
        const Parent = (props) => <Child />;

        export default Relay.createContainer(Parent, {
          fragments: {
            viewer: (variables) => Relay.QL\`
              fragment on Viewer {
                name
                \${Child.getFragment('viewer', {variable1: variables.variable1 })}
              }
            \`,
          }
        });
      `,

      errors: [error(['variable1'], { line: 1, column: 28 })],
    },
  ],
});
