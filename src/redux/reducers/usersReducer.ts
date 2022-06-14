import { Action } from "../../models/action";
import { User } from "../../models/user";

const inititalState = {
  users: <Array<User>>[],
  filteredUsers: <Array<User>>[],
};

const usersReducer = (state = inititalState, action: Action) => {
  switch (action.type) {
    case "initialize_users": {
      return { ...state, users: action.payload };
    }
  }
  return state;
};
export default usersReducer;
