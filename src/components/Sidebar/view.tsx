import React from "react";
import { GroupedAttributes } from "../../models/attributes";
import DragList from "../DragList";
import SidebarHeader from "./Header";

export default function SidebarView({
  groupedAttributes,
}: {
  groupedAttributes: GroupedAttributes | null;
}) {
  return (
    <aside>
      <SidebarHeader />
      <DragList groupedAttributes={groupedAttributes} />
    </aside>
  );
}
