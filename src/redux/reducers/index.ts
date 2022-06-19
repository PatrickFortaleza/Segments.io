import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import dragReducer from "./dragReducer";

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  dragReducer: dragReducer,
});

export default rootReducer;
