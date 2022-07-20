import { useState, useMemo, useEffect } from "react";
import {
  DonutTotals,
  DonutValue,
  DonutValuesHashmap,
  DonutState,
} from "../../models/donut";
import DonutChartView from "./view";

const pi = 3.14159265359;
export default function DonutChartController({
  values,
  max,
  size,
  itemLabel,
}: {
  values: Array<DonutValue>;
  max: number;
  size: number;
  itemLabel: string;
}) {
  const [stateLoaded, setStateLoaded] = useState(false);
  const [focusedValue, setFocusedValue] = useState<DonutState | null>(null);

  const donutValuesState: DonutValuesHashmap = useMemo(
    () => initializeDonutState({ values, max, size }),
    [values]
  );
  const donutValuesTotal: DonutTotals = useMemo(
    () => computeDonutTotals(),
    [donutValuesState]
  );

  function initializeDonutState({
    values,
    max,
    size,
  }: {
    values: Array<DonutValue>;
    max: number;
    size: number;
  }) {
    setFocusedValue(null);
    let _state: DonutValuesHashmap = {};
    let total: number = values.map((v) => v.num).reduce((sum, a) => sum + a, 0);

    let _values = [
      ...values,
      {
        num: max - total,
        color: "#dddddd",
        key: "excluded",
        label: "Excluded",
      },
    ];

    _values.forEach((value, index) => {
      let radius = size * 0.375;
      let circumference = 2 * pi * radius;
      let percentage = (value.num / max) * 100;
      let initialStrokeDasharray = `${circumference}, ${circumference}`;
      let computedStrokeDasharray = `${(2 * pi * radius * percentage) / 100} ${
        2 * pi * radius * (1 - percentage / 100)
      }`;

      let rotateValue = -90;
      for (let i = 0; i < index; i++) {
        rotateValue = rotateValue + ((_values[i].num / max) * 100 * 360) / 100;
      }

      _state[value.key] = {
        ...value,
        radius,
        circumference,
        percentage,
        rotate: rotateValue,
        initialStrokeDasharray,
        computedStrokeDasharray,
      };
    });
    return _state;
  }

  function computeDonutTotals() {
    let total: number = values.map((v) => v.num).reduce((sum, a) => sum + a, 0);
    let totalPercentage: number = (total / max) * 100;

    return {
      totalNumber: total,
      totalPercentage,
    };
  }

  useEffect(() => {
    setTimeout(() => setStateLoaded(true), 500);
  }, [donutValuesState]);

  return (
    <DonutChartView
      values={donutValuesState}
      totals={donutValuesTotal}
      max={max}
      size={size}
      loaded={stateLoaded}
      itemLabel={itemLabel}
      focused={{
        value: focusedValue,
        setter: setFocusedValue,
      }}
    />
  );
}
