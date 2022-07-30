import React from "react";
import { Icon } from "semantic-ui-react";

export default function SidebarHeader() {
  return (
    <header className="sidebar">
      <div className="sidebar__wrap">
        <div>
          <span className="sidebar__header__icon">
            <Icon name="bolt" />
          </span>
        </div>
        <div>
          <h3>Rule Filters</h3>
          <span>
            Drag-and-drop the rules below to apply filters for your segment.
          </span>
        </div>
      </div>
    </header>
  );
}
