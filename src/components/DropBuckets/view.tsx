import React from "react";
import { BucketContainer, BucketHashmap } from "../../models/bucket";
import Bucket from "./Bucket";
import { Icon } from "semantic-ui-react";

export default function DropBucketsView({
  buckets,
  addToBucket,
}: {
  buckets: BucketHashmap;
  addToBucket: ({ bucketType }: { bucketType: keyof BucketContainer }) => any;
}) {
  return (
    <div className="buckets__container">
      {Object.values(buckets).map((bucket) => (
        <div key={bucket.id}>
          <div className="buckets__container__outer">
            <h3>
              {bucket.type} <Icon name="info circle" />
            </h3>
            <div className="buckets__container__inner">
              <Bucket bucket={bucket} />
              <button
                className="add"
                onClick={() => addToBucket({ bucketType: "includes" })}
              >
                + Add new condition
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
