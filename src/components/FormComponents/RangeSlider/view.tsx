import React from "react";
import { SetterGetter } from "../../../models";

export default function RangeSliderView({
  max,
  min,
  slider,
}: {
  max: number;
  min: number;
  slider: SetterGetter;
}) {
  return (
    <span className="custom__range">
      <span className="custom__range__input">
        <input
          type="number"
          min={0}
          max={`${max}`}
          value={slider.value}
          onChange={(e) => {
            let n = +e.target.value;
            n || n >= min
              ? n > max
                ? slider.setter(max)
                : slider.setter(n)
              : slider.setter(0);
          }}
        />
      </span>
      <span className="custom__range__slider">
        <input
          type="range"
          min={0}
          max={`${max}`}
          value={`${slider.value}`}
          onChange={(e) => slider.setter(e.target.value)}
        />
      </span>
    </span>
  );
}
