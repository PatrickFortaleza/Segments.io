import { Action } from "../../models/action";
import { AttributeTypeMeta } from "../../models/attributes";

const inititalState = {
  alphabetical: <AttributeTypeMeta>{
    controlOptions: <Array<string>>[
      "starts_with",
      "ends_width",
      "includes",
      "excludes",
    ],
    variables: <undefined>undefined,
  },
  select: <AttributeTypeMeta>{
    controlOptions: <Array<string>>["equal_to", "not_equal_to"],
    variables: {
      // possible unique options for each variable
      gender: <Array<string>>[],
      occupation_industry: <Array<string>>[],
      location: <Array<string>>[],
      primary_language: <Array<string>>[],
      family_status: <Array<string>>[],
    },
  },
  numeric: <AttributeTypeMeta>{
    controlOptions: <Array<string>>[
      "greater_than",
      "less_than",
      "equal_to",
      "not_equal_to",
    ],
    variables: {
      // sorted unique array of 2 min-max numeric values
      annual_income: <Array<number>>[],
      age: <Array<number>>[],
      average_annual_spending: <Array<number>>[],
      current_total_debt: <Array<number>>[],
    },
  },
  datetime: <AttributeTypeMeta>{
    controlOptions: <Array<string>>[
      "greater_than",
      "less_than",
      "equal_to",
      "not_equal_to",
    ],
    variables: {
      // sorted unique array of 2 min-max numberic values
      birthday: <Array<string>>[],
    },
  },
  boolean: <AttributeTypeMeta>{
    controlOptions: <Array<string>>["is_true", "is_false"],
    variables: {
      owns_home: <Array<boolean>>[true, false],
      owns_vehicle: <Array<boolean>>[true, false],
    },
  },
};

const attributeReducer = (state = inititalState, action: Action) => {
  switch (action.type) {
    case "initialize_attribute_meta": {
      let { users } = action.payload;

      console.log(users);

      return { ...state };
    }
  }
  return state;
};
export default attributeReducer;
