import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Bucket } from "../../models/bucket";

const bucketState: Bucket = {
  label: "",
  id: "",
  rules: [],
  ref: null,
  itemInZone: false,
};

const initialState = {
  buckets: {
    includes: [{ ...bucketState, label: "condition 1", id: uuid() }],
    excludes: [{ ...bucketState, label: "condition 1", id: uuid() }],
  },
};

const dragReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "dropzone_listen": {
      return { ...state };
    }
  }
  return state;
};
export default dragReducer;
