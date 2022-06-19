import React, { useRef, useEffect, useState } from "react";
import BucketView from "./view";
import { Bucket, BucketContainer } from "../../../models/bucket";
import { useSelector, useDispatch } from "react-redux";
import { RectCoordinates } from "../../../models/positioning";
import { calculateCoordinates } from "../../../utility";
import { evaluateInZone } from "../../../redux/actions/bucket";

export default function BucketController({
  bucket,
  bucketKey,
  bucketIndex,
}: {
  bucket: Bucket;
  bucketKey: keyof BucketContainer;
  bucketIndex: number;
}) {
  const [itemInZone, setItemInZone] = useState(false);

  const dispatch = useDispatch();
  const bucketRef = useRef<HTMLDivElement | null>(null);
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
    let tRect = calculateCoordinates({ el: targetEl });
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

  useEffect(() => {
    checkInDropzone();
  }, [itemRectCoords]);

  useEffect(() => {
    dispatch(
      evaluateInZone({
        bucketId: bucket.id,
        bucketType: bucketKey,
        bucketIndex: bucketIndex,
        inZone: itemInZone,
      })
    );
  }, [itemInZone]);

  return (
    <BucketView bucket={bucket} bucketRef={bucketRef} inZone={itemInZone} />
  );
}
