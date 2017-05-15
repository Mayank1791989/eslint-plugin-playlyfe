/* @flow */
export default {
  js: {
    parser: require.resolve('babel-eslint'),

    parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: false,
      codeFrame: false,
    },

    extends: [
      // js
      './possible-errors',
      './strict-mode',
      './best-practices',
      './variables',
      './stylistic-issues',
      // './imports', (Buggy will see later)
      './node-commonjs',

      // es
      './es-latest',
    ].map(require.resolve),

    rules: {
      'playlyfe/use-exact-dependency': 'error',

      // buggy rules
      'object-curly-newline': 'off',
    },
  },
};
