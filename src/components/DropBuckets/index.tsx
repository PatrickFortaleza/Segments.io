import DropBucketsView from "./view";
import { useSelector } from "react-redux";

export default function DropBucketsController() {
  const { buckets } = useSelector((state: any) => state.entities);

  return <DropBucketsView buckets={buckets} />;
}
