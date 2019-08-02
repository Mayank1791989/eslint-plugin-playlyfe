/* @flow */
import { CLIEngine } from 'eslint';
import path from 'path';

export default function createCLIEngine(configFile: string): CLIEngine {
  const config = {
    useEslintrc: false,
    configFile,
    resolvePluginsRelativeTo: path.resolve(__dirname),
  };
  return new CLIEngine(config);
}
