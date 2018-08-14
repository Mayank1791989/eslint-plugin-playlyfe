/* @flow */
import js from './plugins/js';
import react from './plugins/react';
import relay from './plugins/relay';
import reactIntl from './plugins/react-intl';
import flowtype from './plugins/flowtype';
import testing from './plugins/testing';
import prettier from './plugins/prettier';
import json from './plugins/json';

const plugin = {
  rules: {
    ...js.rules,
    ...flowtype.rules,
    ...react.rules,
    ...reactIntl.rules,
    ...relay.rules,
    ...testing.rules,
    ...prettier.rules,
    ...json.rules,
  },

  processors: {
    ...json.processors,
  },

  configs: {
    ...js.configs,
    ...flowtype.configs,
    ...react.configs,
    ...reactIntl.configs,
    ...relay.configs,
    ...testing.configs,
    ...prettier.configs,
    ...json.configs,
  },
};

module.exports = plugin;
