export interface Rule {
  id: string;
  condition_id: string;
  type: string;
  name: string;
  equation: string;
  value: string | number | boolean | undefined;
}

export interface RuleHashmap {
  [id: string]: Rule;
}

export interface dRule {
  attribute: string | number | boolean;
  equation: string;
  value: string | number | boolean;
}
