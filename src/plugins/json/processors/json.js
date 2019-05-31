/* @flow */
import rules from '../rules';

const jsonValidRules = Object.keys(rules).reduce((acc, ruleId) => {
  acc[`playlyfe/${ruleId}`] = true;
  return acc;
}, {});

function isJsonRule(ruleId) {
  return jsonValidRules[ruleId];
}

module.exports = {
  preprocess(text: string) {
    const json = `const json = ${text};\n`;
    return [json];
  },

  postprocess(messages: Array<any>) {
    const [errors] = messages;
    // filter out errors not from json rules
    const validErrors = errors.filter(error => isJsonRule(error.ruleId));
    return validErrors;
  },

  supportsAutofix: false,
};
