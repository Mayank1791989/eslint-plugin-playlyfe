/* @flow */
import ConfigTester from 'test-utils/ConfigTester';
import path from 'path';

const configTester = new ConfigTester({
  configFile: path.resolve(__dirname, './prettier-eslintrc.js'),
});

configTester.run('playlyfe/prettier', 'error', {
  valid: [
    {
      // eslint-disable-next-line
      code: 'const a = 5;\n',
    },
  ],
});

configTester.run('playlyfe/babel-object-curly-spacing', 'off');
configTester.run('playlyfe/babel-semi', 'off');
configTester.run('playlyfe/flowtype-boolean-style', 'off');
