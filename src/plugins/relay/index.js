/* @flow */
import rules from './rules';

export default {
  rules,

  configs: {
    relay: {
      plugins: ['playlyfe'],
      parser: require.resolve('babel-eslint'),
      rules: {
        'playlyfe/relay-no-missing-variable-in-props': 'error',
      },
    },
  },
};
