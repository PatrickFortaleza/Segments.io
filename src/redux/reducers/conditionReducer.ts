import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Condition, ConditionHashmap } from "../../models/condition";

let initialState = <ConditionHashmap | null>null;

// Initializing state if null...
if (initialState === null) {
  initialState = {};

  [...Array(2)].forEach((_, index) => {
    let conditionId = uuid(),
      bucketId = 1000 + index;

    if (initialState)
      initialState[`${conditionId}`] = <Condition>{
        id: conditionId,
        bucket_id: bucketId,
        item_in_zone: false,
        label: `condition ${index}`,
        operator: "and",
      };
  });
}

const conditions = (state = initialState, action: Action) => {
  let conditionsState = { ...state };
  switch (action.type) {
    case "change_condition_label":
      let { conditionId, label } = action.payload;
      conditionsState[conditionId] = {
        ...conditionsState[conditionId],
        label: label,
      };

      return { ...conditionsState };
    default: {
      return { ...conditionsState };
    }
  }
};
export default conditions;
