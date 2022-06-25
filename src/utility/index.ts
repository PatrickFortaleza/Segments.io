import moment from "moment";

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

export const isDate = (string: string) => {
  let date = moment(string);
  return date.isValid();
};
