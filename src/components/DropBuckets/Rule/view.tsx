import { returnTypeIcon } from "../../../data/attributes";
import { Icon } from "semantic-ui-react";
import { snakeCaseToTitleCase } from "../../../utility";
import RangeSlider from "../../FormComponents/RangeSlider";
import DateSlider from "../../FormComponents/DateSlider";
import AlphaInput from "../../FormComponents/AlphaInput";
import CustomSelect from "../../FormComponents/CustomSelect";
import { Rule } from "../../../models/rule";
import { useDispatch } from "react-redux";
import { updateRule, deleteRule } from "../../../redux/actions/entity";

export default function RuleView({
  rule,
  conditionOperator,
  ruleMetadata,
}: {
  rule: Rule;
  conditionOperator: string | undefined;
  ruleMetadata: {
    controlOptions: Array<string>;
    variables: any; // TODO: fix
  };
}) {
  const dispatch = useDispatch();
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
          <button
            className="default"
            onClick={() =>
              dispatch(
                deleteRule({
                  ruleId: rule.id,
                })
              )
            }
          >
            <Icon name="trash alternate" />
          </button>
        </div>
      </div>
      <div className="rule__body">
        <span className="custom-select">
          <select
            value={rule.equation}
            onChange={(e) =>
              rule.type === "boolean"
                ? dispatch(
                    updateRule({
                      ruleId: rule.id,
                      equation: e.target.value,
                      value: e.target.value === "is_true",
                    })
                  )
                : dispatch(
                    updateRule({
                      ruleId: rule.id,
                      equation: e.target.value,
                      value: rule?.value,
                    })
                  )
            }
          >
            <option disabled value="">
              Please select...
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
        <span style={{ marginLeft: 5, marginRight: 5 }}>
          {
            <>
              {rule.type === "alphabetical" && (
                <AlphaInput
                  setter={(value: string) =>
                    dispatch(
                      updateRule({
                        ruleId: rule.id,
                        equation: rule?.equation,
                        value: value,
                      })
                    )
                  }
                />
              )}
              {rule.type === "select" && (
                <CustomSelect
                  options={ruleMetadata.variables[rule.name]}
                  setter={(value: string) =>
                    dispatch(
                      updateRule({
                        ruleId: rule.id,
                        equation: rule?.equation,
                        value: value,
                      })
                    )
                  }
                />
              )}

              {rule.type === "numeric" && (
                <RangeSlider
                  setter={(value: number) =>
                    dispatch(
                      updateRule({
                        ruleId: rule.id,
                        equation: rule?.equation,
                        value: value,
                      })
                    )
                  }
                  min={ruleMetadata.variables[rule.name][0]}
                  max={ruleMetadata.variables[rule.name][1]}
                />
              )}

              {rule.type === "datetime" && (
                <DateSlider
                  setter={(value: string) =>
                    dispatch(
                      updateRule({
                        ruleId: rule.id,
                        equation: rule?.equation,
                        value: value,
                      })
                    )
                  }
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
        <span>{conditionOperator}</span>
      </div>
    </div>
  );
}
