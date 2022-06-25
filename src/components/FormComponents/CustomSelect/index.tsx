import React from "react";
import CustomSelectView from "./view";

export default function CustomSelectController({
  options,
}: {
  options: Array<string>;
}) {
  return <CustomSelectView options={options} />;
}
