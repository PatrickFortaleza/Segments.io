import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import dragReducer from "./dragReducer";
import bucketReducer from "./bucketReducer";

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  dragReducer: dragReducer,
  bucketReducer: bucketReducer,
});

export default rootReducer;
