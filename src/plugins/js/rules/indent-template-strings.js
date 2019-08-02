/* @flow */
import { type EslintRule } from 'eslint';

import redent from 'redent';

const Rule: EslintRule = {
  meta: {
    docs: {
      description: 'Enforce correct indentation of multiline template strings',
      category: '',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    return {
      TemplateLiteral(node) {
        const sourceCode = context.getSourceCode();
        const textWithTicks = sourceCode.getText(node);

        if (!startsWithEmptyLine(textWithTicks)) {
          return;
        }

        const parentIndent = getParentIndentation(node, sourceCode);
        const contentIndent = getContentIndentation(node, sourceCode);
        const expectedContentIndent = parentIndent + 2;

        if (
          contentIndent !== expectedContentIndent ||
          checkClosingTickLineEmptyAndNotIndented(textWithTicks, parentIndent)
        ) {
          context.report({
            message: 'Not correctly indented',
            node,
            fix(fixer) {
              const indentedText = redentText(textWithTicks, {
                tick: parentIndent,
                content: expectedContentIndent,
              });
              return fixer.replaceText(node, indentedText);
            },
          });
        }
      },
    };
  },
};

module.exports = Rule;

function redentText(
  text: string,
  indentation: {
    tick: number,
    content: number,
  },
): string {
  const content = text.substr(1, text.length - 2);
  const indentedContent = redent(content, indentation.content);
  const lines = indentedContent.split('\n');
  lines[0] = `\`${lines[0]}`;
  if (isEmptyLine(lines[lines.length - 1])) {
    lines[lines.length - 1] = redent('`', indentation.tick, { indent: ' ' });
  }
  return lines.join('\n');
}

function checkClosingTickLineEmptyAndNotIndented(
  textWithTicks: string,
  expectedIndentation: number,
): boolean {
  const lines = textWithTicks.split('\n');
  const lastLine = lines[lines.length - 1];
  const isEmpty = lastLine.trim() === '`';
  return isEmpty && findIndentation(lastLine) !== expectedIndentation;
}

// NOTE: text will include '`'
// `testerr`
// `
//  some multiline
//  text
// `
function startsWithEmptyLine(text: string): boolean {
  const len = text.length;
  // starting with 1 (to ignore starting '`')
  for (let i = 1; i < len; i += 1) {
    const ch = text[i];
    if (ch === '\n') {
      return true;
    }
    if (!isWhitespace(ch)) {
      return false;
    }
  }
  return false;
}

function getParentIndentation(node, sourceCode) {
  // For code:  const ssss = someText(`Tester`)
  //  a: Tester`)
  //  b: const ssss = someText(`Tester`)
  //  c: const ssss = someText(`
  const a = sourceCode.getText(node, -1);
  const b = sourceCode.getText(node, 100);
  const c = b.replace(a, '');

  let indentation = 0;
  let i = c.length - 1;
  while (i > 0) {
    const ch = c[i];
    if (ch === '\n') {
      break;
    }
    if (isWhitespace(ch)) {
      indentation += 1;
    } else {
      indentation = 0;
    }
    i -= 1;
  }
  return indentation;
}

function getContentIndentation(node, sourceCode) {
  // content is text without ticks
  const content = sourceCode.getText(node, -1, -1);
  return findIndentation(content);
}

// Will return indentation of first non-empty line
function findIndentation(str: string): number {
  const lines = str.split('\n');
  const nonEmptyLine = lines.find(line => !isEmptyLine(line));
  if (!nonEmptyLine) {
    return 0;
  }
  let ind = 0;
  while (isWhitespace(nonEmptyLine[ind])) {
    ind += 1;
  }
  return ind;
}

function isWhitespace(ch: string): boolean {
  return ch === ' ';
}

function isEmptyLine(line: string): boolean {
  return line.trim() === '';
}
