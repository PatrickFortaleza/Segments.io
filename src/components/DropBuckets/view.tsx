import React from "react";
import { BucketContainer } from "../../models/bucket";
import Bucket from "./Bucket";
import { Icon } from "semantic-ui-react";

export default function DropBucketsView({
  buckets,
  addToBucket,
}: {
  buckets: BucketContainer;
  addToBucket: ({ bucketType }: { bucketType: keyof BucketContainer }) => any;
}) {
  return (
    <div
      className="buckets__container"
      key={`includes-${buckets.includes.length} excludes-${buckets.excludes.length}`}
    >
      <div className="buckets__container__outer">
        <h3>
          Includes <Icon name="info circle" />
        </h3>
        <div className="buckets__container__inner">
          {Array.isArray(buckets?.includes) &&
            buckets.includes.map((bucket, index) => (
              <Bucket
                key={index}
                bucket={{ ...bucket }}
                bucketKey={"includes"}
                bucketIndex={index}
              />
            ))}
          <button
            className="add"
            onClick={() => addToBucket({ bucketType: "includes" })}
          >
            + Add new condition
          </button>
        </div>
      </div>
      <div className="buckets__container__outer">
        <h3>
          Excludes <Icon name="info circle" />
        </h3>
        <div className="buckets__container__inner">
          {Array.isArray(buckets?.excludes) &&
            buckets.excludes.map((bucket, index) => (
              <Bucket
                key={index}
                bucket={{ ...bucket }}
                bucketKey={"excludes"}
                bucketIndex={index}
              />
            ))}
          <button
            className="add"
            onClick={() => addToBucket({ bucketType: "excludes" })}
          >
            + Add new condition
          </button>
        </div>
      </div>
    </div>
  );
}
