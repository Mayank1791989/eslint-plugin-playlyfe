/* @flow */
// this will patch eslint to not throw error for eslint-plugin-playlyfe in config.

// Eslint search plugins in node_modules but eslint-plugin-playlfe will not be present there
// so adding this dir so that this local package will be treated as node module
// will fix module not found when eslint trying to find module
// using Module._findPath (see eslint ModuleResolver)
// $FlowIssue: valid module
const Module = require('module');
if (Module.globalPaths.indexOf(__dirname) === -1) {
  // add path only once (jest watch mode can run this file multiple times)
  Module.globalPaths.push(__dirname);
}
// so that require('eslint-plugin-playlyfe') not throw error
jest.mock(
  'eslint-plugin-playlyfe',
  () => require('./eslint-plugin-playlyfe'), // eslint-disable-line global-require
  { virtual: true },
);

// NOTE: dont convert this to import form
const { CLIEngine } = require('eslint');
const createRuleFinder = require('eslint-find-rules');
const eslintFormatter = require('eslint-friendly-formatter');
const leven = require('leven');

export { createRuleFinder };
export function createLinter(configFile: string) {
  const config = {
    useEslintrc: false,
    configFile,
    plugins: ['playlyfe'],
  };
  const eslintCLI = new CLIEngine(config);
  eslintCLI.addPlugin(
    'eslint-plugin-playlyfe',
    require('./eslint-plugin-playlyfe'),
  );

  return (code: string, ruleId: string, filename?: string) => {
    const report = eslintCLI.executeOnText(code, filename);
    let result = null;
    // filter ruleId message
    // check for fatal errors
    // console.log(JSON.stringify(result, null, 2));
    if (report.results.length > 0) {
      result = {
        ...report.results[0],
        ...report.results[0].messages.reduce(
          (acc, message) => {
            if (message.fatal) {
              // parsing error in test code
              throw new Error(`
                Parse error in test code
                ${code}
                ${message.message}
              `);
            }
            if (message.ruleId === ruleId) {
              acc.messages.push(message);
              if (acc.severity === 1) {
                acc.warningCount += 1;
              }
              if (acc.severity === 2) {
                acc.errorCount += 1;
              }
            }
            return acc;
          },
          { messages: [], errorCount: 0, warningCount: 0 },
        ),
      };
    }

    return eslintFormatter([result]);
  };
}

/* eslint-enable */
/* eslint-disable */
export const SEVERITY_NAME = {
  off: 'off',
  warn: 'warn',
  error: 'error',
};

type Severity = $Keys<typeof SEVERITY_NAME>;
export type { Severity };

const SEVERITY_NUM_TO_NAME_MAP = {
  [0]: SEVERITY_NAME.off,
  [1]: SEVERITY_NAME.warn,
  [2]: SEVERITY_NAME.error,
};

export function getRuleSeverity(ruleDefinition: mixed) {
  if (typeof ruleDefinition === 'number') {
    // 0|1|2
    return SEVERITY_NUM_TO_NAME_MAP[ruleDefinition];
  }
  if (typeof ruleDefinition === 'string') {
    return ruleDefinition;
  }
  if (Array.isArray(ruleDefinition)) {
    return getRuleSeverity(ruleDefinition[0]);
  }
  return null;
}

export function getSuggestionsForMissingRule(
  missingRuleId: string,
  allRules: Array<string>,
) {
  return allRules
    .map(item => ({ dist: leven(missingRuleId, item), item }))
    .sort((a, b) => a.dist - b.dist)
    .splice(0, 10) // return top 10 result
    .map(({ item }) => item);
}
