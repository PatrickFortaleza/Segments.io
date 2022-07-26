import React, { useState, useEffect } from "react";
import RangeSliderView from "./view";

export default function RangeSliderController({
  max,
  min,
  setter,
  defaultValue,
}: {
  max: number;
  min: number;
  setter: (value: number) => void;
  defaultValue: number | undefined;
}) {
  const [sliderValue, setSliderValue] = useState<number>(defaultValue ?? min);

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
