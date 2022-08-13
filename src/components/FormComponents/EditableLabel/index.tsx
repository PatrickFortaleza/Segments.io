import { useState, useEffect, useRef } from "react";
import EditableLabelView from "./view";

export default function EditableLabelController({
  label,
  emitValue,
}: {
  label: string;
  emitValue: (value: string) => void;
}) {
  const [editingLabel, setEditingLabel] = useState<boolean>(false);
  const [labelValue, setLabelValue] = useState<string>(label);

  const labelRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingLabel && labelRef?.current) labelRef.current.focus();
  }, [editingLabel]);

  useEffect(() => {
    emitValue(labelValue);
  }, [labelValue]);

  return (
    <EditableLabelView
      editingLabel={{
        value: editingLabel,
        setter: setEditingLabel,
      }}
      label={{
        value: labelValue,
        setter: setLabelValue,
      }}
      labelRef={labelRef}
    />
  );
}
