import moment from "moment";
import { RectCoordinates } from "../models/positioning";
import { dRule } from "../models/rule";

export const snakeCaseToTitleCase = (string: string): string => {
  if (typeof string !== "string") return "";
  return string
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_
};

export const toTitleCase = (string: string) => {
  return string.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const calculateCoordinates = ({
  el,
}: {
  el: HTMLElement | HTMLDivElement;
}) => {
  let rect = el.getBoundingClientRect(),
    coords = {
      top: rect.top + window.pageYOffset,
      right: rect.right + window.pageXOffset,
      bottom: rect.bottom + window.pageYOffset,
      left: rect.left + window.pageXOffset,
    };

  return coords;
};

export const calculateInZone = ({
  targetEl,
  coords,
}: {
  targetEl: HTMLDivElement;
  coords: RectCoordinates;
}) => {
  const offset = 15;
  let tRect: RectCoordinates = calculateCoordinates({ el: targetEl });
  let { top, right, bottom, left } = coords;

  if (
    bottom < tRect.bottom + offset &&
    left > tRect.left - offset &&
    top > tRect.top - offset &&
    right < tRect.right + offset
  )
    return true;
  return false;
};

export const isDate = (string: string) => {
  let date = moment(string);
  return date.isValid();
};

export const regexTestDateStr = (string: string) => {
  if (typeof string !== "string") return false;
  return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(string);
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const checkRules = ({
  operator,
  rulesArray,
}: {
  operator: string;
  rulesArray: Array<boolean>;
}) => {
  switch (operator) {
    case "and":
      // if the condition is "and" we must check if every rule evaluates true
      return rulesArray.every((rule) => rule === true);
    case "or":
      // if the condition is "or" we only check if a single rule evaluates true
      return rulesArray.some((rule) => rule === true);
    default:
      return false;
  }
};

export const computeEquation = ({
  equation,
  attribute,
  value,
}: {
  equation: string;
  attribute: string | number | boolean;
  value: string | number | boolean;
}) => {
  if (!equation || !attribute || !value) return false;

  try {
    switch (equation) {
      case "ends_with": {
        if (typeof attribute === "string" && typeof value === "string")
          return attribute.toLowerCase().endsWith(`${value.toLowerCase()}`);

        return false;
      }
      case "starts_with": {
        if (typeof attribute === "string" && typeof value === "string")
          return attribute.toLowerCase().startsWith(`${value.toLowerCase()}`);

        return false;
      }
      case "includes": {
        if (typeof attribute !== "string" || typeof value !== "string")
          return false;
        let regex = new RegExp(`${value}`, "gi");
        return regex.test(attribute);
      }
      case "excludes": {
        if (typeof attribute !== "string" || typeof value !== "string")
          return false;

        let regex = new RegExp(`${value}`, "gi");
        return !regex.test(attribute);
      }
      case "greater_than": {
        if (
          !["string, number"].includes(typeof attribute) ||
          !["string, number"].includes(typeof value)
        )
          return false;

        if (
          typeof attribute === "string" &&
          typeof value === "string" &&
          regexTestDateStr(attribute) &&
          regexTestDateStr(value)
        )
          return new Date(attribute) > new Date(value);

        return attribute > +value;
      }
      case "less_than": {
        if (
          !["string, number"].includes(typeof attribute) ||
          !["string, number"].includes(typeof value)
        )
          return false;

        if (
          typeof attribute === "string" &&
          typeof value === "string" &&
          regexTestDateStr(attribute) &&
          regexTestDateStr(value)
        )
          return new Date(attribute) < new Date(value);

        return attribute < +value;
      }
      case "equal_to": {
        if (typeof attribute === "string" && typeof value === "string")
          return attribute.toLowerCase() === value.toLowerCase();

        if (
          typeof attribute === "string" &&
          typeof value === "string" &&
          regexTestDateStr(attribute) &&
          regexTestDateStr(value)
        )
          return new Date(attribute).getTime() === new Date(value).getTime();

        return attribute === value;
      }
      case "not_equal_to": {
        if (typeof attribute === "string" && typeof value === "string")
          return attribute.toLowerCase() !== value.toLowerCase();

        if (
          typeof attribute === "string" &&
          typeof value === "string" &&
          regexTestDateStr(attribute) &&
          regexTestDateStr(value)
        )
          return new Date(attribute).getTime() !== new Date(value).getTime();

        return attribute !== value;
      }
      case "is_false":
      case "is_true": {
        return attribute === value;
      }
      default:
        return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
