import React, { useState, useEffect } from "react";
import DropBucketsView from "./view";
import { useSelector, useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/bucket";
import { BucketContainer } from "../../models/bucket";

export default function DropBucketsController() {
  const buckets = useSelector((state: any) => state.bucketReducer.buckets);
  // const [bucketState, setBucketState] = useState(buckets);

  const dispatch = useDispatch();

  const addToBucket = ({
    bucketType,
  }: {
    bucketType: keyof BucketContainer;
  }) => {
    dispatch(
      addCondition({
        bucketType: bucketType,
      })
    );
  };

  return <DropBucketsView buckets={buckets} addToBucket={addToBucket} />;
}
