import React, { LegacyRef } from "react";
import { GroupedAttributes } from "../../../models/attributes";
import DragListItem from "../DragListItem";

export default function DragList({
  groupedAttributes,
  isDragging,
  scrollBoxRef,
  scrollPos,
}: {
  groupedAttributes: GroupedAttributes | null;
  isDragging: boolean;
  scrollBoxRef: LegacyRef<HTMLDivElement>;
  scrollPos: number;
}) {
  return (
    <div
      ref={scrollBoxRef}
      style={isDragging ? { transform: `translateY(-${scrollPos}px)` } : {}}
      className={`drag__list__bar__wrap ${isDragging ? "dragging" : ""}`}
    >
      <div className="drag__list__bar">
        {groupedAttributes &&
          Object.keys(groupedAttributes) &&
          Object.keys(groupedAttributes).length > 0 &&
          Object.entries(groupedAttributes).map(([type, attributes], index) => (
            <React.Fragment key={index}>
              {Array.isArray(attributes) && attributes.length > 0 && (
                <div className="drag__list__container">
                  <div className="drag__list__container__header">
                    <span className="drag__list__container__header__title">
                      <h2>{type.toUpperCase()}</h2>
                      <span>{attributes.length}</span>
                    </span>
                  </div>
                  <ul className="drag__list">
                    {attributes.map((attribute, index) => (
                      <DragListItem
                        key={index}
                        item={{
                          type: type,
                          name: attribute,
                        }}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
