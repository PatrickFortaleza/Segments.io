import React from "react";
import { SetterGetter } from "../../../models";

export default function AlphaInputView({ value }: { value: SetterGetter }) {
  return (
    <input
      className="custom"
      type="text"
      value={value.value}
      onChange={(e) => value.setter(e.target.value)}
      placeholder="start typing..."
      pattern={"[A-Za-z]"}
    />
  );
}
