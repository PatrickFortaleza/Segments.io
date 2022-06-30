import React, { LegacyRef } from "react";
import { Bucket, BucketContainer } from "../../../models/bucket";
import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../../models";
import Rule from "../Rule";
import { Condition } from "../../../models/condition";
import { useDispatch } from "react-redux";
import { changeConditionLabel } from "../../../redux/actions/condition";

export default function BucketView({
  bucketConditions,
}: {
  bucketConditions: Array<Condition>;
}) {
  const conditionLogicOptions = ["and", "or"];
  const dispatch = useDispatch();

  return (
    <>
      {bucketConditions.map((condition, index) => (
        <div className="drag__bucket">
          <div className="drag__bucket__header">
            <div className="bucket__label">
              <button onClick={() => console.log("set edit")}>
                <Icon name="edit" />
              </button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("submit");
                }}
              >
                <input
                  ref={null}
                  type="text"
                  value={condition.label}
                  onChange={(e) =>
                    dispatch(
                      changeConditionLabel({
                        conditionId: condition.id,
                        label: e.target.value,
                      })
                    )
                  }
                  // className={`${editingLabel.value ? "editing" : ""}`}
                  // readOnly={editingLabel.value ? false : true}
                  // disabled={editingLabel.value ? false : true}
                />
              </form>
            </div>
            <div className="bucket__actions">
              <div className="bucket__actions__radio">
                {conditionLogicOptions.map((opt, index) => (
                  <label
                    className={`container ${
                      condition.operator === opt ? "checked" : ""
                    }`}
                    key={index}
                  >
                    {opt}
                    <input
                      type="radio"
                      checked={condition.operator === opt ? true : false}
                      onChange={(e) => console.log("change")}
                      name="logicOptions"
                      value={opt}
                    />
                  </label>
                ))}
              </div>
              <button onClick={() => console.log("remove")}>
                <Icon name="trash alternate" />{" "}
              </button>
            </div>
          </div>
          <div
            className={`drag__bucket__target ${false ? "active" : ""}`}
            ref={null}
          >
            <p>Drag + Drop a Rule here to add to condition</p>
          </div>
        </div>
      ))}
    </>
  );
}
