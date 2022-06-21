import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Bucket, BucketContainer } from "../../models/bucket";

const initialBucketState: Bucket = {
  label: "",
  id: "",
  rules: [],
  itemInZone: false,
  conditionLogic: "and",
};

const initialState = {
  buckets: <BucketContainer>{
    includes: [{ ...initialBucketState, label: "condition 1", id: uuid() }],
    excludes: [{ ...initialBucketState, label: "condition 1", id: uuid() }],
  },
};

const bucketReducer = (state = initialState, action: Action) => {
  let bucketState = { ...state };
  switch (action.type) {
    case "evaluate_in_zone": {
      let { bucketType, bucketIndex, inZone } = action.payload;

      bucketState.buckets[bucketType as keyof BucketContainer][
        bucketIndex
      ].itemInZone = inZone;

      return { ...bucketState };
    }
    case "update_label": {
      let { bucketType, bucketIndex, label } = action.payload;

      bucketState.buckets[bucketType as keyof BucketContainer][
        bucketIndex
      ].label = label;

      return { ...bucketState };
    }
    case "update_condition_logic": {
      let { bucketType, bucketIndex, conditionLogic } = action.payload;

      bucketState.buckets[bucketType as keyof BucketContainer][
        bucketIndex
      ].conditionLogic = conditionLogic;

      return { ...bucketState };
    }
    case "add_condition": {
      let { bucketType } = action.payload;

      let newBucket: Bucket = {
        ...initialBucketState,
        label: `condition ${
          bucketState.buckets[bucketType as keyof BucketContainer].length + 1
        }`,
        id: uuid(),
      };

      bucketState = {
        ...bucketState,
        buckets: {
          ...bucketState.buckets,
        },
      };

      bucketState.buckets[bucketType as keyof BucketContainer] = [
        ...bucketState.buckets[bucketType as keyof BucketContainer],
        newBucket,
      ];

      return { ...bucketState };
    }
    case "remove_condition": {
      let { bucketType, bucketId } = action.payload;

      if (bucketState.buckets[bucketType as keyof BucketContainer].length > 1) {
        bucketState = {
          ...bucketState,
          buckets: {
            ...bucketState.buckets,
          },
        };

        let newBucket = bucketState.buckets[
          bucketType as keyof BucketContainer
        ].filter((bucket) => bucket.id !== bucketId);

        bucketState.buckets[bucketType as keyof BucketContainer] = [
          ...newBucket,
        ];
      }

      return { ...bucketState };
    }
  }
  return state;
};
export default bucketReducer;
