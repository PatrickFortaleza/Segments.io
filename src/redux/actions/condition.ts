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
