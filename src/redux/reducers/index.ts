import { combineReducers } from "redux";
import users from "./usersReducer";
import drag from "./dragReducer";
import buckets from "./bucketReducer";
import attributes from "./attributeReducer";

const rootReducer = combineReducers({
  users: users,
  drag: drag,
  buckets: buckets,
  attributes: attributes,
});

export default rootReducer;
