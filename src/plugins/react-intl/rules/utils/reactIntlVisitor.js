/* @flow */
import {
  type EslintRuleVisitor,
  type JSXAttributeNode,
  type JSXOpeningElementNode,
  type IdentifierNode,
  type Node,
  type ObjectPropertyNode,
  type ObjectExpressionNode,
} from 'eslint';
import * as astUtils from './astUtils';

type ReactIntlNodes = {|
  +FormattedMessage?: (
    node: JSXOpeningElementNode,
    attrs: {
      id: ?JSXAttributeNode,
      defaultMessage: ?JSXAttributeNode,
      values: ?JSXAttributeNode,
    },
  ) => void,
  +formatMessage?: (
    node: IdentifierNode,
    args: {
      id: ?ObjectPropertyNode,
      defaultMessage: ?ObjectPropertyNode,
      values: ?Node,
    },
  ) => void,
  +defineMessages?: (node: ObjectExpressionNode) => void,
  +defaultMessageJSXAttr?: (node: JSXAttributeNode) => void,
  +defaultMessageProperty?: (node: ObjectPropertyNode) => void,
|};

export default function reactIntlVisitor(
  visitNodes: ReactIntlNodes,
): EslintRuleVisitor {
  return {
    ...(visitNodes.FormattedMessage || visitNodes.defaultMessageJSXAttr
      ? {
          JSXOpeningElement(node) {
            if (node.name && node.name.name !== 'FormattedMessage') {
              return;
            }

            const { FormattedMessage, defaultMessageJSXAttr } = visitNodes;

            if (FormattedMessage) {
              FormattedMessage(node, {
                id: astUtils.findJSXAttribute(node, 'id'),
                defaultMessage: astUtils.findJSXAttribute(
                  node,
                  'defaultMessage',
                ),
                values: astUtils.findJSXAttribute(node, 'values'),
              });
            }

            if (defaultMessageJSXAttr) {
              const attrNode = astUtils.findJSXAttribute(
                node,
                'defaultMessage',
              );
              if (attrNode) {
                defaultMessageJSXAttr(attrNode);
              }
            }
          },
        }
      : {}),

    ...(visitNodes.defaultMessageProperty || visitNodes.formatMessage
      ? {
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

            if (visitNodes.formatMessage) {
              const { formatMessage } = visitNodes;
              formatMessage(node.property, {
                id: astUtils.findObjectExpressionProperty(definitionArg, 'id'),
                defaultMessage: astUtils.findObjectExpressionProperty(
                  definitionArg,
                  'defaultMessage',
                ),
                values: valuesArg,
              });
            }

            if (visitNodes.defaultMessageProperty) {
              const { defaultMessageProperty } = visitNodes;
              const defaultMessageNode = astUtils.findObjectExpressionProperty(
                definitionArg,
                'defaultMessage',
              );
              if (defaultMessageNode) {
                defaultMessageProperty(defaultMessageNode);
              }
            }
          },
        }
      : {}),

    ...(visitNodes.defineMessages || visitNodes.defaultMessageProperty
      ? {
          CallExpression(node) {
            if (
              !(
                node.callee &&
                node.callee.type === 'Identifier' &&
                node.callee.name === 'defineMessages'
              )
            ) {
              return;
            }

            const [valueNode] = node.arguments;

            if (!valueNode || valueNode.type !== 'ObjectExpression') {
              return;
            }

            if (visitNodes.defineMessages) {
              visitNodes.defineMessages(valueNode);
            }

            if (visitNodes.defaultMessageProperty) {
              const { defaultMessageProperty } = visitNodes;

              valueNode.properties.forEach((property) => {
                if (property.value.type !== 'ObjectExpression') {
                  return;
                }
                const defaultMessageNode = astUtils.findObjectExpressionProperty(
                  property.value,
                  'defaultMessage',
                );

                if (defaultMessageNode) {
                  defaultMessageProperty(defaultMessageNode);
                }
              });
            }
          },
        }
      : {}),
  };
}
