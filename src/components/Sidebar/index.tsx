import React, { useEffect, useState } from "react";
import SidebarView from "./view";
import { attributes, returnAttributeType } from "../../data/attributes";
import { GroupedAttributes } from "../../models/attributes";

export default function SidebarController(): JSX.Element {
  const [groupedAttributes, setGroupedAttributes] =
    useState<GroupedAttributes | null>(null);

  useEffect(() => {
    let attributes_ = [...attributes],
      groupedAttributes_ = {} as GroupedAttributes;

    for (let i = 0; i < attributes_.length; i++) {
      let typeKey = returnAttributeType({ attribute: attributes_[i] });
      if (typeKey && typeKey in groupedAttributes_) {
        groupedAttributes_[typeKey as keyof GroupedAttributes].push(
          attributes_[i]
        );
      } else {
        groupedAttributes_[typeKey as keyof GroupedAttributes] = [
          attributes_[i],
        ];
      }
    }

    setGroupedAttributes(groupedAttributes_);
  }, []);

  return <SidebarView groupedAttributes={groupedAttributes} />;
}
