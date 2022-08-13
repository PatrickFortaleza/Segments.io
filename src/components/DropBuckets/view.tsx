import { useMemo, createRef } from "react";
import {
  Bucket as BucketType,
  BucketHashmap,
  BucketRefs,
} from "../../models/bucket";
import Bucket from "./Bucket";
import { useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/entity";
import Tooltip from "../Tooltip";
import { Icon } from "semantic-ui-react";

interface bucketTypes {
  includes: Array<BucketType>;
  excludes: Array<BucketType>;
}

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

  const toolTips = {
    includes:
      "Add conditions below that will INCLUDE your target individuals into your segment.",
    excludes:
      "Add conditions below that will EXCLUDE your target individuals from your segment.",
  };

  return (
    <div className="buckets__container">
      <span className="buckets__container__title">
        <Icon style={{ color: "var(--highlight-secondary-1)" }} name="cogs" />{" "}
        <h3 style={{ display: "inline-block" }}>Condition Builder</h3>
      </span>
      {buckets &&
        Object.values(buckets).map((bucket) => (
          <div key={bucket.id} className="buckets__container__outer">
            <h3>
              {bucket.type}{" "}
              <Tooltip
                message={toolTips[bucket.type as keyof bucketTypes]}
                minWidth={250}
                variant={"info"}
              />
            </h3>
            <div className="buckets__container__inner">
              <Bucket bucket={bucket} anchorRef={anchorRefs[`${bucket.id}`]} />
            </div>
            <button
              className="add__condition base"
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
        ))}
    </div>
  );
}
