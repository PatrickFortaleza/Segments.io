import { useState, useEffect } from "react";
import DropBucketsView from "./view";
import { useSelector, useDispatch } from "react-redux";
import { initializeAttributeMeta } from "../../redux/actions/attribute";

export default function DropBucketsController() {
  const [usersPopulated, setUsersPopulated] = useState<Boolean>(false);

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
