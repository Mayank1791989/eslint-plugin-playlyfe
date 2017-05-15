/* @flow */
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'eslint-config-airbnb-base/rules/best-practices',
    'eslint-config-airbnb-base/rules/errors',
    'eslint-config-airbnb-base/rules/node',
    'eslint-config-airbnb-base/rules/style',
    'eslint-config-airbnb-base/rules/variables',
    'eslint-config-airbnb-base/rules/es6',
  ].map(require.resolve),
  parser: 'babel-eslint',

  env: {
    jest: true,
  },

  globals: {
    $Exact: false,
    $Keys: false,
    jasmine: false,
  },

  rules: {
    'no-param-reassign': [ERROR, { 'props': false }],
    'no-underscore-dangle': OFF,
    'global-require': OFF,
  },
};
