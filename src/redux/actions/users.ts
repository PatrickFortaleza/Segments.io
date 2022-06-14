import { User } from "../../models/user";

export const initializeUsers = ({users}:{users:Array<User>}) => {
  return {
    type: "initialize_users",
    payload: users,
  };
};