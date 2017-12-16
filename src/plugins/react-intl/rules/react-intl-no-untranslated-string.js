/* @flow */
const ATTRS_TO_CHECK = {
  // @TODO make it editable from outside
  title: true,
  subtitle: true,
  placeholder: true,
};

module.exports = {
  meta: {
    docs: {
      description: 'find empty translation in file',
    },
  },

  create(context) {
    function findCorrectLocation(node) {
      // remove whitespace from loc start
      let { line, column } = node.loc.start;
      if (node.type === 'Literal' && typeof node.value === 'string') {
        // find loc of first non whitespace character
        const value = node.value.split('\n');
        value.findIndex((rowString, index) => {
          // here using findIndex to bail on first find
          const pos = rowString.search(/\S/);
          if (pos === -1) {
            line += 1;
          } else {
            column = index !== 0 ? pos : column + pos;
            return true; // break loop
          }
          return false; // continue
        });
      }
      return { line, column };
    }

    const report = node => {
      context.report({
        loc: findCorrectLocation(node),
        message: 'no-untranslated-string',
      });
    };

    const isNotWhiteSpaceLiteral = node =>
      // eslint-disable-line arrow-body-style
      // <div> <i /> </div>
      // div has 3 children
      // ' ', <i />, ' '   1 & 2  are literal with value whitespace
      !/^\s+$/.test(node.value);

    const reportIfString = node => {
      if (node.type === 'Literal' && isNotWhiteSpaceLiteral(node)) {
        report(node);
      }

      if (
        node.type === 'JSXExpressionContainer' &&
        (node.expression.type === 'Literal' ||
          node.expression.type === 'TemplateLiteral')
      ) {
        report(node.expression);
      }
    };

    return {
      JSXElement(node) {
        const childrenNodes = node.children;
        childrenNodes.forEach(childNode => {
          reportIfString(childNode);
        });
      },

      JSXAttribute(node) {
        const { name } = node.name;
        if (!ATTRS_TO_CHECK[name]) {
          return;
        }
        reportIfString(node.value);
      },
    };
  },
};
