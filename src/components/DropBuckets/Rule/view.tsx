import React from "react";
import { AttributeWithId } from "../../../models/attributes";
import { returnTypeIcon } from "../../../data/attributes";
import { Icon } from "semantic-ui-react";
import { snakeCaseToTitleCase } from "../../../utility";

export default function RuleView({
  rule,
  conditionLogic,
}: {
  rule: AttributeWithId;
  conditionLogic: string | undefined;
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
          <button className="default">
            <Icon name="trash alternate" />
          </button>
        </div>
      </div>
      <div className="rule__body"></div>
      <div className="rule__append">
        <span>{conditionLogic}</span>
      </div>
    </div>
  );
}
