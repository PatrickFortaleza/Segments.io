import React, { useRef, useEffect, useState } from "react";
import BucketView from "./view";
import { Bucket, BucketContainer } from "../../../models/bucket";
import { useSelector, useDispatch } from "react-redux";
import { RectCoordinates } from "../../../models/positioning";
import { calculateCoordinates } from "../../../utility";
import {
  evaluateInZone,
  updateLabel,
  updateConditionLogic,
  removeCondition,
} from "../../../redux/actions/bucket";

export default function BucketController({
  bucket,
  bucketKey,
  bucketIndex,
}: {
  bucket: Bucket;
  bucketKey: keyof BucketContainer;
  bucketIndex: number;
}) {
  const [itemInZone, setItemInZone] = useState<boolean>(false);
  const [conditionLabel, setConditionLabel] = useState<string>(bucket.label);
  const [editingLabel, setEditingLabel] = useState<boolean>(false);
  const [conditionLogic, setConditionLogic] = useState<string>("and");

  const dispatch = useDispatch();
  const bucketRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLInputElement | null>(null);
  const itemState = useSelector((state: any) => state.dragReducer);
  let { itemRectCoords } = itemState;

  const calculateInDropzone = ({
    targetEl,
    coords,
  }: {
    targetEl: HTMLDivElement;
    coords: RectCoordinates;
  }) => {
    const offset = 15;
    let tRect: RectCoordinates = calculateCoordinates({ el: targetEl });
    let { top, right, bottom, left } = coords;

    if (
      bottom < tRect.bottom + offset &&
      left > tRect.left - offset &&
      top > tRect.top - offset &&
      right < tRect.right + offset
    )
      return true;
    return false;
  };

  const checkInDropzone = () => {
    if (!bucketRef.current) return;
    let { current: bucketEl } = bucketRef;

    const inZone = calculateInDropzone({
      targetEl: bucketEl,
      coords: itemRectCoords,
    });

    setItemInZone(inZone);
  };

  const removeFromBucket = () => {
    dispatch(
      removeCondition({
        bucketType: bucketKey,
        bucketId: bucket.id,
      })
    );
  };

  useEffect(() => {
    checkInDropzone();
  }, [itemRectCoords]);

  useEffect(() => {
    dispatch(
      evaluateInZone({
        bucketType: bucketKey,
        bucketIndex: bucketIndex,
        inZone: itemInZone,
      })
    );
  }, [itemInZone]);

  useEffect(() => {
    if (editingLabel && labelRef?.current) labelRef.current.focus();
  }, [editingLabel]);

  useEffect(() => {
    dispatch(
      updateLabel({
        bucketType: bucketKey,
        bucketIndex: bucketIndex,
        label: conditionLabel,
      })
    );
  }, [conditionLabel]);

  useEffect(() => {
    dispatch(
      updateConditionLogic({
        bucketType: bucketKey,
        bucketIndex: bucketIndex,
        conditionLogic: conditionLogic,
      })
    );
  }, [conditionLogic]);

  return (
    <BucketView
      bucket={bucket}
      bucketKey={bucketKey}
      bucketRef={bucketRef}
      bucketIndex={bucketIndex}
      labelRef={labelRef}
      inZone={itemInZone}
      remove={removeFromBucket}
      editingLabel={{
        value: editingLabel,
        setter: setEditingLabel,
      }}
      conditionLabel={{
        value: conditionLabel,
        setter: setConditionLabel,
      }}
      conditionLogic={{
        value: conditionLogic,
        setter: setConditionLogic,
      }}
    />
  );
}
