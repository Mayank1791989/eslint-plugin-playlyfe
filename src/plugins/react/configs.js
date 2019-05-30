/* @flow */
export default {
  react: {
    plugins: ['playlyfe'],

    parser: require.resolve('babel-eslint'),

    parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: false,
      codeFrame: false,
    },

    rules: {
      'jsx-quotes': ['error', 'prefer-double'],

      'playlyfe/react-boolean-prop-naming': 'off',

      'playlyfe/react-button-has-type': 'error',

      'playlyfe/react-default-props-match-prop-types': [
        'error',
        { allowRequiredDefaults: false },
      ],

      'playlyfe/react-destructuring-assignment': ['error', 'always'],

      'playlyfe/react-display-name': ['error', { ignoreTranspilerName: false }],

      'playlyfe/react-forbid-component-props': 'off',
      'playlyfe/react-forbid-dom-props': 'off',

      'playlyfe/react-forbid-prop-types': [
        'error',
        { forbid: ['any', 'array', 'object'] },
      ],

      //
      'playlyfe/react-no-array-index-key': 'warn',
      'playlyfe/react-no-children-prop': 'off',

      'playlyfe/react-no-danger': 'error',

      'playlyfe/react-no-danger-with-children': 'error',

      'playlyfe/react-no-deprecated': ['error'],

      'playlyfe/react-no-did-mount-set-state': 'error',

      'playlyfe/react-no-did-update-set-state': ['error'],

      'playlyfe/react-no-direct-mutation-state': 'error',

      'playlyfe/react-no-find-dom-node': 'error',

      'playlyfe/react-no-is-mounted': 'error',

      // @TODO
      // Prevent multiple component definition per file
      'playlyfe/react-no-multi-comp': ['off', { ignoreStateless: true }],

      'playlyfe/react-no-redundant-should-component-update': 'error',

      'playlyfe/react-no-render-return-value': 'error',

      // @TODO: enable
      'playlyfe/react-no-set-state': 'off',

      'playlyfe/react-no-typos': 'error',

      'playlyfe/react-no-string-refs': 'error',

      'playlyfe/react-no-unescaped-entities': 'error',

      'playlyfe/react-no-unknown-property': 'error',

      'playlyfe/react-no-unsafe': 'error',

      // very buggy after destructuring most of cases if report those variables
      // unused
      'playlyfe/react-no-unused-prop-types': 'off',
      'playlyfe/react-no-unused-state': 'error',

      'playlyfe/react-prefer-es6-class': ['error', 'always'],

      'playlyfe/react-prefer-stateless-function': 'off', // @TODO: can be enabled with PureComponent

      'playlyfe/react-prop-types': [
        'error',
        { ignore: [], customValidators: [] },
      ],

      'playlyfe/react-react-in-jsx-scope': 'error',

      'playlyfe/react-require-default-props': 'off',

      'playlyfe/react-require-optimization': [
        'off',
        { allowDecorators: ['generateStyles'] },
      ],

      'playlyfe/react-require-render-return': 'error',

      'playlyfe/react-self-closing-comp': [
        'error',
        { component: true, html: true },
      ],

      'playlyfe/react-sort-comp': [
        'error',
        {
          order: [
            'static-methods',
            'type-annotations',
            'lifecycle',
            'event-handlers',
            'everything-else',
            'rendering',
          ],

          groups: {
            'event-handlers': ['/^_(on|handle).+$/'],
            rendering: ['/^_?render.+$/', 'render'],
          },
        },
      ],

      'playlyfe/react-sort-prop-types': [
        'off',
        {
          ignoreCase: false,
          callbacksLast: false,
          requiredFirst: false,
        },
      ],

      'playlyfe/react-style-prop-object': 'error',

      'playlyfe/react-jsx-boolean-value': ['error', 'always'],

      'playlyfe/react-jsx-closing-bracket-location': ['error', 'tag-aligned'],

      'playlyfe/react-jsx-closing-tag-location': 'error',

      'playlyfe/react-jsx-child-element-spacing': 'error',

      'playlyfe/react-jsx-curly-spacing': [
        'error',
        'never',
        { allowMultiline: true },
      ],

      'playlyfe/react-jsx-equals-spacing': ['error', 'never'],

      'playlyfe/react-jsx-filename-extension': 'off',
      'playlyfe/react-require-extension': 'off', //

      'playlyfe/react-jsx-first-prop-new-line': ['error', 'multiline'],

      'playlyfe/react-jsx-handler-names': [
        'off',
        {
          eventHandlerPrefix: 'handle',
          eventHandlerPropPrefix: 'on',
        },
      ],

      'playlyfe/react-jsx-indent': ['error', 2],

      'playlyfe/react-jsx-indent-props': ['error', 2],

      'playlyfe/react-jsx-key': 'error',

      'playlyfe/react-jsx-max-props-per-line': ['error', { maximum: 1 }],

      'playlyfe/react-jsx-no-bind': [
        'error',
        {
          ignoreRefs: false,
          allowArrowFunctions: false,
          allowBind: false,
        },
      ],

      // prevent accidental JS comments from being injected into JSX as text
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-no-comment-textnodes.md
      'playlyfe/react-no-comment-textnodes': 'off',
      'playlyfe/react-jsx-no-comment-textnodes': 'error',

      // Prevent duplicate props in JSX
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-no-duplicate-props.md
      'playlyfe/react-jsx-no-duplicate-props': ['error', { ignoreCase: true }],

      // Prevent usage of unwrapped JSX strings
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-no-literals.md
      'playlyfe/react-jsx-no-literals': 'error',

      // Disallow target="_blank" on links
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-no-target-blank.md
      'playlyfe/react-jsx-no-target-blank': 'error',

      // Disallow undeclared variables in JSX
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-no-undef.md
      'playlyfe/react-jsx-no-undef': 'error',

      'playlyfe/react-jsx-one-expression-per-line': [
        'error',
        { allow: 'none' },
      ],

      'playlyfe/react-jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],

      // Enforce PascalCase for user-defined JSX components
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-pascal-case.md
      // enable when supports name starts with underscore
      'playlyfe/react-jsx-pascal-case': [
        'error', // issue: doesnt support underscore '_TestComponent'
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],

      // Enforce props alphabetical sorting
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-sort-props.md
      'playlyfe/react-jsx-sort-props': [
        'off',
        {
          ignoreCase: false,
          callbacksLast: false,
          shorthandFirst: false,
          shorthandLast: false,
        },
      ],

      'playlyfe/react-jsx-sort-default-props': [
        'off',
        {
          ignoreCase: false,
        },
      ],

      // Enforce spaces before the closing bracket of self-closing JSX elements
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-space-before-closing.md
      'playlyfe/react-jsx-space-before-closing': 'off',

      'playlyfe/react-jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
        },
      ],

      // Prevent React to be incorrectly marked as unused
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-uses-react.md
      'playlyfe/react-jsx-uses-react': ['error'],

      // Prevent variables used in JSX to be incorrectly marked as unused
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-uses-vars.md
      'playlyfe/react-jsx-uses-vars': 'error',

      // Prevent missing parentheses around multilines JSX
      // https://github.com/yannickcr/eslint-plugin-playlyfe/react-blob/master/docs/rules/jsx-wrap-multilines.md
      'playlyfe/react-jsx-wrap-multilines': [
        'error',
        {
          declaration: true,
          assignment: true,
          return: true,
        },
      ],
      'playlyfe/react-wrap-multilines': 'off', // deprecated version

      'playlyfe/react-forbid-elements': 'off',
      'playlyfe/react-forbid-foreign-prop-types': 'off',

      'playlyfe/react-no-access-state-in-setstate': 'error',

      'playlyfe/react-void-dom-elements-no-children': 'error',

      'playlyfe/react-style-no-numeric-string-value': 'error',

      'playlyfe/react-no-will-update-set-state': ['error', 'disallow-in-func'],

      // buggy rules but should be enabled later
      ...{
        'playlyfe/react-jsx-indent': 'off',
        'playlyfe/react-jsx-indent-props': 'off',
      },

      'playlyfe/react-jsx-max-depth': 'off',
      'playlyfe/react-jsx-props-no-multi-spaces': 'error',
      'playlyfe/react-no-this-in-sfc': 'error',

      //
      'playlyfe/class-property-no-use-before-define': [
        'error',
        {
          ignoreProperties: ['props'],
        },
      ],

      'playlyfe/react-jsx-fragments': ['error', 'syntax'],
      'playlyfe/react-state-in-constructor': ['error', 'never'],
      'playlyfe/react-static-property-placement': ['off'],
      'playlyfe/react-jsx-props-no-spreading': [
        'error',
        { html: 'enforce', custom: 'enforce' },
      ],
      // NOTE sure rule is stable will enable in future
      'playlyfe/react-prefer-read-only-props': 'off',
    },
  },
};
