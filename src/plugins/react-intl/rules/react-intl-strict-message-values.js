/* @flow */
import { getMessageArguments } from './utils/intlMessageFormat';
import * as astUtils from './utils/astUtils';
import _differenceWith from 'lodash/differenceWith';

module.exports = {
  meta: {
    docs: {
      description: 'check for missing and extra values',
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name && node.name.name !== 'FormattedMessage') {
          return;
        }

        const messageAttrNode = astUtils.findJSXAttribute(
          node,
          'defaultMessage',
        );
        if (!messageAttrNode) {
          return;
        }
        const message = getJSXAttributeValue(messageAttrNode.value);
        if (!message) {
          return;
        }

        const requiredArgs = getMessageArguments(message.value);
        const valuesAttrNode = astUtils.findJSXAttribute(node, 'values');

        if (requiredArgs.length > 0 && !valuesAttrNode) {
          context.report({
            node: node.name,
            message: 'Missing prop `values`',
          });
          highlightArgs(requiredArgs, message.loc);
          return;
        }

        if (
          !valuesAttrNode ||
          valuesAttrNode.value.type !== 'JSXExpressionContainer' ||
          valuesAttrNode.value.expression.type !== 'ObjectExpression'
        ) {
          return;
        }

        reportIfArgsMismatch(
          requiredArgs,
          valuesAttrNode.value.expression,
          message.loc,
        );
      },

      MemberExpression(node) {
        if (
          !(
            node.property &&
            node.property.name === 'formatMessage' &&
            node.parent.type === 'CallExpression'
          )
        ) {
          return;
        }

        const [definitionArg, valuesArg] = node.parent.arguments;
        if (!definitionArg || definitionArg.type !== 'ObjectExpression') {
          return;
        }

        const propertyNode = astUtils.findObjectExpressionProperty(
          definitionArg,
          'defaultMessage',
        );
        if (!propertyNode) {
          return;
        }

        const message = astUtils.getStringNodeValue(propertyNode.value);
        if (!message) {
          return;
        }

        const requiredArgs = getMessageArguments(message.value);

        if (requiredArgs.length > 0 && !valuesArg) {
          context.report({
            node: node.property,
            message: 'Missing arg `values`',
          });
          highlightArgs(requiredArgs, message.loc);
          return;
        }

        if (!valuesArg || valuesArg.type !== 'ObjectExpression') {
          return;
        }

        reportIfArgsMismatch(requiredArgs, valuesArg, message.loc);
      },
    };

    function reportIfArgsMismatch(requiredArgs, valuesNode, offset) {
      const passedArgs = getPassedValues(valuesNode);
      const { missingArgs, extraArgs } = diffArgs(requiredArgs, passedArgs);

      if (missingArgs.length > 0) {
        const argsNames = missingArgs.map(arg => `'${arg.id}'`);
        context.report({
          node: valuesNode,
          message: `Missing values for message args [${argsNames.join(',')}]`,
        });
        highlightArgs(missingArgs, offset);
      }

      if (extraArgs.length > 0) {
        extraArgs.forEach(node => {
          context.report({
            node,
            message: `Unknow message arg '${node.name}' value provided`,
          });
        });
      }
    }

    function highlightArgs(args, offset) {
      args.forEach(arg => {
        context.report({
          message: `Message arg '${arg.id}' value not provided`,
          loc: genErrorLoc(arg.location, offset),
        });
      });
    }
  },
};

function diffArgs(requiredArgs, passedArgs) {
  return {
    missingArgs: _differenceWith(
      requiredArgs,
      passedArgs,
      (a, b) => a.id === b.name,
    ),
    extraArgs: _differenceWith(
      passedArgs,
      requiredArgs,
      (a, b) => a.name === b.id,
    ),
  };
}

function getPassedValues(node) {
  return node.properties.reduce((acc, property) => {
    if (property.type === 'Property' && property.key.type === 'Identifier') {
      acc.push(property.key);
    }
    return acc;
  }, []);
}

function genErrorLoc(loc, offsetLoc) {
  return {
    start: {
      line: offsetLoc.start.line + loc.start.line - 1,
      column:
        loc.start.line === 1
          ? offsetLoc.start.column + loc.start.column
          : loc.start.column - 1,
    },
    end: {
      line: offsetLoc.start.line + loc.end.line - 1,
      column:
        loc.end.line === 1
          ? offsetLoc.start.column + loc.end.column
          : loc.end.column - 1,
    },
  };
}

function getJSXAttributeValue(node) {
  if (node.type === 'JSXExpressionContainer') {
    return getJSXAttributeValue(node.expression);
  }
  return astUtils.getStringNodeValue(node);
}
