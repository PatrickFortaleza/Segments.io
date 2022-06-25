import React, { useEffect, useState } from "react";
import CustomSelectView from "./view";

export default function CustomSelectController({
  options,
  setter,
}: {
  options: Array<string>;
  setter: ({ value, flag }: { value: string; flag: string }) => void;
}) {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    setter({
      value: selected,
      flag: "value",
    });
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
