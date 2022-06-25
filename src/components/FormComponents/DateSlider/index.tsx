import moment from "moment";
import React, { useEffect, useState } from "react";
import DateSliderView from "./view";
import { isDate } from "../../../utility";

export default function DateSliderController({
  minDate,
  maxDate,
}: {
  minDate: string;
  maxDate: string;
}) {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [daysBetweenDates, setDaysBetweenDates] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>(minDate);

  // when minDate, and maxDate initializes, count the days between.
  useEffect(() => {
    if (isDate(minDate) && isDate(maxDate)) {
      try {
        let start = moment(minDate),
          end = moment(maxDate);

        let daysBetween = end.diff(start, "days");
        setDaysBetweenDates(daysBetween);
      } catch (error) {
        console.log(error);
      }
    }
  }, [minDate, maxDate]);

  useEffect(() => {
    if (daysBetweenDates !== 0) {
      let daysToIncrease = daysBetweenDates * (sliderValue * 0.01);
      let newDate = moment(minDate)
        .add(daysToIncrease, "days")
        .format("YYYY-MM-DD");

      if (currentDate !== newDate) setCurrentDate(newDate);
    }
  }, [sliderValue]);

  useEffect(() => {
    let start = moment(minDate),
      end = moment(currentDate);

    let daysBetween = end.diff(start, "days");

    let percentageOfTotalDays = Math.round(
      (daysBetween / daysBetweenDates) * 100
    );

    if (sliderValue !== percentageOfTotalDays)
      setSliderValue(percentageOfTotalDays);
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
