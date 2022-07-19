import { User } from "../../models/user";
import { dBucket } from "../../models/bucket";

export const initializeUsers = ({ users }: { users: Array<User> }) => {
  return {
    type: "initialize_users",
    payload: users,
  };
};

export const applyFilters = ({ rules }: { rules: dBucket }) => {
  return {
    type: "apply_filters",
    payload: {
      rules: rules,
    },
  };
};
