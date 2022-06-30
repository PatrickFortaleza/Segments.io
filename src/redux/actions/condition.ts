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
