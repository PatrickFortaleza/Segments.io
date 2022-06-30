import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Rule, RuleHashmap } from "../../models/rule";

let initialState = <RuleHashmap | null>null;

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

      let newRule = <Rule>{
        ...rule,
        id: ruleId,
      };

      rulesState[ruleId] = newRule;

      break;
    }
    case "update_rule": {
      let { ruleId, equation, value } = action.payload;

      if (!rulesState[ruleId]) return { ...rulesState };

      rulesState[ruleId] = {
        ...rulesState[ruleId],
        equation,
        value,
      };
      break;
    }
    case "delete_rule": {
      let { ruleId } = action.payload;

      if (!rulesState[ruleId]) return { ...rulesState };

      delete rulesState[ruleId];
      break;
    }
    default: {
      break;
    }
  }

  return { ...rulesState };
};
export default rules;
