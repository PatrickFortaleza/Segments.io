import { useEffect } from "react";
import SummaryView from "./view";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../redux/actions/users";

export default function SummaryController() {
  const denormalized = useSelector((state: any) => state.entities.denormalized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applyFilters({ rules: denormalized }));
  }, [denormalized]);

  return <SummaryView />;
}
