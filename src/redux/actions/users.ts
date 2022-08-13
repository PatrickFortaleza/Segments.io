import { User } from "../../models/user";
import { dBucket } from "../../models/bucket";

export const initializeUsers = ({ users }: { users: Array<User> }) => {
  return {
    type: "initialize_users",
    payload: users,
  };
};

export const updateSegmentTitle = (title: string) => {
  return {
    type: "update_segment_title",
    payload: title,
  };
};

export const updateSegmentDescription = (description: string) => {
  return {
    type: "update_segment_description",
    payload: description,
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
