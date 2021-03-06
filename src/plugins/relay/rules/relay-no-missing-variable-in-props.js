/* @flow */
import Components from 'eslint-plugin-react/lib/util/Components';
import invariant from 'invariant';

module.exports = {
  meta: {
    docs: {
      description:
        'find missing relay variables in props of relay container component',
    },
  },

  create: Components.detect((context, components, utils) => {
    // any helper functions should go here or else delete this section
    const sourceCode = context.getSourceCode();

    function storeJSXElementAttrs(node) {
      const component = components.get(utils.getParentComponent());
      const jsxElements = (component && component.jsxElements) || [];

      // jsxElements
      jsxElements.push({
        name: sourceCode.getText(node.name),
        node,
      });

      components.set(node, { jsxElements });
    }

    function isRelayQL(node) {
      if (node.type !== 'TaggedTemplateExpression') {
        return false;
      }
      if (sourceCode.getText(node.tag) !== 'Relay.QL') {
        return false;
      }
      return true;
    }

    // node @TODO extends above React Component.detect util
    // to add relay related methods
    function isRelayCreateContainer(node) {
      invariant(
        node.type === 'CallExpression',
        'node should be of type CallExpression',
      );
      const name = sourceCode.getText(node.callee);
      return (
        name === 'Relay.createContainer' || name === 'createRelayContainer'
      );
    }

    function getComponentName(node) {
      // eslint-disable-line consistent-return
      let name = '';
      if (node.id) {
        // component is class component
        ({ name } = node.id);
      } else {
        // pure function or React.createClass
        // const componentName = Component; // variable declaration
        let { parent } = node;
        while (parent) {
          if (parent.type === 'VariableDeclarator') {
            ({ name } = parent.id);
            break;
          }
          ({ parent } = parent);
        }
      }

      return name;
    }

    const activeRelayComponents = [];
    const relayComponentsVariablesMapping = {};

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------
    return {
      JSXOpeningElement(node) {
        storeJSXElementAttrs(node);
      },

      CallExpression(node) {
        if (!isRelayCreateContainer(node)) {
          return;
        }
        const componentName = sourceCode.getText(node.arguments[0]);
        relayComponentsVariablesMapping[componentName] = {};
        activeRelayComponents.push(componentName);
      },

      TaggedTemplateExpression(node) {
        if (!isRelayQL(node)) {
          return;
        }

        const activeComponentName =
          activeRelayComponents[activeRelayComponents.length - 1];

        if (!activeComponentName) {
          return;
        }

        const variablesMapping =
          relayComponentsVariablesMapping[activeComponentName];

        node.quasi.expressions.forEach((expression) => {
          if (expression.type !== 'CallExpression') {
            return;
          } // there can be inline fragments
          // if not variables passed
          if (expression.arguments.length !== 2) {
            return;
          }

          // jsxElementName.getFragment('xyz', { var1, var2, var3 })
          // return jsxElementName
          const jsxElementName = sourceCode.getText(expression.callee.object);
          const variables = expression.arguments[1].properties.map(
            (p) => p.key.name,
          );
          variablesMapping[jsxElementName] = variables; // eslint-disable-line no-param-reassign
        });
      },

      'CallExpression:exit': function CallExpressionExit(node) {
        if (!isRelayCreateContainer(node)) {
          return;
        }

        const componentName = sourceCode.getText(node.arguments[0]);
        const name = activeRelayComponents.pop();
        if (name !== componentName) {
          throw new Error('Something wrong');
        }
      },

      'Program:exit': function ProgramExit() {
        const list = components.list();

        if (Object.keys(relayComponentsVariablesMapping).length === 0) {
          // no relay createContainer present in file
          return;
        }

        Object.keys(list).forEach((key) => {
          const component = list[key];
          const jsxElements = component.jsxElements || [];
          const componentName = getComponentName(component.node);
          const variablesMapping =
            relayComponentsVariablesMapping[componentName];
          if (!variablesMapping) {
            return;
          }

          jsxElements.forEach(({ name, node }) => {
            const variables = variablesMapping[name];
            if (!variables) {
              return;
            }
            // jsx elements map
            const attrsMap = node.attributes.reduce((acc, attr) => {
              // ignore other like JSXSpreadAttribute
              if (attr.type !== 'JSXAttribute') {
                return acc;
              }
              acc[attr.name.name] = true; // eslint-disable-line no-param-reassign
              return acc;
            }, {});

            const missingVariableProps = variables.filter(
              (variable) => !attrsMap[variable],
            );
            if (!(missingVariableProps && missingVariableProps.length === 0)) {
              context.report({
                node: node.name,
                message: `Missing relay variables in props [${missingVariableProps}]`,
              });
            }
          });
        });
      },
    };
  }),
};
