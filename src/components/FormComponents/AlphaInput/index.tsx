import React, { useState, useEffect } from "react";
import AlphaInputView from "./view";

export default function AlphaInputController({
  setter,
}: {
  setter: (value: string) => void;
}) {
  const [value, setValue] = useState<string>("");

  const cleanValue = (string: string) => {
    setValue(string.replace(/[^a-zA-Z0-9 -]/, ""));
  };

  useEffect(() => {
    setter(value);
  }, [value]);

  return (
    <AlphaInputView
      value={{
        value: value,
        setter: cleanValue,
      }}
    />
  );
}
