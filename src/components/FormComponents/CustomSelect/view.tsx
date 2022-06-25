import React from "react";

export default function CustomSelectView({
  options,
}: {
  options: Array<string>;
}) {
  return (
    <span className="custom-select">
      <select>
        {options.map((option: string, index: number) => (
          <option
            key={`${option}-${index}`}
            value={option}
            style={{ textTransform: "capitalize" }}
          >
            {option}
          </option>
        ))}
      </select>
    </span>
  );
}
