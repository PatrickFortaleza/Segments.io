import React, { useState, useEffect } from "react";
import DropBucketsView from "./view";
import { useSelector, useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/bucket";
import { initializeAttributeMeta } from "../../redux/actions/attribute";
import { Bucket } from "../../models/bucket";

export default function DropBucketsController() {
  const [usersPopulated, setUsersPopulated] = useState<Boolean>(false);
  const [entities, setEntities] = useState({}); // type this

  const buckets = useSelector((state: any) => state.buckets);

  const users = useSelector((state: any) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(users) && users.length > 0 && usersPopulated === false) {
      dispatch(initializeAttributeMeta({ users: users }));
      setUsersPopulated(true);
    }
  }, [users]);

  return <DropBucketsView buckets={buckets} />;
}
