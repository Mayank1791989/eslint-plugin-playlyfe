/* @flow */
export default function renameRules(pluginName: string, rules: Object) {
  return Object.keys(rules).reduce((acc, ruleName) => {
    acc[`${pluginName}-${ruleName}`] = rules[ruleName];
    return acc;
  }, {});
}
