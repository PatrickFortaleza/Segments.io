import React, { LegacyRef } from "react";
import { Bucket } from "../../../models/bucket";

export default function BucketView({
  bucket,
  bucketRef,
  inZone,
}: {
  bucket: Bucket;
  bucketRef: LegacyRef<HTMLDivElement> | undefined;
  inZone: boolean;
}) {
  return (
    <div className="drag__bucket">
      <div className="drag__bucket__rules"></div>
      <div
        className={`drag__bucket__target ${inZone ? "active" : ""}`}
        ref={bucketRef}
      >
        <p>Drag + Drop a Rule here to add to condition</p>
      </div>
    </div>
  );
}
