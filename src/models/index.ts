import { BucketHashmap, dBucket } from "./bucket";
import { ConditionHashmap } from "./condition";
import { RuleHashmap } from "./rule";

export interface SetterGetter {
  value: any;
  setter: (variable: any) => any;
}

export interface EntityState {
  buckets: BucketHashmap | null;
  conditions: ConditionHashmap | null;
  rules: RuleHashmap | null;
  denormalized: dBucket | null;
  pendingSave: boolean;
}
