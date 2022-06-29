import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Bucket, BucketHashmap } from "../../models/bucket";

let initialState = {
  buckets: <BucketHashmap | null>null,
};

if (initialState.buckets === null) {
  initialState.buckets = {};
  ["includes", "excludes"].forEach((i, index) => {
    let bucketId = 1000 + index;

    if (initialState.buckets)
      initialState.buckets[`${bucketId}`] = <Bucket>{
        id: bucketId,
        type: i,
      };
  });
}

const buckets = (state = initialState, action: Action) => {
  let bucketState = { ...state };
  switch (action.type) {
    default: {
      return { ...bucketState };
    }
  }
};
export default buckets;
