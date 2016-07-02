/* @flow */
module.exports = {
  preprocess(text: string) {
    const json = `const json = ${text};\n`;
    return [json];
  },

  postprocess(messages: Array<any>) {
    const ignoreRuleIDs = {
      quotes: true,
      'comma-dangle': true,
      'quote-props': true,
      'no-unused-vars': true,
    };
    const errors = messages[0];
    const validErrors = errors.filter(error => !ignoreRuleIDs[error.ruleId]);
    return validErrors;
  },
};
