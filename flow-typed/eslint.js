/* @flow */
declare module 'eslint' {
  declare type Config = $FixMe;

  declare export class CLIEngine {
    constructor(options: $FixMe): this;
    getConfigForFile(filepath: string): Config;
    getRules(): Map<string /* name */, EslintRule>;
    executeOnText(code: string, filename?: ?string): $FixMe;
  }

  declare export class RuleTester {
    constructor(options: $FixMe): this;
    static describe: $FixMe;
    static it: $FixMe;
    run(
      name: string,
      rule: EslintRule,
      testConfig: {
        valid: $ReadOnlyArray<{ code: string, ... }>,
        invalid: $ReadOnlyArray<{
          code: string,
          errors: Array<$FixMe>,
          output?: string,
          ...
        }>,
      },
    ): void;
  }

  declare export type EslintRuleVisitor = {
    JSXOpeningElement?: (node: JSXOpeningElementNode) => void,
    JSXAttribute?: (node: JSXAttributeNode) => void,
    MemberExpression?: (node: MemberExpressionNode) => void,
    CallExpression?: (node: CallExpressionNode) => void,
    Property?: (node: ObjectPropertyNode) => void,
    ObjectExpression?: (node: ObjectExpressionNode) => void,
  };

  declare type ReportDescriptor = {
    node?: Node,
    message: string,
    loc?: Loc | Pos,
  };

  declare export type EslintRuleContext = {
    id: string,
    options: any[],
    settings: { [name: string]: any },
    parserPath: string,
    getAncestors(): Array<Node>,
    getDeclaredVariables(node: Node): $FixMe,
    getFilename(): string,
    // getScope(): Scope.Scope,
    getSourceCode(): $FixMe,
    markVariableAsUsed(name: string): boolean,
    report(descriptor: ReportDescriptor): void,
  };

  declare export type EslintRule = {
    meta: {
      docs?: {
        description?: string,
        category?: string,
        recommended?: boolean,
        url?: string,
      },
      messages?: { [messageId: string]: string },
      fixable?: 'code' | 'whitespace',
      schema?: $FixMe,
      deprecated?: boolean,
    },
    create: (context: EslintRuleContext) => EslintRuleVisitor,
  };

  declare export type Pos = {
    line: number,
    column: number,
  };

  declare export type Loc = {
    start: Pos,
    end: Pos,
  };

  declare type CommonProps = {|
    start: number,
    end: number,
    loc: Loc,
    range: [number, number],
  |};

  declare export type JSXIdentifierNode = {
    ...CommonProps,
    type: 'JSXIdentifier',
    name: string,
  };

  declare export type LiteralNode = {
    ...CommonProps,
    type: 'Literal',
    value: string,
    raw: string,
  };

  declare export type TemplateElementNode = {
    ...CommonProps,
    type: 'TemplateElement',
    value: {
      raw: string,
      cooked: string,
    },
    tail: boolean,
  };

  declare export type TemplateLiteralNode = {
    ...CommonProps,
    type: 'TemplateLiteral',
    expressions: Array<{}>,
    quasis: Array<TemplateElementNode>,
  };

  declare export type JSXExpressionContainerNode = {
    ...CommonProps,
    type: 'JSXExpressionContainer',
    expression: Node,
  };

  declare export type JSXAttributeNode = {
    ...CommonProps,
    type: 'JSXAttribute',
    name: JSXIdentifierNode,
    value: JSXExpressionContainerNode | LiteralNode,
    parent: Node,
  };

  declare export type JSXOpeningElementNode = {
    ...CommonProps,
    type: 'JSXOpeningElement',
    name: JSXIdentifierNode,
    attributes: $ReadOnlyArray<JSXAttributeNode>,
    parent: Node,
  };

  declare export type MemberExpressionNode = {
    ...CommonProps,
    type: 'MemberExpression',
    object: $FixMe,
    property: $FixMe,
    parent: Node,
  };

  declare export type IdentifierNode = {
    ...CommonProps,
    type: 'Identifier',
    name: string,
  };

  declare export type ObjectPropertyNode = {
    ...CommonProps,
    type: 'Property',
    key: IdentifierNode,
    value: Node,
  };

  declare export type ObjectExpressionNode = {
    ...CommonProps,
    type: 'ObjectExpression',
    properties: Array<ObjectPropertyNode>,
    parent: Node,
  };

  declare export type CallExpressionNode = {
    ...CommonProps,
    type: 'CallExpression',
    callee: IdentifierNode | MemberExpressionNode,
    arguments: Array<Node>,
  };

  declare export type Node =
    | ObjectPropertyNode
    | CallExpressionNode
    | ObjectExpressionNode
    | MemberExpressionNode
    | LiteralNode
    | TemplateLiteralNode
    | JSXAttributeNode
    | JSXOpeningElementNode
    | JSXIdentifierNode
    | IdentifierNode;
}
