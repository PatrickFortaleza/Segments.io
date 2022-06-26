import { BucketContainer } from "../../models/bucket";

export const evaluateInZone = ({
  bucketType,
  bucketIndex,
  inZone,
}: {
  bucketType: keyof BucketContainer;
  bucketIndex: number;
  inZone: boolean;
}) => {
  return {
    type: "evaluate_in_zone",
    payload: {
      bucketType,
      bucketIndex,
      inZone,
    },
  };
};

export const updateLabel = ({
  bucketType,
  bucketIndex,
  label,
}: {
  bucketType: keyof BucketContainer;
  bucketIndex: number;
  label: string;
}) => {
  return {
    type: "update_label",
    payload: {
      bucketType,
      bucketIndex,
      label,
    },
  };
};

export const updateConditionLogic = ({
  bucketType,
  bucketIndex,
  conditionLogic,
}: {
  bucketType: keyof BucketContainer;
  bucketIndex: number;
  conditionLogic: string;
}) => {
  return {
    type: "update_condition_logic",
    payload: {
      bucketType,
      bucketIndex,
      conditionLogic,
    },
  };
};

export const addCondition = ({
  bucketType,
}: {
  bucketType: keyof BucketContainer;
}) => {
  return {
    type: "add_condition",
    payload: {
      bucketType,
    },
  };
};

export const removeCondition = ({
  bucketType,
  bucketId,
}: {
  bucketType: keyof BucketContainer;
  bucketId: string;
}) => {
  return {
    type: "remove_condition",
    payload: {
      bucketType,
      bucketId,
    },
  };
};

export const addRuleToBucket = ({
  itemId,
  itemType,
}: {
  itemId: string;
  itemType: string;
}) => {
  return {
    type: "add_rule_to_bucket",
    payload: {
      itemId,
      itemType,
    },
  };
};

export const deleteRuleFromBucket = ({
  bucketType,
  bucketIndex,
  ruleId,
}: {
  bucketType: keyof BucketContainer;
  bucketIndex: number;
  ruleId: string;
}) => {
  return {
    type: "delete_rule_from_bucket",
    payload: {
      bucketType,
      bucketIndex,
      ruleId,
    },
  };
};

export const updateRuleLogic = ({
  ruleId,
  bucketType,
  bucketIndex,
  condition,
  value,
}: {
  ruleId: string;
  bucketType: keyof BucketContainer;
  bucketIndex: number;
  condition: string;
  value: string | number | boolean | undefined;
}) => {
  return {
    type: "update_rule_logic",
    payload: {
      bucketType,
      bucketIndex,
      ruleId,
      condition,
      value,
    },
  };
};
