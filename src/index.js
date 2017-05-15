/* @flow */
import js from './plugins/js';
import react from './plugins/react';
import relay from './plugins/relay';
import reactIntl from './plugins/react-intl';
import flow from './plugins/flow';
import testing from './plugins/testing';

import jsonPreprocessor from './processors/json';

const plugin = {
  rules: {
    ...js.rules,
    ...flow.rules,
    ...react.rules,
    ...reactIntl.rules,
    ...testing.rules,
    ...relay.rules,
  },

  // json pre processor
  processors: {
    '.json': jsonPreprocessor,
  },

  configs: {
    ...js.configs,
    ...flow.configs,
    ...react.configs,
    ...reactIntl.configs,
    ...relay.configs,
    ...testing.configs,
  },
};

module.exports = plugin;
