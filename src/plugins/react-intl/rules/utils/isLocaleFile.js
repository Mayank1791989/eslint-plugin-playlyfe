/* @flow */
export default function isLocaleFile(filePath: string) {
  if (filePath === '<input>') {
    return true;
  } // Required for test

  return filePath.match(/i18n/);
}
