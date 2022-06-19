import React from "react";
import { BucketContainer } from "../../models/bucket";
import Bucket from "./Bucket";

export default function DropBucketsView({
  buckets,
}: {
  buckets: BucketContainer;
}) {
  return (
    <div>
      {Array.isArray(buckets?.includes) &&
        buckets.includes.map((bucket, index) => (
          <Bucket
            key={index}
            bucket={{ ...bucket }}
            bucketKey={"includes"}
            bucketIndex={index}
          />
        ))}
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
  );
}
