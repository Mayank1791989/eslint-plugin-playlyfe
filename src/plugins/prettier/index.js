/* @flow */
import { rules } from 'eslint-plugin-prettier';
import renameConfigRules from '../../utils/renameConfigRules';

import jsConfig from 'eslint-config-prettier';
import flowConfig from 'eslint-config-prettier/flowtype';
import reactConfig from 'eslint-config-prettier/react';
import babelConfig from 'eslint-config-prettier/babel';

export default {
  rules: {
    prettier: rules.prettier,
  },
  configs: {
    prettier: {
      plugins: ['playlyfe'],

      rules: {
        'playlyfe/prettier': 'error',
        // disable rules for priettier
        ...jsConfig.rules,
        ...renameConfigRules(flowConfig.rules),
        ...renameConfigRules(reactConfig.rules),
        ...renameConfigRules(babelConfig.rules),
      },
    },
  },
};
