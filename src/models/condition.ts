import { dRule } from "./rule";

export interface Condition {
  id: string;
  bucket_id: number;
  item_in_zone: boolean;
  operator: string;
  label: string;
}

export interface ConditionHashmap {
  [id: string]: Condition;
}

export interface dCondition {
  operator: string;
  rules: Array<dRule>;
}
