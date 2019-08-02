/* @flow */
import { type EslintRule } from 'eslint';
import isLocaleFile from './utils/isLocaleFile';

const Rule: EslintRule = {
  meta: {
    docs: {
      description: 'find keys in code which are not in translated file',
    },
    fixable: 'code',
  },

  create(context) {
    if (!isLocaleFile(context.getFilename())) {
      return {};
    }

    const { reactIntlFilePath } = context.options[0] || {};
    let reactIntlJson = null;
    const fileStartLoc = { line: 1, column: 0 };

    if (!reactIntlFilePath) {
      // report if reactIntl missing
      context.report({
        loc: fileStartLoc,
        message: 'Missing reactIntlFilePath option.',
      });
      return {};
    }

    try {
      reactIntlJson = require(reactIntlFilePath); // eslint-disable-line global-require
      // maybe file path wrong
    } catch (error) {
      context.report({ loc: fileStartLoc, message: error.message });
      return {};
    }

    const presentIds = {};
    const sourceCode = context.getSourceCode();

    function getKeyText(keyNode) {
      if (keyNode.type === 'Literal') {
        // key of form { "a": 5, 'b': 5 }
        return keyNode.value;
      }

      if (keyNode.type === 'Identifier') {
        // key of form key eg { a: 5 }
        return keyNode.name;
      }

      context.report({
        node: keyNode,
        message: 'Unsupported keyType',
      });

      return null;
    }

    return {
      ObjectExpression(node) {
        node.properties.forEach((propertyNode) => {
          const keyText = getKeyText(propertyNode.key);
          if (keyText) {
            presentIds[keyText] = true;
          }
        });

        const missingIds = Object.keys(reactIntlJson).filter(
          (id) => !presentIds[id],
        );

        if (missingIds.length > 0) {
          context.report({
            node,
            message: `${missingIds.length} ids missing`,
            fix(fixer) {
              const n = '\n'; // newLine
              const t = '  '; // tabSpace
              const missingIdsString = missingIds
                .map((id) => `${t}'${id}': ' ',`)
                .join(n);

              const startBracketToken = sourceCode.getTokenByRangeStart(
                node.range[0],
              );
              return fixer.insertTextAfter(
                startBracketToken,
                `${n}${n}${missingIdsString}${n}`,
              );
            },
          });
        }
      },
    };
  },
};

module.exports = Rule;
