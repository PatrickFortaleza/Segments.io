import { Action } from "../../models/action";
import { Bucket, dBucket } from "../../models/bucket";
import { Condition } from "../../models/condition";
import { Rule } from "../../models/rule";
import { v4 as uuid } from "uuid";
import { EntityState } from "../../models";
import { denormalizeEntityState } from "../../utility";

let initialState: EntityState = {
  buckets: null,
  conditions: null,
  rules: null,
  denormalized: null,
  pendingSave: false,
};

let emptyCondition = <Condition>{
  id: "",
  bucket_id: 0,
  item_in_zone: false,
  label: "",
  operator: "and",
};

const initializeState = () => {
  initialState.buckets = {};
  initialState.conditions = {};
  initialState.rules = {};

  // initialize buckets
  ["includes", "excludes"].forEach((i, index) => {
    let bucketId = 1000 + index;

    if (initialState.buckets)
      initialState.buckets[`${bucketId}`] = <Bucket>{
        id: bucketId,
        type: i,
      };
  });

  // initialize conditions
  [...Array(2)].forEach((_, index) => {
    let conditionId = uuid(),
      bucketId = 1000 + index;

    if (initialState.conditions)
      initialState.conditions[`${conditionId}`] = <Condition>{
        id: conditionId,
        bucket_id: bucketId,
        item_in_zone: false,
        label: `condition ${index + 1}`,
        operator: "and",
      };
  });
};

if (
  Object.values(initialState)
    .filter((i) => typeof i !== "boolean")
    .every((i) => i === null)
)
  initializeState();

const entities = (state = initialState, action: Action) => {
  let entityState = { ...state };
  switch (action.type) {
    case "add_condition": {
      let { bucketId } = action.payload,
        conditionId = uuid();

      if (!entityState.conditions) break;

      let newCondition = {
        ...emptyCondition,
        id: conditionId,
        bucket_id: bucketId,
        label: `condition ${
          Object.keys(entityState.conditions)?.length + 1 || 0
        }`,
      };

      entityState.conditions[conditionId] = newCondition;

      let denormalized: dBucket | null = denormalizeEntityState(entityState);

      entityState = {
        ...entityState,
        denormalized,
        pendingSave: true,
      };
      break;
    }
    case "remove_condition": {
      let { conditionId } = action.payload;

      // delete condtion
      if (!entityState.conditions || !entityState.conditions[conditionId])
        break;
      delete entityState.conditions[conditionId];

      // delete rules in condition
      if (!entityState.rules) break;

      let rules = { ...entityState.rules };
      Object.values(rules).forEach((rule) => {
        if (rule.condition_id === conditionId) delete rules[rule.id];
      });

      entityState = {
        ...entityState,
        rules,
        pendingSave: true,
      };

      // denormalize entity state...
      entityState.denormalized = denormalizeEntityState(entityState);
      break;
    }
    case "change_condition_label": {
      let { conditionId, label } = action.payload;
      if (!entityState.conditions || !entityState.conditions[conditionId])
        break;

      let conditions = {
        ...entityState.conditions,
      };

      conditions[conditionId] = {
        ...conditions[conditionId],
        label: label,
      };

      entityState = {
        ...entityState,
        conditions,
        pendingSave: true,
      };

      break;
    }
    case "change_condition_operator": {
      let { conditionId, operator } = action.payload;
      if (!entityState.conditions || !entityState.conditions[conditionId])
        break;

      let conditions = {
        ...entityState.conditions,
      };

      conditions[conditionId] = {
        ...conditions[conditionId],
        operator: operator,
      };

      entityState = {
        ...entityState,
        conditions,
        pendingSave: true,
      };

      // denormalize entity state...
      entityState.denormalized = denormalizeEntityState(entityState);
      break;
    }
    case "change_condition_in_zone": {
      let { conditionId, inZone } = action.payload;
      if (!entityState.conditions || !entityState.conditions[conditionId])
        break;

      let conditions = {
        ...entityState.conditions,
      };

      conditions[conditionId] = {
        ...conditions[conditionId],
        item_in_zone: inZone,
      };

      entityState = {
        ...entityState,
        conditions,
      };
      break;
    }
    case "add_rule": {
      let { rule } = action.payload;
      if (!entityState.conditions) break;

      let conditions: Array<Condition> = Object.values(entityState.conditions);

      let activeCondition: Array<Condition> = conditions.filter(
        (condition: any): condition is Condition => condition.item_in_zone
      );

      // must only have one active condition with item_in_zone == true
      if (activeCondition.length !== 1) break;

      let ruleId = uuid();

      let newRule = <Rule>{
        ...rule,
        id: ruleId,
        condition_id: activeCondition[0].id,
      };

      let rules = {
        ...entityState.rules,
      };

      rules[ruleId] = newRule;

      entityState = {
        ...entityState,
        rules,
        pendingSave: true,
      };

      // denormalize entity state...
      entityState.denormalized = denormalizeEntityState(entityState);
      break;
    }
    case "update_rule": {
      let { ruleId, equation, value } = action.payload;

      if (!entityState.rules || !entityState.rules[ruleId]) break;

      let rules = {
        ...entityState.rules,
      };

      rules[ruleId] = {
        ...rules[ruleId],
        equation,
        value,
      };

      entityState = {
        ...entityState,
        rules,
        pendingSave: true,
      };

      // denormalize entity state...
      entityState.denormalized = denormalizeEntityState(entityState);
      break;
    }
    case "delete_rule": {
      let { ruleId } = action.payload;

      if (!entityState.rules || !entityState.rules[ruleId]) break;

      let rules = {
        ...entityState.rules,
      };

      delete rules[ruleId];

      entityState = {
        ...entityState,
        rules,
        pendingSave: true,
      };

      // denormalize entity state...
      entityState.denormalized = denormalizeEntityState(entityState);
      break;
    }
    case "update_pending_save": {
      let { bool } = action.payload;
      entityState.pendingSave = bool;
    }
    default: {
      break;
    }
  }

  return { ...entityState };
};

export default entities;
