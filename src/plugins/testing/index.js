/* @flow */
export default {
  rules: {},

  configs: {
    'testing:jest': {
      env: {
        jest: true,
      },

      parser: require.resolve('babel-eslint'),

      rules: {
        'no-restricted-properties': [
          'error',
          { object: 'describe', property: 'only' },
          { object: 'describe', property: 'skip' },

          { object: 'it', property: 'only' },
          { object: 'it', property: 'skip' },

          { object: 'test', property: 'only' },
          { object: 'test', property: 'skip' },
        ],

        'no-restricted-globals': [
          'error',

          // not allow
          'fdescribe',
          'xdescribe',
          'xit',
          'fit',
          'xtest',
          'ftest',
        ],
      },
    },
  },
};
