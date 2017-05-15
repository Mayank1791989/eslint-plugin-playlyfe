/* @flow */
import { rules } from 'eslint-plugin-flowtype';
import renameRules from '../../utils/renameRules';

export default {
  rules: renameRules('flow', rules),
  configs: {
    flow: {
      parser: require.resolve('babel-eslint'),

      globals: {
        ReactClass: false,
        React$Element: true,

        // flow experimentals
        $Keys: false,
        $Exact: false,
        $Shape: false,
        $PropertyType: false,
        $ObjectMapi: false,
        $ObjMap: false,
        $TuppleMap: false,
      },

      rules: {
        'playlyfe/flow-boolean-style': ['error', 'boolean'],
        'playlyfe/flow-define-flow-type': 'error', // (not error) [enabling rule]
        'playlyfe/flow-delimiter-dangle': ['error', 'always-multiline'],
        'playlyfe/flow-generic-spacing': ['error', 'never'],
        'playlyfe/flow-no-dupe-keys': 'error',

        'playlyfe/flow-no-primitive-constructor-types': 'error',

        'playlyfe/flow-no-weak-types': 'warn',

        'playlyfe/babel-flow-object-type': 'off',
        'playlyfe/flow-object-type-delimiter': ['error', 'comma'],

        'playlyfe/flow-require-parameter-type': 'off',
        'playlyfe/flow-require-return-type': 'off',

        'playlyfe/flow-require-valid-file-annotation': [
          'error',
          'always',
          { annotationStyle: 'block' },
        ],

        'playlyfe/flow-require-variable-type': 'off',
        'playlyfe/flow-semi': ['error', 'always'],

        'playlyfe/flow-sort-keys': 'off',

        'playlyfe/flow-space-after-type-colon': ['error', 'always'],
        'playlyfe/flow-space-before-generic-bracket': ['error', 'never'],
        'playlyfe/flow-space-before-type-colon': ['error', 'never'],

        // should start with capital letter
        'playlyfe/flow-type-id-match': ['error', '^_?([A-Z][A-Za-z0-9]*)$'],

        'playlyfe/flow-union-intersection-spacing': ['error', 'always'],

        'playlyfe/flow-use-flow-type': 'error', // error means enable

        // deprecated
        'playlyfe/flow-valid-syntax': 'off',

        'playlyfe/flow-no-types-missing-file-annotation': 'error',
      },
    },
  },
};
