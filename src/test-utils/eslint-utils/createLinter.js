/* @flow */
// NOTE: dont convert this to import form
import eslintFormatter from 'eslint-friendly-formatter';
import createCLIEngine from './createCLIEngine';

export default function createLinter(configFile: string) {
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
