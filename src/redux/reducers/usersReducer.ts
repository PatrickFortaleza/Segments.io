import { Action } from "../../models/action";
import { User } from "../../models/user";
import { checkRules, computeEquation } from "../../utility";
import { dCondition } from "../../models/condition";

const inititalState = {
  users: <Array<User>>[],
  filteredUsers: <Array<User>>[],
  segmentTitle: <string>"Untitled segment",
  segmentDescription: <string>"",
};

const users = (state = inititalState, action: Action) => {
  let usersState = { ...state };
  switch (action.type) {
    case "initialize_users": {
      return { ...usersState, users: action.payload };
    }
    case "update_segment_description": {
      return { ...usersState, segmentDescription: action.payload };
    }
    case "update_segment_title": {
      return { ...usersState, segmentTitle: action.payload };
    }
    case "apply_filters": {
      let { rules } = action.payload;
      let users = usersState.users;

      if (
        !rules ||
        (!Array.isArray(rules.includes) && !Array.isArray(rules.excludes)) ||
        (rules.includes.length < 1 && rules.excludes.length < 1)
      )
        return { ...usersState, filteredUsers: [] };

      let filtered = users.filter((user) => {
        let includes, excludes;

        includes = rules.includes.map((condition: dCondition) => {
          let { operator } = condition;
          let rules = condition.rules.map((rule) => {
            let { attribute, equation, value } = rule;
            return computeEquation({
              equation,
              attribute: user[attribute as keyof User],
              value,
            });
          });

          return checkRules({ operator, rules });
        });

        excludes = rules.excludes.map((condition: dCondition) => {
          let { operator } = condition;
          let rules = condition.rules.map((rule) => {
            let { attribute, equation, value } = rule;
            return computeEquation({
              equation,
              attribute: user[attribute as keyof User],
              value,
            });
          });

          return checkRules({ operator, rules });
        });

        return (
          includes.every((rule: boolean) => rule === true) &&
          excludes.every((rule: boolean) => rule === false)
        );
      });

      return { ...usersState, filteredUsers: filtered };
    }
    default: {
      return { ...usersState };
    }
  }
};
export default users;
