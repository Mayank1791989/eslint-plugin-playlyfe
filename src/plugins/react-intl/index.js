/* @flow */
import rules from './rules';

export default {
  rules,

  configs: {
    'react-intl': {
      plugins: ['playlyfe'],
      parser: require.resolve('babel-eslint'),
      rules: {
        'playlyfe/react-intl-no-empty-translation': 'warn',
        'playlyfe/react-intl-no-missing-id': 'warn',
        'playlyfe/react-intl-no-undef-id': 'warn',
        'playlyfe/react-intl-no-untranslated-string': 'warn',
      },
    },
  },
};
