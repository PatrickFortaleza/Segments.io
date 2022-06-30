import { Condition } from "../../../models/condition";
import { default as ConditionItem } from "../Condition";
import { Icon } from "semantic-ui-react";

export default function BucketView({
  bucketConditions,
}: {
  bucketConditions: Array<Condition>;
}) {
  return (
    <>
      {bucketConditions.length > 0 ? (
        bucketConditions.map((condition) => (
          <ConditionItem key={condition.id} condition={condition} />
        ))
      ) : (
        <p className="empty">
          <Icon name="warning sign" /> No existing conditions for this bucket
        </p>
      )}
    </>
  );
}
