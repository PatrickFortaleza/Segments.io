import React, { useState, useEffect } from "react";
import RangeSliderView from "./view";

export default function RangeSliderController({
  max,
  min,
  setter,
}: {
  max: number;
  min: number;
  setter: (value: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState<number>(min);

  useEffect(() => {
    setter(sliderValue);
  }, [sliderValue]);

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
