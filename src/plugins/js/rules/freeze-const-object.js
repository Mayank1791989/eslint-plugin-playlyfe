/* @flow */
module.exports = {
  meta: {
    docs: {
      description: 'Enforce use of Object.freeze for object contants.',
      category: 'best-practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    function checkIsConstantVariable(node) {
      const { id } = node;
      return id && id.type === 'Identifier' && isUpperCase(id.name);
    }

    function checkIsValueObject(node) {
      const { init } = node;
      return init && init.type === 'ObjectExpression';
    }

    function isUpperCase(val: string) {
      return val.toUpperCase() === val;
    }

    return {
      VariableDeclarator(node) {
        if (checkIsConstantVariable(node) && checkIsValueObject(node)) {
          context.report({
            node: node.init,
            message: 'Use Object.freeze to freeze constant object value',
            fix(fixer) {
              const value = context.getSourceCode().getText(node.init);
              return fixer.replaceText(node.init, `Object.freeze(${value})`);
            },
          });
        }
      },
    };
  },
};
