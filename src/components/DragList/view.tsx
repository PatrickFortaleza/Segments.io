import React, { LegacyRef } from "react";
import { GroupedAttributes } from "../../models/attributes";
import { SetterGetter } from "../../models";
import List from "./List";

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
  expanded: SetterGetter;
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
                <List attributes={attributes} type={type} />
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
