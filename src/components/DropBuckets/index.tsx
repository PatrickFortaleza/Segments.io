import React, { useState, useEffect } from "react";
import DropBucketsView from "./view";
import { useSelector, useDispatch } from "react-redux";
import { addCondition } from "../../redux/actions/bucket";
import { BucketContainer } from "../../models/bucket";

export default function DropBucketsController() {
  const buckets = useSelector((state: any) => state.bucketReducer.buckets);

  const dispatch = useDispatch();

  const addToBucket = ({
    bucketType,
  }: {
    bucketType: keyof BucketContainer;
  }) => {
    dispatch(
      addCondition({
        bucketType: bucketType,
      })
    );
  };

  return <DropBucketsView buckets={buckets} addToBucket={addToBucket} />;
}

const attributeMetadata = {
  alphabetical: {
    controlOptions: ["starts_with", "ends_width", "includes", "excludes"],
    variables: {},
  },
  select: {
    controlOptions: ["equal_to", "not_equal_to"],
    variables: {
      // possible unique options for each variable
      gender: [],
      occupation_industry: [],
      location: [],
      primary_language: [],
      family_status: [],
    },
  },
  numeric: {
    controlOptions: ["greater_than", "less_than", "equal_to", "not_equal_to"],
    variables: {
      // sorted unique array of 2 min-max numeric values
      annual_income: [],
      age: [],
      average_annual_spending: [],
      current_total_debt: [],
    },
  },
  datetime: {
    controlOptions: ["greater_than", "less_than", "equal_to", "not_equal_to"],
    variables: {
      // sorted unique array of 2 min-max numberic values
      birthday: [],
    },
  },
  boolean: {
    controlOptions: ["is_true", "is_false"],
    variables: {
      owns_home: [true, false],
      owns_vehicle: [true, false],
    },
  },
};
