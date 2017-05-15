/* @flow */
import { rules as babelRules } from 'eslint-plugin-babel';
// import { rules as importRules } from 'eslint-plugin-import';
import renameRules from '../../../utils/renameRules';

export default {
  'use-exact-dependency': require('./use-exact-dependency'),
  ...renameRules('babel', babelRules),
  // ...renameRules('import', importRules),
};
