import { Condition } from "../../../models/condition";
import { default as ConditionItem } from "../Condition";
import { Icon } from "semantic-ui-react";
import { LegacyRef } from "react";

export default function BucketView({
  bucketConditions,
  anchorRef,
}: {
  bucketConditions: Array<Condition>;
  anchorRef: LegacyRef<HTMLDivElement> | undefined;
}) {
  return (
    <>
      {bucketConditions.length > 0 ? (
        bucketConditions.map((condition) => (
          <ConditionItem
            key={condition.id}
            condition={condition}
            hasConditions={bucketConditions.length > 1}
          />
        ))
      ) : (
        <p className="empty">
          <Icon name="warning sign" /> No existing conditions for this bucket
        </p>
      )}

      <div ref={anchorRef} />
    </>
  );
}
