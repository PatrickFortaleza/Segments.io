import React, { useRef, useEffect, useState } from "react";
import BucketView from "./view";
import { Bucket } from "../../../models/bucket";
import { useSelector } from "react-redux";
import { RectCoordinates } from "../../../models/positioning";
import { calculateCoordinates } from "../../../utility";

export default function BucketController({
  bucket,
  bucketKey,
}: {
  bucket: Bucket;
  bucketKey: string;
}) {
  const [itemInZone, setItemInZone] = useState(false);

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

  return (
    <BucketView bucket={bucket} bucketRef={bucketRef} inZone={itemInZone} />
  );
}
