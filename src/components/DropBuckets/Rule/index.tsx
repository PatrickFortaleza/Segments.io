import React from "react";
import { AttributeWithId } from "../../../models/attributes";
import RuleView from "./view";

export default function RuleController({ rule }: { rule: AttributeWithId }) {
  return <RuleView rule={rule} />;
}
