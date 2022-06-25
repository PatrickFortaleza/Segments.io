import React, { useState, useEffect } from "react";
import RangeSliderView from "./view";

export default function RangeSliderController({
  max,
  min,
}: {
  max: number;
  min: number;
}) {
  const [sliderValue, setSliderValue] = useState<number>(min);

  return (
    <RangeSliderView
      max={+max}
      min={+min}
      slider={{
        value: sliderValue,
        setter: setSliderValue,
      }}
    />
  );
}
