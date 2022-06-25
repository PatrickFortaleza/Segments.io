import React, { useState } from "react";
import { AttributeWithId } from "../../../models/attributes";
import RuleView from "./view";
import { useSelector, useDispatch } from "react-redux";
import { Bucket, BucketContainer } from "../../../models/bucket";
import { deleteRuleFromBucket } from "../../../redux/actions/bucket";

interface RuleLogic {
  condition: string;
  value: string | number | boolean | undefined;
}

export default function RuleController({
  bucketIndex,
  bucketKey,
  rule,
  conditionLogic,
}: {
  bucketIndex: number;
  bucketKey: keyof BucketContainer;
  rule: AttributeWithId;
  conditionLogic: string | undefined;
}) {
  const [ruleLogic, setRuleLogic] = useState<RuleLogic>({
    condition: "",
    value: undefined,
  });

  const dispatch = useDispatch();
  const ruleMetadata = useSelector(
    (state: any) => state.attributeReducer[rule.type]
  );

  const updateRuleLogic = ({
    condition,
    value,
    flag,
  }: {
    condition: string;
    value: string | boolean | undefined;
    flag: string;
  }) => {
    if (flag === "condition") {
      if (rule.type === "boolean") {
        condition === "is_true"
          ? setRuleLogic({ value: true, condition: condition })
          : setRuleLogic({ value: false, condition: condition });
      } else {
        setRuleLogic({ ...ruleLogic, condition: condition });
      }
    }

    if (flag === "value") setRuleLogic({ ...ruleLogic, value: value });
  };

  const handleDelete = () => {
    dispatch(
      deleteRuleFromBucket({
        bucketType: bucketKey,
        bucketIndex: bucketIndex,
        ruleId: rule.id,
      })
    );
  };

  return (
    <RuleView
      rule={rule}
      conditionLogic={conditionLogic}
      ruleMetadata={ruleMetadata}
      handleDelete={handleDelete}
      ruleLogic={{
        value: ruleLogic,
        setter: updateRuleLogic,
      }}
    />
  );
}
