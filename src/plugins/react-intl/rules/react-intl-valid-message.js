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
        try {
          const valueNode = astUtils.getJSXAttributeValue(node);
          const message = astUtils.getStringNodeValue(valueNode);
          if (!message) {
            return;
          }
          icu.parse(message.value);
        } catch (err) {
          context.report({
            node,
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
            node,
            message: `Invalid message: ${err.message}`,
          });
        }
      },
    });
  },
};

module.exports = Rule;
