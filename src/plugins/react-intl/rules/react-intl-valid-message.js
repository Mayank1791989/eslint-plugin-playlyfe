/* @flow */
import { type EslintRule } from 'eslint';
import * as icu from './utils/icu';
import * as astUtils from './utils/astUtils';
import reactIntlVisitor from './utils/reactIntlVisitor';

const Rule: EslintRule = {
  meta: {
    docs: {
      description: 'report invalid icu message',
    },
  },

  create(context) {
    return reactIntlVisitor({
      defaultMessageJSXAttr(node) {
        const valueNode = astUtils.getJSXAttributeValue(node);
        try {
          const message = astUtils.getStringNodeValue(valueNode);
          if (!message) {
            return;
          }
          icu.parse(message.value);
        } catch (err) {
          context.report({
            node: valueNode,
            message: `Invalid message: ${err.message}`,
          });
        }
      },
      defaultMessageProperty(node) {
        try {
          const message = astUtils.getStringNodeValue(node.value);
          if (!message) {
            return;
          }
          icu.parse(message.value);
        } catch (err) {
          context.report({
            node: node.value,
            message: `Invalid message: ${err.message}`,
          });
        }
      },
    });
  },
};

module.exports = Rule;
