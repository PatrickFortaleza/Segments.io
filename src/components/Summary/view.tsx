import { useMemo } from "react";
import { Icon } from "semantic-ui-react";
import EditableLabel from "../FormComponents/EditableLabel";
import DonutChart from "../DonutChart";
import { kFormatter } from "../../utility";
import { useDispatch } from "react-redux";
import {
  updateSegmentDescription,
  updateSegmentTitle,
} from "../../redux/actions/users";

export default function SummaryView({
  chartValues,
  segmentTitle,
  segmentDescription,
}: {
  chartValues: {
    max: number;
    segment: number;
  };
  segmentTitle: string;
  segmentDescription: string;
}) {
  const dispatch = useDispatch();
  const values = useMemo(() => {
    return [
      {
        num: chartValues.segment,
        color: "var(--highlight-primary-2)",
        key: "segment",
        label: "Segment",
      },
    ];
  }, [chartValues]);

  return (
    <div className="summary">
      <div className="summary__container">
        <div className="summary__section header">
          <EditableLabel
            label={segmentTitle}
            emitValue={(value) => dispatch(updateSegmentTitle(value))}
          />

          <div className="fieldset">
            <label>Description (optional)</label>
            <textarea
              value={segmentDescription}
              onChange={(e) =>
                dispatch(updateSegmentDescription(e.target.value))
              }
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
              name="address card"
              style={{
                color: "var(--highlight-primary-2)",
                padding: 0,
                margin: 0,
              }}
            />
            &nbsp;
            {kFormatter(chartValues.segment)}
          </h2>
          <p>
            {((chartValues.segment / chartValues.max) * 100).toFixed(1)}% of
            total individuals in the segment
          </p>
        </div>
        <div className="summary__section chart">
          <DonutChart
            values={values}
            max={chartValues.max}
            size={225}
            itemLabel={"Individuals"}
          />
        </div>
      </div>
    </div>
  );
}
