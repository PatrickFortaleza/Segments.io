import React, { LegacyRef } from "react";
import { Attribute } from "../../../models/attributes";
import ListItem from "../ListItem";
import { Coordinates, DragTransition } from "../../../models/positioning";

export default function DragListItemView({
  item,
  itemRef,
  pos,
  is,
}: {
  item: Attribute;
  itemRef: LegacyRef<HTMLDivElement> | undefined;
  pos: Coordinates;
  is: DragTransition;
}) {
  return (
    <li
      style={{
        zIndex: is.dragging ? "900" : "500",
      }}
    >
      <div className={`drag__list__item list placeholder`}>
        <ListItem item={item} />
      </div>

      <div
        className={`drag__list__item list`}
        ref={itemRef}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: is.transitioning ? "0.75s ease-in-out" : "unset",
        }}
      >
        <ListItem item={item} />
      </div>
    </li>
  );
}
