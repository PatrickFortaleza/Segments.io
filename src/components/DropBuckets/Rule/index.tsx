import RuleView from "./view";
import { useSelector } from "react-redux";
import { Rule } from "../../../models/rule";

export default function RuleController({
  rule,
  conditionOperator,
}: {
  rule: Rule;
  conditionOperator: string | undefined;
}) {
  const ruleMetadata = useSelector((state: any) => state.attributes[rule.type]);

  return (
    <RuleView
      rule={rule}
      conditionOperator={conditionOperator}
      ruleMetadata={ruleMetadata}
    />
  );
}
