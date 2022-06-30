import { combineReducers } from "redux";
import users from "./usersReducer";
import drag from "./dragReducer";
import buckets from "./bucketReducer";
import attributes from "./attributeReducer";
import conditions from "./conditionReducer";
import rules from "./ruleReducer";

const rootReducer = combineReducers({
  users: users,
  drag: drag,
  buckets: buckets,
  attributes: attributes,
  conditions: conditions,
  rules: rules,
});

export default rootReducer;
