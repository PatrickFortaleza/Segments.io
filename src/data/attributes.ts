export const attributes = <Array<string>>[
  "first_name",
  "last_name",
  "email_address",
  "gender",
  "annual_income",
  "occupation_industry",
  "location",
  "birthday",
  "age",
  "primary_language",
  "family_status",
  "average_annual_spending",
  "current_total_debt",
  "owns_home",
  "owns_vehicle",
];

export const returnAttributeType = ({
  attribute,
}: {
  attribute: string;
}): string | null => {
  switch (attribute) {
    case "first_name":
    case "last_name":
    case "email_address":
      return "alphabetical";
    case "gender":
    case "occupation_industry":
    case "location":
    case "family_status":
    case "primary_language":
      return "select";
    case "birthday":
      return "datetime";
    case "annual_income":
    case "age":
    case "average_annual_spending":
    case "current_total_debt":
      return "numeric";
    case "owns_home":
    case "owns_vehicle":
      return "boolean";
    default:
      return null;
  }
};
