import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Bucket, BucketContainer } from "../../models/bucket";

const bucketState: Bucket = {
  label: "",
  id: "",
  rules: [],
  itemInZone: false,
};

const initialState = {
  buckets: <BucketContainer>{
    includes: [{ ...bucketState, label: "condition 1", id: uuid() }],
    excludes: [{ ...bucketState, label: "condition 1", id: uuid() }],
  },
};

const dragReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "evaluate_in_zone": {
      let { bucketType, bucketIndex, inZone } = action.payload;
      let bucketState = { ...state };

      bucketState.buckets[bucketType as keyof BucketContainer][
        bucketIndex
      ].itemInZone = inZone;

      return { ...bucketState };
    }
  }
  return state;
};
export default dragReducer;
