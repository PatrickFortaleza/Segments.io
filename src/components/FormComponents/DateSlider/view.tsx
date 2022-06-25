import React from "react";
import { SetterGetter } from "../../../models";

export default function DateSliderView({
  slider,
  currentDate,
  minDate,
  maxDate,
}: {
  slider: SetterGetter;
  currentDate: SetterGetter;
  minDate: string;
  maxDate: string;
}) {
  return (
    <span className="custom__range">
      <span className="custom__range__input">
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={currentDate.value}
          onChange={(e) => currentDate.setter(e.target.value)}
        />
      </span>
      <span className="custom__range__slider">
        <input
          type="range"
          min={0}
          max={100}
          value={`${slider.value}`}
          onChange={(e) => slider.setter(+e.target.value)}
        />
      </span>
    </span>
  );
}
