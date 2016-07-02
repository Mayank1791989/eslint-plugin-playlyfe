/* @flow */
module.exports = {
  meta: {
    docs: {
      description: 'check dependencies in package.json are exact',
    },
  },

  create(context) {
    // // any helper functions should go here or else delete this section
    function isExact(value) {
      // NOTE: regexp handles only cases where version starts with ^|~
      const regexp = /^[\^~]/;
      return !regexp.test(value);
    }

    function isPackageJSONFile(filePath) {
      return filePath.endsWith('package.json');
    }

    if (!isPackageJSONFile(context.getFilename())) {
      return {};
    }

    return {
      Property(node) {
        if (node.key.value !== 'dependencies') {
          return;
        }

        const dependencies = node.value.properties;
        dependencies.forEach(depsNode => {
          if (!isExact(depsNode.value.value)) {
            context.report({
              node: depsNode.value,
              message: 'use-exact-dependency',
            });
          }
        });
      },
    };
  },
};
