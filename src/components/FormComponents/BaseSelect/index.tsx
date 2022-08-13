import React, { useEffect, useState } from "react";
import { SetterGetter } from "../../../models";
import CustomSelectView from "./view";

export default function BaseSelectController({
  options,
  selected,
  placeholder,
  disabled,
}: {
  options: Array<string>;
  selected: SetterGetter;
  placeholder: string;
  disabled: boolean;
}) {
  return (
    <CustomSelectView
      options={options}
      selected={selected}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
