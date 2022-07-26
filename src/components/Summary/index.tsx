import { useEffect, useMemo } from "react";
import SummaryView from "./view";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../redux/actions/users";

export default function SummaryController() {
  const dispatch = useDispatch();
  const denormalized = useSelector((state: any) => state.entities.denormalized);
  const { users, filteredUsers, segmentTitle, segmentDescription } =
    useSelector((state: any) => state.users);

  const totalUsers: number = useMemo(() => users.length || 0, [users]);
  const selectedUsers: number = useMemo(
    () => filteredUsers.length || 0,
    [filteredUsers]
  );

  useEffect(() => {
    dispatch(applyFilters({ rules: denormalized }));
  }, [denormalized]);

  return (
    <SummaryView
      chartValues={{
        max: totalUsers,
        segment: selectedUsers,
      }}
      segmentTitle={segmentTitle}
      segmentDescription={segmentDescription}
    />
  );
}
