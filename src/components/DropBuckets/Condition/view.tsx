import { LegacyRef } from "react";
import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../../models";
import { Condition } from "../../../models/condition";
import { useDispatch } from "react-redux";
import {
  changeConditionLabel,
  changeConditionOperator,
  removeCondition,
} from "../../../redux/actions/entity";
import { Rule } from "../../../models/rule";
import { default as RuleItem } from "../Rule";
import EditableLabel from "../../FormComponents/EditableLabel";

export default function ConditionView({
  condition,
  conditionOperators,
  dropRef,
  conditionRules,
}: {
  condition: Condition;
  conditionOperators: Array<string>;
  dropRef: LegacyRef<HTMLDivElement> | undefined;
  conditionRules: Array<Rule>;
}) {
  const dispatch = useDispatch();
  return (
    <div className="drag__bucket">
      <div className="drag__bucket__header">
        <EditableLabel
          label={condition.label}
          emitValue={(value) =>
            dispatch(
              changeConditionLabel({
                conditionId: condition.id,
                label: value,
              })
            )
          }
        />
        <div className="bucket__actions">
          <div className="bucket__actions__radio">
            {conditionRules.length > 1 &&
              conditionOperators.map((opt, index) => (
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
      <div className="drag__bucket__rules">
        {conditionRules.length > 0 ? (
          conditionRules.map((rule) => (
            <RuleItem
              key={rule.id}
              rule={rule}
              conditionOperator={condition.operator}
            />
          ))
        ) : (
          <p className="empty">
            <Icon name="warning sign" /> No existing rules for this condition
          </p>
        )}
      </div>
      <div
        className={`drag__bucket__target ${
          condition?.item_in_zone ? "active" : ""
        }`}
        ref={dropRef}
      >
        <p>Drag + Drop a Rule here to add to condition</p>
      </div>
    </div>
  );
}
