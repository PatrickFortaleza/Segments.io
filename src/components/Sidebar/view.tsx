import React from "react";
import { GroupedAttributes } from "../../models/attributes";
import { snakeCaseToTitleCase } from "../../utility";
import DragListItem from "../DragList/DragListItem";

export default function SidebarView({
  groupedAttributes,
}: {
  groupedAttributes: GroupedAttributes | null;
}) {
  return (
    <aside>
      {groupedAttributes &&
        Object.keys(groupedAttributes) &&
        Object.keys(groupedAttributes).length > 0 &&
        Object.entries(groupedAttributes).map(([type, attributes], index) => (
          <React.Fragment key={index}>
            {Array.isArray(attributes) && attributes.length > 0 && (
              <div>
                <h2>{type.toUpperCase()}</h2>
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
    </aside>
  );
}
