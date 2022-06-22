import React from "react";
import { AttributeWithId } from "../../../models/attributes";

export default function RuleView({ rule }: { rule: AttributeWithId }) {
  return <div>{rule.name}</div>;
}
