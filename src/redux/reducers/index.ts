import { combineReducers } from "redux";
import users from "./usersReducer";
import drag from "./dragReducer";
import attributes from "./attributeReducer";
import entities from "./entityReducer";

const rootReducer = combineReducers({
  users: users,
  drag: drag,
  attributes: attributes,
  entities: entities,
});

export default rootReducer;
