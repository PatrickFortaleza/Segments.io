export interface Condition {
  id: string;
  bucket_id: number;
  item_in_zone: boolean;
  condition: string;
}

export interface ConditionHashmap {
  [id: string]: Condition;
}
