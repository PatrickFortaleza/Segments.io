import { BucketHashmap } from "../../models/bucket";
import Bucket from "./Bucket";
import { Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/condition";

export default function DropBucketsView({
  buckets,
}: {
  buckets: BucketHashmap;
}) {
  const dispatch = useDispatch();
  return (
    <div className="buckets__container">
      {Object.values(buckets).map((bucket) => (
        <div key={bucket.id}>
          <div className="buckets__container__outer">
            <h3>
              {bucket.type} <Icon name="info circle" />
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
