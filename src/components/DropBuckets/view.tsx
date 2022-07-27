import { BucketHashmap } from "../../models/bucket";
import Bucket from "./Bucket";
import { Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/entity";
import Tooltip from "../Tooltip/Tooltip";

export default function DropBucketsView({
  buckets,
}: {
  buckets: BucketHashmap;
}) {
  const dispatch = useDispatch();

  return (
    <div className="buckets__container">
      {buckets &&
        Object.values(buckets).map((bucket) => (
          <div key={bucket.id} style={{ height: "100%" }}>
            <div className="buckets__container__outer">
              <h3>
                {bucket.type} <Tooltip message={"test"} />
              </h3>
              <div className="buckets__container__inner">
                <Bucket bucket={bucket} />
                <button
                  className="add"
                  onClick={() =>
                    dispatch(
                      addCondition({
                        bucketId: bucket.id,
                      })
                    )
                  }
                >
                  + Add new condition
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
