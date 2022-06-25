import React, { useState, useEffect } from "react";
import RangeSliderView from "./view";

export default function RangeSliderController({
  max,
  min,
  setter,
}: {
  max: number;
  min: number;
  setter: ({ value, flag }: { value: number; flag: string }) => void;
}) {
  const [sliderValue, setSliderValue] = useState<number>(min);

  useEffect(() => {
    setter({
      value: sliderValue,
      flag: "value",
    });
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
