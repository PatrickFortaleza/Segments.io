import React, { LegacyRef } from "react";
import { Bucket, BucketContainer } from "../../../models/bucket";
import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../../models";

export default function BucketView({
  bucket,
  bucketRef,
  labelRef,
  inZone,
  remove,
  editingLabel,
  conditionLabel,
  conditionLogic,
}: {
  bucket: Bucket;
  bucketRef: LegacyRef<HTMLDivElement> | undefined;
  labelRef: LegacyRef<HTMLInputElement> | undefined;
  inZone: boolean;
  remove: () => void;
  editingLabel: SetterGetter;
  conditionLabel: SetterGetter;
  conditionLogic: SetterGetter;
}) {
  const conditionLogicOptions = ["and", "or"];
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
            {conditionLogicOptions.map((opt, index) => (
              <label
                className={`container ${
                  conditionLogic.value === opt ? "checked" : ""
                }`}
                key={index}
              >
                {opt}
                <input
                  type="radio"
                  checked={conditionLogic.value === opt ? true : false}
                  onChange={(e) => conditionLogic.setter(e.target.value)}
                  name="logicOptions"
                  value={opt}
                />
              </label>
            ))}
          </div>
          <button onClick={() => remove()}>
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
