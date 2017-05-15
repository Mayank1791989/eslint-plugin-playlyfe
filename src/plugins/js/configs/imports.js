/* @flow */
module.exports = {
  parser: require.resolve('babel-eslint'),

  env: {
    es6: true,
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json'],
      },
    },

    'import/resolve': {
      extensions: ['.js'],
    },

    'import/core-modules': [],

    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },

  rules: {
    // Static analysis:
    'playlyfe/import-no-unresolved': ['error', { commonjs: true }],
    'playlyfe/import-named': 'error',
    'playlyfe/import-default': 'error',
    'playlyfe/import-namespace': 'error',
    'playlyfe/import-no-restricted-paths': 'off',
    'playlyfe/import-no-absolute-path': 'error',
    'playlyfe/import-no-dynamic-require': 'error',
    'playlyfe/import-no-internal-modules': 'off',
    'playlyfe/import-no-webpack-loader-syntax': 'error',

    // ----------- Helpful warnings ------------ //
    'playlyfe/import-export': 'error',
    'playlyfe/import-no-named-as-default': 'error',
    'playlyfe/import-no-named-as-default-member': 'error',
    'playlyfe/import-no-deprecated': 'off',
    // important rule
    'playlyfe/import-no-extraneous-dependencies': [
      'error',
      {
        // allow [TODO: this should not be allowed in code
        // should only be allowed in scripts and tests]
        devDependencies: true,
        peerDependencies: true, // allow
        optionalDependencies: false, // dont allow
      },
    ],
    'playlyfe/import-no-mutable-exports': 'error',

    // Module systems:
    'playlyfe/import-unambiguous': 'error',
    'playlyfe/import-no-commonjs': 'error',
    'playlyfe/import-no-amd': 'error',
    'playlyfe/import-no-nodejs-modules': 'off',

    // Style guide:
    'playlyfe/import-first': 'error',
    'playlyfe/import-imports-first': 'off', // deprecated

    'playlyfe/import-no-duplicates': 'error',
    'playlyfe/import-no-namespace': 'error',
    'playlyfe/import-extensions': ['error', 'always', { js: 'never' }],
    'playlyfe/import-order': [
      'off',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'playlyfe/import-newline-after-import': 'error',
    'playlyfe/import-prefer-default-export': 'warn',
    'playlyfe/import-max-dependencies': 'off',

    // disable rule wherever required
    'playlyfe/import-no-unassigned-import': 'error',
    'playlyfe/import-no-named-default': 'error',
  },
};
