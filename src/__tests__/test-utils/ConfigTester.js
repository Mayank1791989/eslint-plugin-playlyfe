/* @flow */
/* global JestExpectType, JestExpectTypeExtended */
import dedent from 'dedent-js';
import chalk from 'chalk';
import {
  createLinter,
  createRuleFinder,
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
  definedRules: { [ruleId: string]: any };
  lint: Function;

  constructor({ configFile }: { configFile: string }) {
    this.configFile = configFile;
    const ruleFinder = createRuleFinder(configFile);
    this.definedRules = ruleFinder.getCurrentRulesDetailed();
    this.lint = createLinter(configFile);
  }

  run(ruleId: string, severity: Severity, testConfig?: TestConfig) {
    describe(ruleId, () => {
      this.describeFunc(ruleId, severity, testConfig);
    });
  }

  runOnly(ruleId: string, severity: Severity, testConfig?: TestConfig) {
    describe.only(ruleId, () => {
      this.describeFunc(ruleId, severity, testConfig);
    });
  }

  runSkip(ruleId: string, severity: Severity, testConfig?: TestConfig) {
    describe.skip(ruleId, () => {
      this.describeFunc(ruleId, severity, testConfig);
    });
  }

  describeFunc = (
    ruleId: string,
    severity: string,
    testConfig?: TestConfig,
  ) => {
    const { definedRules, lint } = this;

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
            message: pass
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

    if (!definedRules[ruleId]) {
      throw new Error(
        [
          `ruleId '${ruleId}' passed in test not found in config`,
          '\n========= Available ===========\n',
          `\t${getSuggestionsForMissingRule(ruleId, Object.keys(definedRules)).join('\n\t')}.`,
          '\n===============================\n',
        ].join('\n'),
      );
    }

    it('severity level is correct', () => {
      const ruleDefinition = definedRules[ruleId];
      const definedSeverity = getRuleSeverity(ruleDefinition);
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
