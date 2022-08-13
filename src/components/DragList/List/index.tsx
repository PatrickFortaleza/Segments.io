import { useState } from "react";
import { Attribute } from "../../../models/attributes";
import ListView from "./view";

export default function ListViewController({
  attributes,
  type,
}: {
  attributes: Array<Attribute>;
  type: string;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <ListView
      attributes={attributes}
      type={type}
      expanded={{
        value: expanded,
        setter: setExpanded,
      }}
    />
  );
}
