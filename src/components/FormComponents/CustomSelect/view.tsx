import React from "react";
import { SetterGetter } from "../../../models";
import { capitalizeFirstLetter } from "../../../utility";

export default function CustomSelectView({
  options,
  selected,
}: {
  options: Array<string>;
  selected: SetterGetter;
}) {
  return (
    <span className="custom-select">
      <select
        value={selected.value}
        onChange={(e) => selected.setter(e.target.value)}
      >
        <option value="" disabled>
          Please select...
        </option>
        {options.map((option: string, index: number) => (
          <option
            key={`${option}-${index}`}
            value={option}
            style={{ textTransform: "capitalize" }}
          >
            {capitalizeFirstLetter(option)}
          </option>
        ))}
      </select>
    </span>
  );
}
