import { useMemo, useRef, createRef } from "react";
import { BucketHashmap, BucketRefs } from "../../models/bucket";
import Bucket from "./Bucket";
import { useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/entity";
import Tooltip from "../Tooltip";

export default function DropBucketsView({
  buckets,
}: {
  buckets: BucketHashmap;
}) {
  const dispatch = useDispatch();
  const anchorRefs = useMemo(() => constructAnchorRefs(buckets), [buckets]);

  function constructAnchorRefs(buckets: BucketHashmap) {
    let refs: BucketRefs = {};
    if (!buckets) return refs;

    Object.keys(buckets).forEach((bucket) => {
      refs[`${bucket}`] = createRef();
    });

    return refs;
  }

  return (
    <div className="buckets__container">
      {buckets &&
        Object.values(buckets).map((bucket) => (
          <div key={bucket.id} style={{ height: "100%" }}>
            <div className="buckets__container__outer">
              <h3>
                {bucket.type} <Tooltip message={"test"} variant={"info"} />
              </h3>
              <div className="buckets__container__inner">
                <Bucket
                  bucket={bucket}
                  anchorRef={anchorRefs[`${bucket.id}`]}
                />
              </div>
              <button
                className="add__condition"
                onClick={() => {
                  dispatch(
                    addCondition({
                      bucketId: bucket.id,
                    })
                  );

                  setTimeout(() => {
                    let anchor = anchorRefs[`${bucket.id}`];
                    if (anchor?.current)
                      anchor.current.scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
              >
                + Add new condition
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
