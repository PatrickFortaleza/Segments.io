import React from "react";
import { Icon } from "semantic-ui-react";

export default function SidebarHeader() {
  return (
    <header className="sidebar">
      <div className="sidebar__wrap">
        <div>
          <span className="sidebar__header__icon">
            <Icon name="address book" />
          </span>
        </div>
        <div>
          <h3>Market Attributes</h3>
          <span>Select attributes below to begin segmenting the market.</span>
        </div>
      </div>
    </header>
  );
}
