/* @flow */
import ConfigTester from 'test-utils/ConfigTester';
import path from 'path';

const configTester = new ConfigTester({
  configFile: path.resolve(__dirname, './json-eslintrc.js'),
});

// json
configTester.run('playlyfe/use-exact-dependency', 'error', {
  valid: [
    {
      filename: 'package.json',
      code: `
        {
          "dependencies": {
            "dependency1": "1.2.3"
          },
        }
      `,
    },
  ],
  invalid: [
    {
      filename: 'package.json',
      code: `
        {
          "dependencies": {
            "dependency1": "^1.2.3"
          },
        }
      `,
    },
  ],
});
