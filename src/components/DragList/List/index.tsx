import { useState } from "react";
import { Attribute } from "../../../models/attributes";
import ListView from "./view";
import { useSelector } from "react-redux";

export default function ListViewController({
  attributes,
  type,
}: {
  attributes: Array<Attribute>;
  type: string;
}) {
  const isDragging = useSelector((state: any) => state.dragReducer.isDragging);
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <ListView
      isDragging={isDragging}
      attributes={attributes}
      type={type}
      expanded={{
        value: expanded,
        setter: setExpanded,
      }}
    />
  );
}
