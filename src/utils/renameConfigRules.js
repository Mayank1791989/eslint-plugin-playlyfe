/* @flow */
function isCoreRule(rulesConfigKey: string): boolean {
  return rulesConfigKey.indexOf('/') === -1;
}

/* will convert react/some-rule => playlyfe/react-some-rule */
export default function renameRulesConfig(rulesConfig: Object) {
  return Object.keys(rulesConfig).reduce((acc, key) => {
    if (isCoreRule(key)) {
      // core rules is rule
      acc[key] = rulesConfig[key];
    } else {
      // plugin rules is "pluginName/rule"
      const [pluginName, ruleName] = key.split('/');
      acc[`playlyfe/${pluginName}-${ruleName}`] = rulesConfig[key];
    }
    return acc;
  }, {});
}
