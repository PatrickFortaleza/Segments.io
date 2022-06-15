export interface GroupedAttributes {
  alphabetical: Array<string>;
  select: Array<string>;
  datetime: Array<string>;
  numeric: Array<string>;
  boolean: Array<string>;
}

export interface Attribute {
  type: string;
  name: string;
}
