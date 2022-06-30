import React, { useRef, useEffect, useState } from "react";
import { Condition } from "../../../models/condition";
import ConditionView from "./view";

export default function ConditionController({
  condition,
}: {
  condition: Condition;
}) {
  const [editingLabel, setEditingLabel] = useState<boolean>(false);
  const bucketRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLInputElement | null>(null);
  const conditionOperators = ["and", "or"];

  useEffect(() => {
    if (editingLabel && labelRef?.current) labelRef.current.focus();
  }, [editingLabel]);

  return (
    <ConditionView
      condition={condition}
      conditionOperators={conditionOperators}
      editingLabel={{
        value: editingLabel,
        setter: setEditingLabel,
      }}
      bucketRef={bucketRef}
      labelRef={labelRef}
    />
  );
}
