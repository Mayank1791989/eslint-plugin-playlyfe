/* @flow */
import * as astUtils from './utils/astUtils';
import { getMessageArguments } from './utils/intlMessageFormat';

module.exports = {
  meta: {
    docs: {
      description:
        'enforces message args values to be defined with the message',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        //
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

        valueNode.properties.forEach(property => {
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

          const messageArgs = getMessageArguments(messageNode.value);

          if (messageArgs.length > 0) {
            context.report({
              node: property.key,
              message:
                'Use FormattedMessage/formatMessage instead of defineMessages for intl message containing args.',
            });
          }
        });
      },
    };
  },
};
