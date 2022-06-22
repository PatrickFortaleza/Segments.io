export interface SelectVariables {
  gender: Array<string>;
  occupation_industry: Array<string>;
  location: Array<string>;
  primary_language: Array<string>;
  family_status: Array<string>;
}

export interface NumericVariables {
  annual_income: Array<number>;
  age: Array<number>;
  average_annual_spending: Array<number>;
  current_total_debt: Array<number>;
}

export interface DateTimeVariables {
  birthday: Array<string>;
}

export interface BooleanVariables {
  owns_home: Array<boolean>;
  owns_vehicle: Array<boolean>;
}

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

export interface AttributeTypeMeta {
  controlOptions: Array<string>;
  variables:
    | undefined
    | SelectVariables
    | NumericVariables
    | DateTimeVariables
    | BooleanVariables;
}
