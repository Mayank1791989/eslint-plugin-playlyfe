/* @flow */
import { rules as babelRules } from 'eslint-plugin-babel';
// import { rules as importRules } from 'eslint-plugin-import';
import renameRules from '../../../utils/renameRules';

export default {
  'freeze-const-object': require('./freeze-const-object'),
  'class-property-no-use-before-define': require('./class-property-no-use-before-define'),
  ...renameRules('babel', babelRules),
  // ...renameRules('import', importRules),
};
