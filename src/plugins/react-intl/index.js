/* @flow */
import rules from './rules';

export default {
  rules,

  configs: {
    'react-intl': {
      plugins: ['playlyfe'],
      parser: require.resolve('babel-eslint'),
      rules: {
        'playlyfe/react-intl-no-empty-translation': 'error',
        'playlyfe/react-intl-no-missing-id': 'error',
        'playlyfe/react-intl-no-undef-id': 'error',
        'playlyfe/react-intl-no-untranslated-string': 'error',
      },
    },
  },
};
