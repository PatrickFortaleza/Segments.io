import React from "react";
import { GroupedAttributes } from "../../models/attributes";
import { snakeCaseToTitleCase } from "../../utility";

export default function SidebarView({
  groupedAttributes,
}: {
  groupedAttributes: GroupedAttributes;
}) {
  return (
    <aside>
      {Object.keys(groupedAttributes) &&
        Object.keys(groupedAttributes).length > 0 &&
        Object.entries(groupedAttributes).map(([type, attributes], index) => (
          <React.Fragment key={index}>
            {Array.isArray(attributes) && attributes.length > 0 && (
              <div>
                <h2>{type.toUpperCase()}</h2>
                <ul>
                  {attributes.map((attribute, index) => (
                    <li key={index}>{snakeCaseToTitleCase(attribute)}</li>
                  ))}
                </ul>
              </div>
            )}
          </React.Fragment>
        ))}
    </aside>
  );
}
