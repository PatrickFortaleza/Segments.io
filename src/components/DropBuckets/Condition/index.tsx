import { useRef, useEffect, useState } from "react";
import { Condition } from "../../../models/condition";
import ConditionView from "./view";
import { useSelector, useDispatch } from "react-redux";
import { calculateInZone } from "../../../utility";
import { changeInZone } from "../../../redux/actions/entity";
import { Rule } from "../../../models/rule";

export default function ConditionController({
  condition,
}: {
  condition: Condition;
}) {
  const [editingLabel, setEditingLabel] = useState<boolean>(false);
  const [conditionRules, setConditionRules] = useState<Array<Rule>>([]);

  const { rules } = useSelector((state: any) => state.entities);
  const { itemRectCoords } = useSelector((state: any) => state.drag);
  const dispatch = useDispatch();

  const dropRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLInputElement | null>(null);
  const conditionOperators = ["and", "or"];

  const checkInDropzone = () => {
    if (!dropRef.current) return;
    let { current: dropEl } = dropRef;
    let { item_in_zone } = condition;

    let inZone = calculateInZone({
      targetEl: dropEl,
      coords: itemRectCoords,
    });

    if (item_in_zone !== inZone)
      dispatch(
        changeInZone({
          conditionId: condition.id,
          inZone: inZone,
        })
      );
  };

  useEffect(() => {
    if (editingLabel && labelRef?.current) labelRef.current.focus();
  }, [editingLabel]);

  useEffect(() => {
    checkInDropzone();
  }, [itemRectCoords]);

  useEffect(() => {
    let conditionRules_: Array<Rule> = Object.values(rules).filter(
      (rule: any): rule is Rule => rule.condition_id === condition.id
    );
    setConditionRules(conditionRules_);
  }, [rules]);

  return (
    <ConditionView
      condition={condition}
      conditionOperators={conditionOperators}
      editingLabel={{
        value: editingLabel,
        setter: setEditingLabel,
      }}
      dropRef={dropRef}
      labelRef={labelRef}
      conditionRules={conditionRules}
    />
  );
}
