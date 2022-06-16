import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  sidebarReducer: sidebarReducer,
});

export default rootReducer;
