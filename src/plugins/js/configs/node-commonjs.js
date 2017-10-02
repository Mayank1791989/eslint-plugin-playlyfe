/* @flow */
module.exports = {
  rules: {
    'callback-return': 'error',

    // using es6 imports and if using require somewhere then
    // it will always inside some function or condition
    'global-require': 'off',

    'handle-callback-err': ['error', '^.*(e|E)rr'],

    'no-buffer-constructor': 'error',

    'no-mixed-requires': 'error',
    'no-new-require': 'error',
    'no-path-concat': 'error',
    'no-process-env': 'off',
    'no-process-exit': 'off',
    'no-restricted-modules': [
      'error',
      {
        paths: ['lodash'],
      },
    ],
    'no-sync': 'warn',
  },
};
