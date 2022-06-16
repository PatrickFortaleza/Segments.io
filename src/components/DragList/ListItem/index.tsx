import React from "react";
import { Attribute } from "../../../models/attributes";
import { snakeCaseToTitleCase } from "../../../utility";
import { Icon, SemanticICONS } from "semantic-ui-react";

export default function ListItem({ item }: { item: Attribute }) {
  return (
    <div className={`drag__list__item__rule`}>
      <div className="drag__list__item__icon">
        <Icon name={returnTypeIcon(item.type)} />
      </div>
      <p>
        <span className="type">{item.type}</span>
        {snakeCaseToTitleCase(item.name)}
      </p>

      <div className="drag__list__item__icon__secondary">
        <Icon name="indent" />
      </div>
    </div>
  );
}

function returnTypeIcon(type: string): SemanticICONS {
  switch (type) {
    case "alphabetical":
      return "sort alphabet down";
    case "select":
      return "list ol";
    case "datetime":
      return "calendar outline";
    case "numeric":
      return "sort numeric down";
    case "boolean":
      return "question";
    default:
      return "question";
  }
}
