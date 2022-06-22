import React from "react";
import { AttributeWithId } from "../../../models/attributes";
import RuleView from "./view";

export default function RuleController({
  rule,
  conditionLogic,
}: {
  rule: AttributeWithId;
  conditionLogic: string | undefined;
}) {
  return <RuleView rule={rule} conditionLogic={conditionLogic} />;
}
