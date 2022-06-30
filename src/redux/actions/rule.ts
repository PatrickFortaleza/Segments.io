import { Condition, ConditionHashmap } from "../../models/condition";
import { Rule } from "../../models/rule";
import store from "../store";

export const addRule = ({
  ruleType,
  ruleName,
}: {
  ruleType: string;
  ruleName: string;
}) => {
  let conditionState: ConditionHashmap = store.getState().conditions,
    conditions: Array<Condition> = Object.values(conditionState);

  let activeCondition: Array<Condition> = conditions.filter(
    (condition: any): condition is Condition => condition.item_in_zone
  );

  // must only have one active condition with item_in_zone == true
  if (activeCondition.length !== 1) return { type: null, payload: null };

  let rule = {
    condition_id: activeCondition[0].id,
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
