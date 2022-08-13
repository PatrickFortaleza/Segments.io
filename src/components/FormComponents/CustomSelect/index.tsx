import React, { useEffect, useState } from "react";
import CustomSelectView from "./view";

export default function CustomSelectController({
  options,
  setter,
  defaultValue,
}: {
  options: Array<string>;
  setter: (value: string) => void;
  defaultValue: string | undefined;
}) {
  const [selected, setSelected] = useState<string>(defaultValue ?? "");

  useEffect(() => {
    setter(selected);
  }, [selected]);

  return (
    <CustomSelectView
      options={options}
      selected={{
        value: selected,
        setter: setSelected,
      }}
    />
  );
}
