import React, { useEffect, useState } from "react";
import CustomSelectView from "./view";

export default function CustomSelectController({
  options,
  setter,
}: {
  options: Array<string>;
  setter: (value: string) => void;
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
    />
  );
}
