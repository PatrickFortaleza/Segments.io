import React from "react";
import { AttributeWithId } from "../../../models/attributes";
import RuleView from "./view";
import { useSelector } from "react-redux";

export default function RuleController({
  rule,
  conditionLogic,
}: {
  rule: AttributeWithId;
  conditionLogic: string | undefined;
}) {
  const ruleMetadata = useSelector(
    (state: any) => state.attributeReducer[rule.type]
  );

  return (
    <RuleView
      rule={rule}
      conditionLogic={conditionLogic}
      ruleMetadata={ruleMetadata}
    />
  );
}
