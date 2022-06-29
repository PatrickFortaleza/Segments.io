import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Condition, ConditionHashmap } from "../../models/condition";

let initialState = {
  conditions: <ConditionHashmap | null>null,
};

if (initialState.conditions === null) {
  initialState.conditions = {};
  [...Array(2)].forEach((_, index) => {
    let conditionId = uuid(),
      bucketId = 1000 + index;

    if (initialState.conditions)
      initialState.conditions[`${conditionId}`] = <Condition>{
        id: conditionId,
        bucket_id: bucketId,
        item_in_zone: false,
        condition: "and",
      };
  });
}

const conditions = (state = initialState, action: Action) => {
  let conditionsState = { ...state };
  switch (action.type) {
    default: {
      return { ...conditionsState };
    }
  }
};
export default conditions;
