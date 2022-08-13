import { Icon } from "semantic-ui-react";
import { SetterGetter } from "../../../models";
import DragListItem from "../DragListItem";
import { Attribute } from "../../../models/attributes";

export default function ListView({
  attributes,
  expanded,
  type,
}: {
  attributes: Array<Attribute>;
  expanded: SetterGetter;
  type: string;
}) {
  return (
    <div className="drag__list__container">
      <div className="drag__list__container__header">
        <button
          className="base drag__list__container__header__title"
          onClick={() => expanded.setter(!expanded.value)}
        >
          <Icon name={`chevron ${expanded.value ? "up" : "down"}`} />

          <h2>{type.toUpperCase()}</h2>
          <span>{attributes.length}</span>
        </button>
      </div>
      <ul className={`drag__list ${expanded.value ? "expanded" : "collapsed"}`}>
        {attributes.map((attribute, index) => (
          <DragListItem
            key={index}
            item={{
              type: type,
              name: attribute.toString(),
            }}
          />)
          )}
      </ul>
    </div>
  );
}
