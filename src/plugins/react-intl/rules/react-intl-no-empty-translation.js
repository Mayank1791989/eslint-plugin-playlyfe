/* @flow */
import isLocaleFile from './utils/isLocaleFile';

module.exports = {
  meta: {},

  create(context) {
    if (!isLocaleFile(context.getFilename())) {
      return {};
    }

    return {
      Property(node) {
        const value = node.value.value;
        if (!value.trim()) {
          context.report({
            node: node.value,
            message: 'missing translation',
          });
        }
      },
    };
  },
};
