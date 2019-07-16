/* @flow */
import { type EslintRule } from 'eslint';

const Rule: EslintRule = {
  meta: {
    docs: {
      description: 'check dependencies in package.json are exact',
    },

    schema: [
      {
        type: 'object',
        properties: {
          ignoreProperties: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const configuration = context.options[0] || {};
    const ignoreProperties = (configuration.ignoreProperties || []).reduce(
      (acc, property) => {
        acc[property] = true;
        return acc;
      },
      {},
    );
    const definedClassProperties = new Map();
    const classMethods = new Map();

    return {
      ClassBody(node) {
        definedClassProperties.set(node, {});
        classMethods.set(node, getClassMethods(node));
      },

      // eslint-disable-next-line func-names
      'ClassBody:exit': function(node) {
        definedClassProperties.delete(node);
        classMethods.delete(node);
      },

      ClassProperty(node) {
        const bodyNode = node.parent;
        const definedProperties = definedClassProperties.get(bodyNode);
        const methods = classMethods.get(bodyNode);

        findOtherClassPropertyReferences(
          node.value,
          (propertyName, usageNode) => {
            if (
              !methods[propertyName] &&
              !definedProperties[propertyName] &&
              !ignoreProperties[propertyName]
            ) {
              context.report({
                node: usageNode,
                message: `class property '${propertyName}' was used before it was defined.`,
              });
            }
          },
        );

        // add to definedClassProperties
        if (node.key.type === 'Identifier') {
          definedProperties[node.key.name] = true;
          definedClassProperties.set(bodyNode, definedProperties);
        }
      },
    };
  },
};

module.exports = Rule;

function findOtherClassPropertyReferences(
  node: ?Object,
  clb: (propertyName: string, node: any) => void,
) {
  if (!node) {
    return;
  }

  switch (node.type) {
    case 'MemberExpression': {
      // case 1): this.property (ignore computed properties of this[] form)
      if (node.object.type === 'ThisExpression') {
        if (!node.computed && node.property.type === 'Identifier') {
          clb(node.property.name, node);
        }
      } else {
        findOtherClassPropertyReferences(node.object, clb);
      }
      break;
    }
    // this.property()
    case 'CallExpression': {
      // case: this.property()
      findOtherClassPropertyReferences(node.callee, clb);
      // case: xyz(this.property)
      node.arguments.forEach(argNode => {
        findOtherClassPropertyReferences(argNode, clb);
      });
      break;
    }
    // Can be present in both key and value
    case 'ObjectExpression': {
      // case: in key { [this.property]: any }
      node.properties.forEach(propertyNode => {
        findOtherClassPropertyReferences(propertyNode.key, clb);
        findOtherClassPropertyReferences(propertyNode.value, clb);
      });
      break;
    }
    // [this.property]
    case 'ArrayExpression': {
      node.elements.forEach(elemNode => {
        findOtherClassPropertyReferences(elemNode, clb);
      });
      break;
    }
    default:
      break;
  }
}

function getClassMethods(node) {
  return node.body.reduce((acc, bodyNode) => {
    if (
      bodyNode.type === 'MethodDefinition' &&
      bodyNode.key.type === 'Identifier'
    ) {
      acc[bodyNode.key.name] = true;
    }
    return acc;
  }, {});
}
