import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import DateSliderView from "./view";
import { isDate } from "../../../utility";

export default function DateSliderController({
  minDate,
  maxDate,
  setter,
}: {
  minDate: string;
  maxDate: string;
  setter: (value: string) => void;
}) {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [daysBetweenDates, setDaysBetweenDates] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>(minDate);

  // when minDate, and maxDate initializes, count the days between.
  useEffect(() => {
    if (isDate(minDate) && isDate(maxDate)) {
      try {
        let start: Moment = moment(minDate),
          end: Moment = moment(maxDate);

        let daysBetween = end.diff(start, "days");
        setDaysBetweenDates(daysBetween);
      } catch (error) {
        console.log(error);
      }
    }
  }, [minDate, maxDate]);

  useEffect(() => {
    if (daysBetweenDates !== 0) {
      let daysToIncrease: number = daysBetweenDates * (sliderValue * 0.01);
      let newDate: string = moment(minDate)
        .add(daysToIncrease, "days")
        .format("YYYY-MM-DD");

      if (currentDate !== newDate) setCurrentDate(newDate);
    }
  }, [sliderValue]);

  useEffect(() => {
    if (isDate(minDate) && isDate(currentDate)) {
      let start: Moment = moment(minDate),
        end: Moment = moment(currentDate);

      let daysBetween: number = end.diff(start, "days");

      if (daysBetween > 0 && daysBetweenDates > 0) {
        let percentageOfTotalDays: number = Math.round(
          (daysBetween / daysBetweenDates) * 100
        );

        if (sliderValue !== percentageOfTotalDays)
          setSliderValue(percentageOfTotalDays);
      } else {
        if (sliderValue !== 0) setSliderValue(0);
      }
    }

    setter(currentDate);
  }, [currentDate]);

  return (
    <DateSliderView
      slider={{
        value: sliderValue,
        setter: setSliderValue,
      }}
      currentDate={{
        value: currentDate,
        setter: setCurrentDate,
      }}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
