import moment from "moment";
import { RectCoordinates } from "../models/positioning";

export const snakeCaseToTitleCase = (string: string): string => {
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

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
