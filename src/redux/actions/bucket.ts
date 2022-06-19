import { BucketContainer } from "../../models/bucket";

export const evaluateInZone = ({
  bucketType,
  bucketIndex,
  inZone,
}: {
  bucketType: keyof BucketContainer;
  bucketIndex: number;
  inZone: boolean;
}) => {
  return {
    type: "evaluate_in_zone",
    payload: {
      bucketType,
      bucketIndex,
      inZone,
    },
  };
};
