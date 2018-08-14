/* @flow */
import rules from './rules';

import jsonPreprocessor from './processors/json';

export default {
  rules,
  configs: {
    json: {
      parser: require.resolve('babel-eslint'),

      rules: {
        'playlyfe/use-exact-dependency': 'error',
      },
    },
  },
  processors: {
    '.json': jsonPreprocessor,
  },
};
