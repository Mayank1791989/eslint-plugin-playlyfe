/* @flow */
import { rules } from 'eslint-plugin-react';
import renameRules from '../../../utils/renameRules';

export default {
  ...renameRules('react', rules),
  'react-jsx-pascal-case': require('./react-jsx-pascal-case-patched'),
  'react-style-no-numeric-string-value': require('./react-style-no-numeric-string-value'),
};
