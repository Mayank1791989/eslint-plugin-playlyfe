module.exports = {
  rules: {
    // enforce or disallow variable initializations at definition
    'init-declarations': ['error', 'always'],

    // disallow the catch clause parameter name being the same as a variable in the outer scope
    // Note: no need dont support ie8
    'no-catch-shadow': 'off',

    // disallow deletion of variables
    'no-delete-var': 'error',

    // disallow labels that share a name with a variable
    // http://eslint.org/docs/rules/no-label-var
    'no-label-var': 'error',

    // disallow specific globals
    'no-restricted-globals': 'off',

    // disallow shadowing of names such as arguments
    'no-shadow-restricted-names': 'error',

    // disallow declaration of variables already declared in the outer scope
    'no-shadow': 'error',

    // disallow use of undefined when initializing variables
    'no-undef-init': 'error',

    // disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undef': 'error',

    // disallow use of undefined variable
    // TODO: change to error if looks good else turn off
    'no-undefined': 'warn',

    // disallow declaration of variables that are not used in the code
    'no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'after-used',
        ignoreRestSiblings: true,
        caughtErrors: 'none',
      },
    ],

    // disallow use of variables before they are defined
    // allow only functions
    'no-use-before-define': ['error', { functions: false, classes: true }],
  },
};
