import React from "react";
import { Icon } from "semantic-ui-react";

export default function SummaryView() {
  return (
    <div className="summary">
      <div className="summary__section">
        <button onClick={() => console.log("change editing state")}>
          <Icon name="edit" />
        </button>
        <form
          onClick={() => console.log("set editing label")}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            ref={null}
            type="text"
            value={"Untitled Segment"}
            onChange={(e) => console.log("change title")}
            className={`${false ? "editing" : ""}`}
            readOnly={true ? false : true}
            disabled={false ? false : true}
          />
        </form>
      </div>
      <div className="summary__section">
        <h3>Summary</h3>
        <h4>Individuals in this segment</h4>
        <h2>1.4k</h2>
        <p>100% of total individuals in the segment</p>
      </div>
      <div className="summary__section legend">
        <button>
          <span className="legend__item">
            <span className="legend__item__icon" />
            <span className="legend__item__label">
              <h3>Total Market</h3>
              <p>1,000 Individuals</p>
            </span>
          </span>
        </button>

        <button>
          <span className="legend__item">
            <span className="legend__item__icon" />
            <span className="legend__item__label">
              <h3>Market Segment</h3>
              <p>1,000 Individuals</p>
            </span>
          </span>
        </button>
      </div>
      <div className="summary__section chart">
        <div className="chart__container">
          <div className="chart__circle">
            <div className="chart__circle inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
