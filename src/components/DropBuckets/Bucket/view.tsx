import React, { LegacyRef } from "react";
import { Bucket } from "../../../models/bucket";
import { Icon } from "semantic-ui-react";

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
      <div className="drag__bucket__header">
        <div className="bucket__label">
          <button>
            <Icon name="edit" />
          </button>
          <input type="text" value={bucket.label} />
        </div>
        <div className="bucket__actions">
          <div className="bucket__actions__radio">
            <label className="container">
              and
              <input type="radio" checked={true} name="radio" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              or
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
          </div>
          <button>
            <Icon name="trash alternate" />{" "}
          </button>
        </div>
      </div>
      <div className="drag__bucket__rules">
        <p className="empty">
          <Icon name="warning sign" /> No rules currently selected for this
          condition
        </p>
      </div>
      <div
        className={`drag__bucket__target ${inZone ? "active" : ""}`}
        ref={bucketRef}
      >
        <p>Drag + Drop a Rule here to add to condition</p>
      </div>
    </div>
  );
}
