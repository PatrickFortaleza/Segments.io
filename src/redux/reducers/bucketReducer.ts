import { Action } from "../../models/action";
import { Bucket, BucketHashmap } from "../../models/bucket";

let initialState = <BucketHashmap | null>null;

// Initializing state if null...
const initializeState = () => {
  initialState = {};
  ["includes", "excludes"].forEach((i, index) => {
    let bucketId = 1000 + index;

    if (initialState)
      initialState[`${bucketId}`] = <Bucket>{
        id: bucketId,
        type: i,
      };
  });
};

if (initialState === null) initializeState();

const buckets = (state = initialState, action: Action) => {
  let bucketState = { ...state };
  switch (action.type) {
    default: {
      return { ...bucketState };
    }
  }
};
export default buckets;
