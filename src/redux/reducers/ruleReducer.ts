import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Rule, RuleHashmap } from "../../models/rule";

let initialState = <RuleHashmap | null>null;
let emptyRule = <Rule>{
  id: "",
  condition_id: "",
  type: "",
  name: "",
  equation: "",
  value: "",
};

// Initializing state if null...
if (initialState === null) {
  initialState = {};
}

const rules = (state = initialState, action: Action) => {
  let rulesState = { ...state };
  switch (action.type) {
    case "add_rule": {
      let { rule } = action.payload;

      let ruleId = uuid();

      let newRule = {
        ...rule,
        id: ruleId,
      };

      rulesState[ruleId] = newRule;

      break;
    }
    default: {
      break;
    }
  }
  return { ...rulesState };
};
export default rules;
