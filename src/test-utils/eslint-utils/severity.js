/* @flow */
const leven = require('leven');

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
    .map((item) => ({ dist: leven(missingRuleId, item), item }))
    .sort((a, b) => a.dist - b.dist)
    .splice(0, 10) // return top 10 result
    .map(({ item }) => item);
}
