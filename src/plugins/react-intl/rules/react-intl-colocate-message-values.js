/* @flow */
import { type EslintRule } from 'eslint';
import * as icu from './utils/icu';
import * as astUtils from './utils/astUtils';
import reactIntlVisitor from './utils/reactIntlVisitor';

const Rule: EslintRule = {
  meta: {
    docs: {
      description:
        'enforces message args values to be defined with the message',
    },
  },

  create(context) {
    return reactIntlVisitor({
      defineMessages(node) {
        node.properties.forEach((property) => {
          if (property.value.type !== 'ObjectExpression') {
            return;
          }

          const defaultMessageNode = astUtils.findObjectExpressionProperty(
            property.value,
            'defaultMessage',
          );

          if (!defaultMessageNode) {
            return;
          }

          const messageNode = astUtils.getStringNodeValue(
            defaultMessageNode.value,
          );
          if (!messageNode) {
            return;
          }

          const message = icu.getMessageArguments(messageNode.value);

          if (message.args.length > 0) {
            context.report({
              node: property.key,
              message:
                'Use FormattedMessage/formatMessage instead of defineMessages for intl message containing args.',
            });
          }
        });
      },
    });
  },
};

module.exports = Rule;
