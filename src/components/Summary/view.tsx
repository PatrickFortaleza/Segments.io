import React from "react";
import { Icon } from "semantic-ui-react";
import EditableLabel from "../FormComponents/EditableLabel";
import DonutChart from "../DonutChart";
import { DonutValue } from "../../models/donut";

export default function SummaryView() {
  return (
    <div className="summary">
      <div className="summary__container">
        <div className="summary__section header">
          <EditableLabel
            label={"Untitled segment"}
            emitValue={(value) => console.log(value)}
          />

          <div className="fieldset">
            <label>Description (optional)</label>
            <textarea
              rows={4}
              placeholder="Please describe your segment, or leave blank."
            ></textarea>
          </div>
        </div>
        <div className="summary__section">
          <h3>Summary</h3>
          <h4>Individuals in this segment</h4>
          <h2>
            <Icon
              name="address book"
              style={{
                color: "var(--highlight-primary-1)",
                padding: 0,
                margin: 0,
              }}
            />
            1.4k
          </h2>
          <p>100% of total individuals in the segment</p>
        </div>
        <div className="summary__section chart">
          <DonutChart
            values={values}
            max={max}
            size={size}
            itemLabel={itemLabel}
          />
        </div>
      </div>
    </div>
  );
}

const itemLabel: string = "users";
const size: number = 250;
const max: number = 1420;
const values: Array<DonutValue> = [
  {
    num: 420,
    color: "var(--highlight-primary-1)",
    key: "segment",
    label: "Segment",
  },
];
