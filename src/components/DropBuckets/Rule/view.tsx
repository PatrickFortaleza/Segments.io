import React from "react";
import { AttributeWithId } from "../../../models/attributes";
import { returnTypeIcon } from "../../../data/attributes";
import { Icon } from "semantic-ui-react";
import { snakeCaseToTitleCase } from "../../../utility";
import RangeSlider from "../../FormComponents/RangeSlider";
import DateSlider from "../../FormComponents/DateSlider";
import AlphaInput from "../../FormComponents/AlphaInput";
import CustomSelect from "../../FormComponents/CustomSelect";
import { SetterGetter } from "../../../models";

export default function RuleView({
  rule,
  conditionLogic,
  ruleMetadata,
  handleDelete,
  ruleLogic,
}: {
  rule: AttributeWithId;
  conditionLogic: string | undefined;
  ruleMetadata: {
    controlOptions: Array<string>;
    variables: any; // TODO: fix
  };
  handleDelete: () => void;
  ruleLogic: SetterGetter;
}) {
  return (
    <div className="rule">
      <div className="rule__head">
        <div className="rule__head__type">
          <div className="type__icon">
            <Icon name={returnTypeIcon(rule.type)} />
          </div>
          <h5>{rule.type}</h5>
        </div>
        <div className="rule__head__name">
          <h5>{snakeCaseToTitleCase(rule.name)}</h5>
          <button className="default" onClick={handleDelete}>
            <Icon name="trash alternate" />
          </button>
        </div>
      </div>
      <div className="rule__body">
        <span className="custom-select">
          <select
            value={ruleLogic.value.condition}
            onChange={(e) =>
              ruleLogic.setter({
                condition: e.target.value,
                flag: "condition",
              })
            }
          >
            <option disabled value="">
              Please select
            </option>
            {Array.isArray(ruleMetadata.controlOptions) &&
              ruleMetadata.controlOptions.length > 0 &&
              ruleMetadata.controlOptions.map(
                (option: string, index: number) => (
                  <option key={`${option}-${index}`} value={option}>
                    {snakeCaseToTitleCase(option)}
                  </option>
                )
              )}
          </select>
        </span>
        <span style={{ marginLeft: 5 }}>
          {
            <>
              {rule.type === "alphabetical" && (
                <AlphaInput setter={ruleLogic.setter} />
              )}
              {rule.type === "select" && (
                <CustomSelect
                  options={ruleMetadata.variables[rule.name]}
                  setter={ruleLogic.setter}
                />
              )}

              {rule.type === "numeric" && (
                <RangeSlider
                  setter={ruleLogic.setter}
                  min={ruleMetadata.variables[rule.name][0]}
                  max={ruleMetadata.variables[rule.name][1]}
                />
              )}

              {rule.type === "datetime" && (
                <DateSlider
                  setter={ruleLogic.setter}
                  minDate={ruleMetadata.variables[rule.name][0]}
                  maxDate={ruleMetadata.variables[rule.name][1]}
                />
              )}

              {rule.type === "boolean" && null}
            </>
          }
        </span>
      </div>
      <div className="rule__append">
        <span>{conditionLogic}</span>
      </div>
    </div>
  );
}
