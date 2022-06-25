import React, { useState } from "react";
import AlphaInputView from "./view";

export default function AlphaInputController() {
  const [value, setValue] = useState<string>("");

  const cleanValue = (string: string) => {
    setValue(string.replace(/[^a-zA-Z0-9 -]/, ""));
  };

  return (
    <AlphaInputView
      value={{
        value: value,
        setter: cleanValue,
      }}
    />
  );
}
