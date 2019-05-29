/* @flow */
import IntlMessageFormatParser, {
  type ArgumentElement,
} from 'intl-messageformat-parser';

export function getMessageArguments(message: string): Array<ArgumentElement> {
  try {
    // ignore if there is parse error
    const ast = IntlMessageFormatParser.parse(message);
    return getFromMessageFormatPattern(ast);
  } catch (err) {
    return [];
  }
}

function getFromMessageFormatPattern(node) {
  const args = [];
  node.elements.forEach(elem => {
    if (elem.type === 'argumentElement') {
      args.push(elem);
      const { format } = elem;
      if (format && format.options) {
        const { options } = format;
        options.forEach(option => {
          args.push(...getFromMessageFormatPattern(option.value));
        });
      }
    }
  });
  return args;
}
