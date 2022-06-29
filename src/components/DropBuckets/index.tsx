import React, { useState, useEffect } from "react";
import DropBucketsView from "./view";
import { useSelector, useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/bucket";
import { BucketContainer } from "../../models/bucket";
import { initializeAttributeMeta } from "../../redux/actions/attribute";

export default function DropBucketsController() {
  const [usersPopulated, setUsersPopulated] = useState(false);
  const buckets = useSelector((state: any) => state.buckets.buckets);
  const users = useSelector((state: any) => state.users.users);

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

  useEffect(() => {
    if (Array.isArray(users) && users.length > 0 && usersPopulated === false) {
      dispatch(initializeAttributeMeta({ users: users }));
      setUsersPopulated(true);
    }
  }, [users]);

  return <DropBucketsView buckets={buckets} addToBucket={addToBucket} />;
}
