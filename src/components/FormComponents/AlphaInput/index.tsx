import React, { useState, useEffect } from "react";
import AlphaInputView from "./view";

export default function AlphaInputController({
  setter,
  defaultValue,
}: {
  setter: (value: string) => void;
  defaultValue: string | undefined;
}) {
  const [value, setValue] = useState<string>(defaultValue ?? "");

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
