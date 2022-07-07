// CONDITIONS
export const addCondition = ({ bucketId }: { bucketId: string }) => {
  return {
    type: "add_condition",
    payload: {
      bucketId,
    },
  };
};

export const removeCondition = ({ conditionId }: { conditionId: string }) => {
  return {
    type: "remove_condition",
    payload: {
      conditionId,
    },
  };
};

export const changeConditionLabel = ({
  conditionId,
  label,
}: {
  conditionId: string;
  label: string;
}) => {
  return {
    type: "change_condition_label",
    payload: {
      conditionId,
      label,
    },
  };
};

export const changeConditionOperator = ({
  conditionId,
  operator,
}: {
  conditionId: string;
  operator: string;
}) => {
  return {
    type: "change_condition_operator",
    payload: {
      conditionId,
      operator,
    },
  };
};

export const changeInZone = ({
  conditionId,
  inZone,
}: {
  conditionId: string;
  inZone: boolean;
}) => {
  return {
    type: "change_condition_in_zone",
    payload: {
      conditionId,
      inZone,
    },
  };
};

// RULES
export const addRule = ({
  ruleType,
  ruleName,
}: {
  ruleType: string;
  ruleName: string;
}) => {
  let rule = {
    condition_id: "",
    type: ruleType,
    name: ruleName,
    equation: "",
    value: undefined,
  };

  return {
    type: "add_rule",
    payload: {
      rule,
    },
  };
};

export const updateRule = ({
  ruleId,
  equation,
  value,
}: {
  ruleId: string;
  equation: string;
  value: string | number | boolean | undefined;
}) => {
  return {
    type: "update_rule",
    payload: {
      ruleId,
      equation,
      value,
    },
  };
};

export const deleteRule = ({ ruleId }: { ruleId: string }) => {
  return {
    type: "delete_rule",
    payload: {
      ruleId,
    },
  };
};
