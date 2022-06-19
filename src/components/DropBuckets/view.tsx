import React from "react";
import { BucketContainer } from "../../models/bucket";
import Bucket from "./Bucket";
import { Icon } from "semantic-ui-react";

export default function DropBucketsView({
  buckets,
}: {
  buckets: BucketContainer;
}) {
  return (
    <div className="buckets__container">
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
        </div>
      </div>
    </div>
  );
}
