export const evaluateDragging = ({ bool }: { bool: boolean }) => {
  return {
    type: "evaluate_dragging",
    payload: bool,
  };
};
