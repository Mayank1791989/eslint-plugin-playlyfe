/* @flow */
/**
 * patch original rule to add support for underscore
 * in starting e.g <_Test />
 */
import ReactJSXPascalCase from 'eslint-plugin-react/lib/rules/jsx-pascal-case';
import elementType from 'jsx-ast-utils/elementType';

function removeUnderScoreFromStart(name: string) {
  return name.replace(/^_+/, '');
}

function patchName(name, nameNode) {
  return {
    ...nameNode,
    type: 'JSXIdentifier',
    name: removeUnderScoreFromStart(name),
  };
}

module.exports = {
  ...ReactJSXPascalCase,
  create(context) {
    const orig = ReactJSXPascalCase.create(context);
    return {
      ...orig,
      JSXOpeningElement(node) {
        const name: string = elementType(node);
        let patchedNode = node;
        if (name.startsWith('_')) {
          patchedNode = {
            ...node,
            name: patchName(name, node.name),
          };
        }
        orig.JSXOpeningElement(patchedNode);
      },
    };
  },
};
