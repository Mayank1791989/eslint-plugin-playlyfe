/* @flow */
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true /* restrict to this level */,

  extends: [
    'plugin:playlyfe/js',
    'plugin:playlyfe/flowtype',
    'plugin:playlyfe/prettier',
    'plugin:playlyfe/testing:jest',
  ],

  env: {
    node: true
  },

  parser: 'babel-eslint',

  plugins: ['eslint-plugin-playlyfe'],

  rules: {
    'require-unicode-regexp': 'off',
  },
};
