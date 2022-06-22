import React from "react";
import { Attribute } from "../../../models/attributes";
import { snakeCaseToTitleCase } from "../../../utility";
import { Icon } from "semantic-ui-react";
import { returnTypeIcon } from "../../../data/attributes";

export default function ListItem({ item }: { item: Attribute }) {
  return (
    <div className={`drag__list__item__rule`}>
      <div className="type__icon">
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
