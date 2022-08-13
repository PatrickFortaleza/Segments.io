import { useEffect, useState } from "react";
import CustomSelectView from "./view";

export default function CustomSelectController({
  options,
  setter,
  defaultValue,
}: {
  options: Array<string>;
  setter: (value: string) => void;
  defaultValue: string | number | boolean | undefined;
}) {
  const [selected, setSelected] = useState<string>(
    typeof defaultValue === "string" && defaultValue ? defaultValue : ""
  );

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
