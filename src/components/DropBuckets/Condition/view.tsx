import React, { LegacyRef } from "react";
import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../../models";
import { Condition } from "../../../models/condition";
import { useDispatch } from "react-redux";
import {
  changeConditionLabel,
  changeConditionOperator,
  removeCondition,
} from "../../../redux/actions/condition";

export default function ConditionView({
  condition,
  conditionOperators,
  editingLabel,
  bucketRef,
  labelRef,
}: {
  condition: Condition;
  conditionOperators: Array<string>;
  editingLabel: SetterGetter;
  bucketRef: LegacyRef<HTMLDivElement> | undefined;
  labelRef: LegacyRef<HTMLInputElement> | undefined;
}) {
  const dispatch = useDispatch();
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
              value={condition.label}
              onChange={(e) =>
                dispatch(
                  changeConditionLabel({
                    conditionId: condition.id,
                    label: e.target.value,
                  })
                )
              }
              className={`${editingLabel.value ? "editing" : ""}`}
              readOnly={editingLabel.value ? false : true}
              disabled={editingLabel.value ? false : true}
            />
          </form>
        </div>
        <div className="bucket__actions">
          <div className="bucket__actions__radio">
            {conditionOperators.map((opt, index) => (
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
                  onChange={(e) =>
                    dispatch(
                      changeConditionOperator({
                        conditionId: condition.id,
                        operator: e.target.value,
                      })
                    )
                  }
                  name="logicOptions"
                  value={opt}
                />
              </label>
            ))}
          </div>
          <button
            onClick={() =>
              dispatch(
                removeCondition({
                  conditionId: condition.id,
                })
              )
            }
          >
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
  );
}
