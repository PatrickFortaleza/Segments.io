import React from "react";
import { SetterGetter } from "../../../models";
import { capitalizeFirstLetter } from "../../../utility";

export default function BaseSelectView({
  options,
  selected,
  placeholder,
  disabled,
}: {
  options: Array<string>;
  selected: SetterGetter;
  placeholder: string;
  disabled: boolean;
}) {
  return (
    <span className={`custom-select base ${disabled ? "disabled" : "enabled"}`}>
      <select
        value={selected?.value || ""}
        disabled={disabled}
        onChange={(e) => selected.setter(e.target.value)}
      >
        <option value="" disabled>
          {placeholder ? placeholder : "Please select..."}
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
