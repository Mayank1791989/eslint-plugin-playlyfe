/* @flow */
export function findObjectExpressionProperty(node, key: string) {
  return node.properties.find(
    property =>
      property.type === 'Property' &&
      property.key.type === 'Identifier' &&
      property.key.name === key,
  );
}

export function getStringNodeValue(node): ?{ value: string, loc: any } {
  if (node.type === 'Literal') {
    return { value: node.value, loc: node.loc };
  }

  if (node.type === 'TemplateLiteral') {
    return getTemplateLiteralStringValue(node);
  }

  return null;
}

export function getTemplateLiteralStringValue(literalNode) {
  const templateElem = literalNode.quasis[0];
  return templateElem
    ? { value: templateElem.value.raw, loc: templateElem.loc }
    : null;
}

export function findJSXAttribute(node, name: string) {
  return node.attributes.find(
    attr => attr.type === 'JSXAttribute' && attr.name.name === name,
  );
}
