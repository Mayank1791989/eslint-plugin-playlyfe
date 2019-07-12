/* @flow */
import * as astUtils from './utils/astUtils';
import { type EslintRule } from 'eslint';
import isLocaleFile from './utils/isLocaleFile';

const Rule: EslintRule = {
  meta: {},

  create(context) {
    if (!isLocaleFile(context.getFilename())) {
      return {};
    }

    return {
      Property(node) {
        const val = astUtils.getStringNodeValue(node.value);
        if (val && !val.value.trim()) {
          context.report({
            node: node.value,
            message: 'missing translation',
          });
        }
      },
    };
  },
};

module.exports = Rule;
