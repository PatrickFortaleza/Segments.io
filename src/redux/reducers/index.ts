import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import dragReducer from "./dragReducer";
import bucketReducer from "./bucketReducer";
import attributeReducer from "./attributeReducer";

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  dragReducer: dragReducer,
  bucketReducer: bucketReducer,
  attributeReducer: attributeReducer,
});

export default rootReducer;
