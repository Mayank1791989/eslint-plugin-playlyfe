/* @flow */
import dedent from 'dedent-js';
import chalk from 'chalk';
import { CLIEngine, type EslintRule } from 'eslint';
import {
  createLinter,
  createCLIEngine,
  getRuleSeverity,
  getSuggestionsForMissingRule,
  type Severity,
} from './eslint-utils';

type TestConfig = $Exact<{
  valid?: Array<{ code: string, filename?: string }>,
  invalid?: Array<{ code: string, filename?: string }>,
}>;

export default class ConfigTester {
  configFile: string;
  lint: Function;
  cliEngine: CLIEngine;

  allRules: Map<string, EslintRule>;
  rulesConfig: {};

  constructor({ configFile }: { configFile: string }) {
    this.configFile = configFile;
    this.lint = createLinter(configFile);
    this.cliEngine = createCLIEngine(configFile);

    this.allRules = this.cliEngine.getRules();
    this.rulesConfig = this.cliEngine.getConfigForFile(configFile).rules;
  }

  parse(code: string) {
    const { results } = this.cliEngine.executeOnText(code);
    // eslint-disable-next-line prefer-destructuring
    const { messages } = results[0];
    messages.forEach((message) => {
      // NOTE: fatal means there is some parseError
      if (message.fatal) {
        throw new Error(message.message);
      }
    });
  }

  getMissingConfigRules(): Array<string> {
    const missingConfigRules = [];
    this.allRules.forEach((v, name) => {
      if (!this.rulesConfig[name]) {
        missingConfigRules.push(name);
      }
    });
    return missingConfigRules;
  }

  run(ruleId: string, severity: Severity, testConfig?: TestConfig) {
    describe(ruleId, () => {
      this.describeFunc(ruleId, severity, testConfig);
    });
  }

  runOnly(ruleId: string, severity: Severity, testConfig?: TestConfig) {
    // eslint-disable-next-line no-restricted-properties
    describe.only(ruleId, () => {
      this.describeFunc(ruleId, severity, testConfig);
    });
  }

  runSkip(ruleId: string, severity: Severity, testConfig?: TestConfig) {
    // eslint-disable-next-line no-restricted-properties
    describe.skip(ruleId, () => {
      this.describeFunc(ruleId, severity, testConfig);
    });
  }

  describeFunc = (
    ruleId: string,
    severity: string,
    testConfig?: TestConfig,
  ) => {
    const { rulesConfig, lint } = this;

    // NOTE: inline declaration to tell flow about added custom matchers
    declare type JestExpectTypeExtended = JestExpectType & {
      not: JestExpectTypeExtended,
      toReportErrorOnLint(): void,
    };
    declare function expect(value: any): JestExpectTypeExtended;

    beforeEach(() => {
      expect.extend({
        toReportErrorOnLint: ({ code, ruleId: _ruleId, filename }) => {
          const lintError = lint(code, _ruleId, filename);
          const pass = Boolean(lintError);
          return {
            pass,
            message: () =>
              pass
                ? dedent`
                  Expect linting code:
                    \n${chalk.dim(code)}\n
                  should not report error but reported error:
                    ${lintError}
                `
                : dedent`
                  Expect linting code:
                    \n${chalk.dim(code)}\n
                  should report error but no error is reported.
                `,
          };
        },
      });
    });

    // testConfig
    const { valid = [], invalid = [] } = testConfig || {};

    if (!rulesConfig[ruleId]) {
      throw new Error(
        [
          `ruleId '${ruleId}' passed in test not found in config`,
          '\n========= Available ===========\n',
          `\t${getSuggestionsForMissingRule(
            ruleId,
            Object.keys(rulesConfig),
          ).join('\n\t')}.`,
          '\n===============================\n',
        ].join('\n'),
      );
    }

    it('severity level is correct', () => {
      const ruleConfig = rulesConfig[ruleId];
      const definedSeverity = getRuleSeverity(ruleConfig);
      expect(severity).toEqual(definedSeverity);
    });

    valid.forEach(({ code, filename }) => {
      it('valid: should not report error', () => {
        expect({ code, ruleId, filename }).not.toReportErrorOnLint();
      });
    });

    invalid.forEach(({ code, filename }) => {
      it('invalid: should report error', () => {
        expect({ code, ruleId, filename }).toReportErrorOnLint();
      });
    });
  };
}
