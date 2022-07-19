import { Action } from "../../models/action";
import { User } from "../../models/user";

const inititalState = {
  users: <Array<User>>[],
  filteredUsers: <Array<User>>[],
};

const users = (state = inititalState, action: Action) => {
  switch (action.type) {
    case "initialize_users": {
      return { ...state, users: action.payload };
    }
    case "apply_filters": {
      let { rules } = action.payload;
      console.log("filter!");
    }
  }
  return state;
};
export default users;
