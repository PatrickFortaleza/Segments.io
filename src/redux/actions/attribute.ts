import { User } from "../../models/user";

export const initializeAttributeMeta = ({ users }: { users: Array<User> }) => {
  return {
    type: "initialize_attribute_meta",
    payload: {
      users,
    },
  };
};
