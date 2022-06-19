import React from "react";
import DropBucketsView from "./view";
import { useSelector } from "react-redux";

export default function DropBucketsController() {
  const buckets = useSelector((state: any) => state.bucketReducer.buckets);

  return <DropBucketsView buckets={buckets} />;
}
