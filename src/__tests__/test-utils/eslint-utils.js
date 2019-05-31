/* @flow */
// NOTE: dont convert this to import form
const { CLIEngine } = require('eslint');
const createRuleFinder = require('eslint-find-rules');
const eslintFormatter = require('eslint-friendly-formatter');
const leven = require('leven');

export { createRuleFinder };

export function createCLIEngine(configFile: string): CLIEngine {
  const config = {
    useEslintrc: false,
    configFile,
    plugins: ['eslint-plugin-playlyfe'],
  };
  return new CLIEngine(config);
}

export function createLinter(configFile: string) {
  const eslintCLI = createCLIEngine(configFile);
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

export const SEVERITY_NAME = Object.freeze({
  off: 'off',
  warn: 'warn',
  error: 'error',
});

type Severity = $Keys<typeof SEVERITY_NAME>;
export type { Severity };

/* eslint-disable no-useless-computed-key */
const SEVERITY_NUM_TO_NAME_MAP = Object.freeze({
  [0]: SEVERITY_NAME.off,
  [1]: SEVERITY_NAME.warn,
  [2]: SEVERITY_NAME.error,
});
/* eslint-enable */

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
): Array<string> {
  return allRules
    .map(item => ({ dist: leven(missingRuleId, item), item }))
    .sort((a, b) => a.dist - b.dist)
    .splice(0, 10) // return top 10 result
    .map(({ item }) => item);
}
