import { DonutTotals, DonutValuesHashmap } from "../../models/donut";
import { Icon } from "semantic-ui-react";

interface SetterGetter {
  value: any;
  setter: (variable: any) => any;
}

export default function DonutChartView({
  values,
  totals,
  max,
  size,
  loaded,
  itemLabel,
  focused,
}: {
  values: DonutValuesHashmap;
  totals: DonutTotals;
  max: number;
  size: number;
  loaded: boolean;
  itemLabel: string;
  focused: SetterGetter;
}) {
  return (
    <div className="donut__chart">
      <div className="donut__chart__legend">
        {values &&
          Object.values(values).map((circle) => (
            <button
              onMouseLeave={() => focused.setter(null)}
              onClick={() => focused.setter(circle)}
              onMouseOver={() => focused.setter(circle)}
              className={`legend__item ${
                focused.value && focused.value.key === circle.key
                  ? "active"
                  : "inactive"
              }`}
              key={`${circle.key}-${circle.num}`}
            >
              <div
                className="legend__item__icon"
                style={{ background: circle.color }}
              />
              <label>
                <h5>{numberWithCommas(circle.num)}</h5>
                <span>{circle.label}</span>
              </label>
            </button>
          ))}
      </div>
      <div
        onMouseLeave={() => focused.setter(null)}
        className="donut__chart__container"
        style={{
          width: size,
          height: size,
        }}
      >
        <div className="donut__chart__center">
          <div>
            {!focused.value ? (
              <>
                <label>Total</label>
                <h3>
                  {totals.totalPercentage.toFixed(1)}
                  <sup>%</sup>
                </h3>
                <h4>
                  {numberWithCommas(totals.totalNumber)} out of{" "}
                  {numberWithCommas(max)}
                </h4>
                <p>
                  <Icon
                    name="address book"
                    style={{
                      padding: 0,
                      margin: 0,
                      fontSize: 9,
                    }}
                  />
                  {itemLabel}
                </p>
              </>
            ) : (
              <>
                <label>{focused.value.label}</label>
                <h3>
                  {focused.value.percentage.toFixed(1)}
                  <sup>%</sup>
                </h3>
                <h4>
                  {numberWithCommas(focused.value.num)} out of{" "}
                  {numberWithCommas(max)}
                </h4>
                <p>
                  <Icon
                    name="address book"
                    style={{
                      padding: 0,
                      margin: 0,
                      fontSize: 9,
                    }}
                  />
                  {itemLabel}
                </p>
              </>
            )}
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg">
          {values &&
            Object.values(values)
              .reverse()
              .map((circle) => {
                return (
                  <circle
                    style={{
                      transform: `rotateZ(${circle.rotate}deg)`,
                      strokeDasharray: loaded
                        ? circle.computedStrokeDasharray
                        : circle.initialStrokeDasharray,
                    }}
                    key={`${circle.key}-${circle.num}`}
                    strokeWidth={
                      focused.value && focused.value.key === circle.key
                        ? size * 0.07
                        : size * 0.05
                    }
                    className="donut"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={circle.radius}
                    stroke={circle.color}
                    onClick={() => focused.setter(circle)}
                    onMouseOver={() => focused.setter(circle)}
                  />
                );
              })}
        </svg>
      </div>
    </div>
  );
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
