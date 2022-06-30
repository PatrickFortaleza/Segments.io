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
import { Condition } from "../../../models/condition";

export default function BucketController({ bucket }: { bucket: Bucket }) {
  const [bucketConditions, setBucketConditions] = useState<Array<Condition>>(
    []
  );

  const conditions = useSelector((state: any) => state.conditions);

  useEffect(() => {
    let bucketConditions_: Condition[] = Object.values(conditions).filter(
      (condition: any): condition is Condition =>
        condition.bucket_id === bucket.id
    );
    setBucketConditions(bucketConditions_);
  }, [conditions]);

  return <BucketView bucketConditions={bucketConditions} />;
}
