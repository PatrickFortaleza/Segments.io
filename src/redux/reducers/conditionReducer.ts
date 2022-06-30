import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Condition, ConditionHashmap } from "../../models/condition";

let initialState = <ConditionHashmap | null>null;
let emptyCondition = <Condition>{
  id: "",
  bucket_id: 0,
  item_in_zone: false,
  label: "",
  operator: "and",
};

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
    case "change_condition_label": {
      let { conditionId, label } = action.payload;
      conditionsState[conditionId] = {
        ...conditionsState[conditionId],
        label: label,
      };
      break;
    }
    case "change_condition_operator": {
      let { conditionId, operator } = action.payload;
      conditionsState[conditionId] = {
        ...conditionsState[conditionId],
        operator: operator,
      };
      break;
    }
    case "add_condition": {
      let { bucketId } = action.payload,
        conditionId = uuid();

      let newCondition = {
        ...emptyCondition,
        id: conditionId,
        bucket_id: bucketId,
        label: `condition ${Object.keys(conditionsState)?.length || 0}`,
      };

      conditionsState[conditionId] = newCondition;
      break;
    }
    case "remove_condition": {
      let { conditionId } = action.payload;
      delete conditionsState[conditionId];
      break;
    }
    default:
      break;
  }
  return { ...conditionsState };
};
export default conditions;
