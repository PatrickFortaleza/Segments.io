import { Action } from "../../models/action";
import { AttributeTypeMeta, AttributeTypes } from "../../models/attributes";
import { User } from "../../models/user";
import moment, { Moment } from "moment";

const inititalState = <AttributeTypes>{
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
      let newAttributeMeta = { ...state };

      Object.entries(newAttributeMeta).forEach(([metaKey, metaData]) => {
        let { variables } = metaData;
        let allOptions = <Array<any> | Set<any>>[];

        if (!variables) return;

        Object.keys(variables).forEach((v) => {
          allOptions = users.map((user: User) => user[v as keyof User]);
          allOptions = new Set(allOptions);
          allOptions = Array.from(allOptions);

          switch (metaKey) {
            case "numeric":
              allOptions = [Math.min(...allOptions), Math.max(...allOptions)];
              break;
            case "boolean":
              allOptions = [true, false];
              break;
            case "datetime":
              let datesMoment = allOptions.map((date) => moment(date)),
                minDate: Moment | string = moment.min(datesMoment),
                maxDate: Moment | string = moment.max(datesMoment);

              minDate = minDate.format("YYYY-MM-DD");
              maxDate = maxDate.format("YYYY-MM-DD");

              allOptions = [minDate, maxDate];
              break;
            default:
              break;
          }
          newAttributeMeta[metaKey as keyof AttributeTypes].variables[v] = [
            ...newAttributeMeta[metaKey as keyof AttributeTypes].variables[v],
            ...allOptions,
          ];
        });
      });

      return { ...newAttributeMeta };
    }
  }
  return state;
};
export default attributeReducer;
