import { useState, useEffect } from "react";
import { AttributeWithId } from "../../../models/attributes";
import RuleView from "./view";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRuleFromBucket,
  updateRuleLogic,
} from "../../../redux/actions/bucket";
import { Rule } from "../../../models/rule";

interface RuleLogic {
  condition: string;
  value: string | number | boolean | undefined;
}

export default function RuleController({
  rule,
  conditionOperator,
}: {
  rule: Rule;
  conditionOperator: string | undefined;
}) {
  const [ruleLogic, setRuleLogic] = useState<RuleLogic>({
    condition: "",
    value: undefined,
  });

  const dispatch = useDispatch();
  const ruleMetadata = useSelector((state: any) => state.attributes[rule.type]);

  const changeRuleLogic = ({
    condition,
    value,
    flag,
  }: {
    condition: string;
    value: string | boolean | undefined;
    flag: string;
  }) => {
    if (flag === "condition") {
      if (rule.type === "boolean") {
        condition === "is_true"
          ? setRuleLogic({ value: true, condition: condition })
          : setRuleLogic({ value: false, condition: condition });
      } else {
        setRuleLogic({ ...ruleLogic, condition: condition });
      }
    }

    if (flag === "value") setRuleLogic({ ...ruleLogic, value: value });
  };

  return (
    <RuleView
      rule={rule}
      conditionOperator={conditionOperator}
      ruleMetadata={ruleMetadata}
      ruleLogic={{
        value: ruleLogic,
        setter: changeRuleLogic,
      }}
    />
  );
}
