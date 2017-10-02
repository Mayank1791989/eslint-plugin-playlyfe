/* @flow */
module.exports = {
  plugins: ['playlyfe'],
  extends: [
    'plugin:playlyfe/js',
    'plugin:playlyfe/flowtype',
    'plugin:playlyfe/react',
    // to disable rules for prettier
    'plugin:playlyfe/prettier',
  ],
};
