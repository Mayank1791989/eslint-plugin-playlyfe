/* @flow */
import { rules } from 'eslint-plugin-flowtype';
import renameRules from '../../utils/renameRules';

export default {
  rules: renameRules('flowtype', rules),
  configs: {
    flowtype: {
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
        'playlyfe/flowtype-boolean-style': ['error', 'boolean'],
        'playlyfe/flowtype-define-flow-type': 'error', // (not error) [enabling rule]
        'playlyfe/flowtype-delimiter-dangle': ['error', 'always-multiline'],
        'playlyfe/flowtype-generic-spacing': ['error', 'never'],
        'playlyfe/flowtype-no-dupe-keys': 'error',

        'playlyfe/flowtype-no-mutable-array': 'off',

        'playlyfe/flowtype-no-primitive-constructor-types': 'error',

        'playlyfe/flowtype-no-weak-types': 'warn',

        'playlyfe/babel-flowtype-object-type': 'off',
        'playlyfe/flowtype-object-type-delimiter': ['error', 'comma'],

        'playlyfe/flowtype-require-parameter-type': 'off',
        'playlyfe/flowtype-require-return-type': 'off',

        'playlyfe/flowtype-require-valid-file-annotation': [
          'error',
          'always',
          { annotationStyle: 'block' },
        ],

        'playlyfe/flowtype-require-variable-type': 'off',
        'playlyfe/flowtype-semi': ['error', 'always'],

        'playlyfe/flowtype-sort-keys': 'off',

        'playlyfe/flowtype-space-after-type-colon': ['error', 'always'],
        'playlyfe/flowtype-space-before-generic-bracket': ['error', 'never'],
        'playlyfe/flowtype-space-before-type-colon': ['error', 'never'],

        // should start with capital letter
        'playlyfe/flowtype-type-id-match': ['error', '^_?([A-Z][A-Za-z0-9]*)$'],

        'playlyfe/flowtype-union-intersection-spacing': ['error', 'always'],

        'playlyfe/flowtype-use-flow-type': 'error', // error means enable

        // deprecated
        'playlyfe/flowtype-valid-syntax': 'off',

        'playlyfe/flowtype-no-types-missing-file-annotation': 'error',

        // disallow usage of expressions in statement position
        'no-unused-expressions': 'off',
        'playlyfe/flowtype-no-unused-expressions': [
          'error',
          {
            allowShortCircuit: false,
            allowTernary: false,
          },
        ],
      },
    },
  },
};
