import React, { useEffect, useState } from "react";
import CustomSelectView from "./view";

export default function BaseSelectController({
  options,
  setter,
  placeholder,
}: {
  options: Array<string>;
  setter: (value: string) => void;
  placeholder: string;
}) {
  const [selected, setSelected] = useState<string>("");

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
      placeholder={placeholder}
    />
  );
}
