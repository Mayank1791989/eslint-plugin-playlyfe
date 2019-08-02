/* @flow */
import { type EslintRule, type IdentifierNode } from 'eslint';

import * as icu from './utils/icu';
import * as astUtils from './utils/astUtils';
import _differenceWith from 'lodash/differenceWith';
import reactIntlVisitor from './utils/reactIntlVisitor';

const Rule: EslintRule = {
  meta: {
    docs: {
      description: 'check for missing and extra values',
    },
  },

  create(context) {
    return reactIntlVisitor({
      FormattedMessage(node, attrs) {
        const defaultMessageAttrNode = attrs.defaultMessage;
        if (!defaultMessageAttrNode) {
          return;
        }

        const valueNode = astUtils.getJSXAttributeValue(defaultMessageAttrNode);
        const message = astUtils.getStringNodeValue(valueNode);
        if (!message) {
          return;
        }

        const { err, args: requiredArgs } = icu.getMessageArguments(
          message.value,
        );
        if (err != null) {
          return;
        }

        const valuesAttrNode = attrs.values;
        if (requiredArgs.length > 0 && !valuesAttrNode) {
          context.report({
            node: node.name,
            message: 'Missing prop `values`',
          });
          highlightArgs(context, requiredArgs, message.loc);
          return;
        }

        if (!valuesAttrNode) {
          return;
        }

        const valuesAttrValue = astUtils.getJSXAttributeValue(valuesAttrNode);
        if (valuesAttrValue.type === 'ObjectExpression') {
          reportIfArgsMismatch(
            context,
            requiredArgs,
            valuesAttrValue,
            message.loc,
          );
        }
      },

      formatMessage(node, args) {
        const defaultMessageNode = args.defaultMessage;
        if (!defaultMessageNode) {
          return;
        }

        const message = astUtils.getStringNodeValue(defaultMessageNode.value);
        if (!message) {
          return;
        }

        const { err, args: requiredArgs } = icu.getMessageArguments(
          message.value,
        );
        if (err != null) {
          return;
        }

        const valuesArgNode = args.values;
        if (requiredArgs.length > 0 && !valuesArgNode) {
          context.report({
            node,
            message: 'Missing arg `values`',
          });
          highlightArgs(context, requiredArgs, message.loc);
          return;
        }

        if (!valuesArgNode) {
          return;
        }

        if (valuesArgNode.type === 'ObjectExpression') {
          reportIfArgsMismatch(
            context,
            requiredArgs,
            valuesArgNode,
            message.loc,
          );
        }
      },
    });
  },
};

module.exports = Rule;

function reportIfArgsMismatch(context, requiredArgs, valuesNode, offset) {
  const passedArgs = astUtils.getObjectIdentifierKeys(valuesNode);
  const { missingArgs, extraValues } = diffArgs(requiredArgs, passedArgs);

  if (missingArgs.length > 0) {
    const argsNames = missingArgs.map((arg) => `'${arg.id}'`);
    context.report({
      node: valuesNode,
      message: `Missing values for message args [${argsNames.join(',')}]`,
    });
    highlightArgs(context, missingArgs, offset);
  }

  if (extraValues.length > 0) {
    extraValues.forEach((node) => {
      context.report({
        node,
        message: `Unknown message arg '${node.name}' value provided`,
      });
    });
  }
}

function highlightArgs(context, args, offset) {
  args.forEach((arg) => {
    context.report({
      message: `Message arg '${arg.id}' value not provided`,
      loc: genErrorLoc(arg.location, offset),
    });
  });
}

function diffArgs(
  requiredArgs,
  passedValues,
): {
  missingArgs: Array<icu.ArgumentElement>,
  extraValues: Array<IdentifierNode>,
} {
  return {
    // bug in
    missingArgs: _differenceWith<$FixMe>(
      requiredArgs,
      passedValues,
      (arg, value) => arg.id === value.name,
    ),
    extraValues: _differenceWith<$FixMe>(
      passedValues,
      requiredArgs,
      (value, arg) => value.name === arg.id,
    ),
  };
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
