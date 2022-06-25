import { Action } from "../../models/action";
import { v4 as uuid } from "uuid";
import { Bucket, BucketWithType, BucketContainer } from "../../models/bucket";
import { Attribute, AttributeWithId } from "../../models/attributes";
import BucketController from "../../components/DropBuckets/Bucket";

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
        rules: [],
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
    case "handle_dropped": {
      let { itemId, itemType } = action.payload;

      if (!itemId || !itemType) return { ...bucketState };

      let attribute: AttributeWithId = {
        name: itemId,
        type: itemType,
        id: uuid(),
        condition: "",
        value: undefined,
      };

      let itemInBuckets: Array<BucketWithType> = [];

      let { buckets } = bucketState;

      // Find the bucket with itemInZone === true
      Object.entries(buckets).forEach(
        ([bucketType, bucket]: [string, Array<Bucket>]) => {
          bucket.forEach((b: Bucket, index: number) => {
            if (b.itemInZone) {
              let bucketWithType = {
                ...b,
                type: bucketType,
                index: index,
              };
              itemInBuckets.push(bucketWithType);
            }
          });
        }
      );

      // should only allow one bucket with itemInZone === true
      if (itemInBuckets.length !== 1) return { ...bucketState };
      let { type, index } = itemInBuckets[0];

      bucketState = {
        ...bucketState,
        buckets: {
          ...bucketState.buckets,
        },
      };

      let existingRules =
        bucketState.buckets[type as keyof BucketContainer][index].rules;

      bucketState.buckets[type as keyof BucketContainer][index].rules = [
        ...existingRules,
        attribute,
      ];

      return { ...bucketState };
    }
    default: {
      return { ...bucketState };
    }
  }
  return state;
};
export default bucketReducer;
