import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Bucket, BucketHashmap } from "../../models/bucket";

let initialState = <BucketHashmap | null>null;

if (initialState === null) {
  initialState = {};
  ["includes", "excludes"].forEach((i, index) => {
    let bucketId = 1000 + index;

    if (initialState)
      initialState[`${bucketId}`] = <Bucket>{
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
