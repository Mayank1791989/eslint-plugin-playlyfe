/* @flow */
import {
  type JSXOpeningElementNode,
  type TemplateLiteralNode,
  type Loc,
  type JSXAttributeNode,
  type Node,
  type ObjectExpressionNode,
  type IdentifierNode,
} from 'eslint';

export function findObjectExpressionProperty(
  node: ObjectExpressionNode,
  key: string,
) {
  return node.properties.find(
    property =>
      property.type === 'Property' &&
      property.key.type === 'Identifier' &&
      property.key.name === key,
  );
}

export function getStringNodeValue(node: Node): ?{ value: string, loc: Loc } {
  if (node.type === 'Literal') {
    return { value: node.value, loc: node.loc };
  }

  if (node.type === 'TemplateLiteral') {
    return getTemplateLiteralStringValue(node);
  }

  return null;
}

export function getTemplateLiteralStringValue(node: TemplateLiteralNode) {
  const [templateElem] = node.quasis;
  return templateElem
    ? { value: templateElem.value.raw, loc: templateElem.loc }
    : null;
}

export function findJSXAttribute(node: JSXOpeningElementNode, name: string) {
  return node.attributes.find(
    attr => attr.type === 'JSXAttribute' && attr.name.name === name,
  );
}

export function getJSXAttributeValue(node: JSXAttributeNode): Node {
  const { value } = node;
  if (value.type === 'JSXExpressionContainer') {
    return value.expression;
  }
  return value;
}

export function getObjectIdentifierKeys(
  node: ObjectExpressionNode,
): Array<IdentifierNode> {
  return node.properties.reduce((acc, property) => {
    if (property.type === 'Property' && property.key.type === 'Identifier') {
      acc.push(property.key);
    }
    return acc;
  }, []);
}
