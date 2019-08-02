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
      require.resolve('./possible-errors'),
      require.resolve('./strict-mode'),
      require.resolve('./best-practices'),
      require.resolve('./variables'),
      require.resolve('./stylistic-issues'),
      // require.resolve('./imports'), (Buggy will see later)
      require.resolve('./node-commonjs'),

      // es
      require.resolve('./es-latest'),
    ],

    rules: {
      'playlyfe/freeze-const-object': 'error',
      'playlyfe/class-property-no-use-before-define': 'error',
      'playlyfe/indent-template-strings': 'error',

      // buggy rules
      'object-curly-newline': 'off',
    },
  },
};
