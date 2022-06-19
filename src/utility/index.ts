export const snakeCaseToTitleCase = (string: string): string => {
  return string
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_
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
