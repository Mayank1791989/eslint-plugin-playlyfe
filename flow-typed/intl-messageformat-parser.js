/* @flow */
declare module 'intl-messageformat-parser' {
  declare type Selector = string;
  declare export type LocationDetails = {
    offset: number,
    line: number,
    column: number,
  };
  declare export type Location = {|
    start: LocationDetails,
    end: LocationDetails,
  |};
  declare export type SimpleFormat = {|
    type: 'numberFormat' | 'dateFormat' | 'timeFormat',
    style: string,
    location: Location,
  |};
  declare export type PluralStyle = {|
    type: 'pluralFormat',
    offset: number,
    options: Array<OptionalFormatPattern>,
    location: Location,
  |};
  declare export type PluralFormat = {|
    ...PluralFormat,
    ordinal: false,
  |};
  declare export type SelectFormat = {|
    type: 'selectFormat',
    options: Array<OptionalFormatPattern>,
    location: Location,
  |};
  declare export type SelectOrdinalFormat = {|
    ...PluralStyle,
    ordinal: true,
  |};
  declare export type ElementFormat =
    | SimpleFormat
    | PluralFormat
    | SelectOrdinalFormat
    | SelectFormat;

  declare export type OptionalFormatPattern = {
    type: 'optionalFormatPattern',
    selector: Selector,
    value: MessageFormatPattern,
    location: Location,
  };

  declare export type MessageTextElement = {
    type: 'messageTextElement',
    value: string,
    location: Location,
  };

  declare export type ArgumentElement = {
    type: 'argumentElement',
    id: string,
    format: ElementFormat | null,
    location: Location,
  };
  declare export type Element = MessageTextElement | ArgumentElement;
  declare export type MessageFormatPattern = {
    type: 'messageFormatPattern',
    elements: Array<Element>,
    location: Location,
  };

  declare export default {
    parse(msg: string): MessageFormatPattern,
  };
}
