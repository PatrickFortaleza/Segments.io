import React, { LegacyRef } from "react";
import { Bucket } from "../../../models/bucket";
import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../../models";

export default function BucketView({
  bucket,
  bucketRef,
  labelRef,
  inZone,
  editingLabel,
  conditionLabel,
}: {
  bucket: Bucket;
  bucketRef: LegacyRef<HTMLDivElement> | undefined;
  labelRef: LegacyRef<HTMLInputElement> | undefined;
  inZone: boolean;
  editingLabel: SetterGetter;
  conditionLabel: SetterGetter;
}) {
  return (
    <div className="drag__bucket">
      <div className="drag__bucket__header">
        <div className="bucket__label">
          <button onClick={() => editingLabel.setter(!editingLabel.value)}>
            {editingLabel.value ? (
              <Icon name="checkmark" style={{ color: "var(--success-1)" }} />
            ) : (
              <Icon name="edit" />
            )}
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingLabel.setter(false);
            }}
          >
            <input
              ref={labelRef}
              type="text"
              value={conditionLabel.value}
              onChange={(e) => conditionLabel.setter(e.target.value)}
              className={`${editingLabel.value ? "editing" : ""}`}
              readOnly={editingLabel.value ? false : true}
              disabled={editingLabel.value ? false : true}
            />
          </form>
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
