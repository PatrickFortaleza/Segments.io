import { combineReducers } from "redux";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  usersReducer: usersReducer,
});

export default rootReducer;