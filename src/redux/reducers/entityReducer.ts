import { Action } from "../../models/action";
import { BucketHashmap, Bucket, dBucket } from "../../models/bucket";
import {
  ConditionHashmap,
  Condition,
  dCondition,
} from "../../models/condition";
import { RuleHashmap, Rule, dRule } from "../../models/rule";
import { v4 as uuid } from "uuid";

let initialState = {
  buckets: <BucketHashmap | null>null,
  conditions: <ConditionHashmap | null>null,
  rules: <RuleHashmap | null>null,
  denormalized: <dBucket | null>null,
  hasUpdated: <Boolean>false,
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
      entityState.hasUpdated = true;
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
        hasUpdated: true,
      };

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
        hasUpdated: true,
      };
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
        hasUpdated: true,
      };
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
        hasUpdated: true,
      };
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
        hasUpdated: true,
      };
      break;
    }
    case "denormalize": {
      // denormalize state...
      let denormalized = <dBucket>{};

      let { buckets, conditions, rules } = entityState;
      if (!buckets) return { ...entityState };

      Object.values(buckets).forEach((bucket) => {
        let bucketConditions = <Array<dCondition>>[];

        if (!conditions) return { ...entityState };

        Object.values(conditions).forEach((condition) => {
          let c = <dCondition>{
            operator: condition.operator,
            rules: [],
          };

          if (!rules) return { ...entityState };

          Object.values(rules).forEach((rule) => {
            let r = <dRule>{
              attribute: rule.name,
              equation: rule.equation,
              value: rule.value,
            };

            if (rule.condition_id === condition.id) c.rules.push(r);
          });

          if (condition.bucket_id === bucket.id) bucketConditions.push(c);
        });

        denormalized[bucket.type] = bucketConditions;
      });

      entityState = {
        ...entityState,
        denormalized,
        hasUpdated: false,
      };
    }
    default: {
      break;
    }
  }

  return { ...entityState };
};

export default entities;
