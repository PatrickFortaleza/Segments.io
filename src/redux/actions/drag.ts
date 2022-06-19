import { RectCoordinates } from "../../models/positioning";

export const itemDragging = ({
  bool,
  itemId,
  itemRectCoords,
}: {
  bool: boolean;
  itemId: string;
  itemRectCoords: RectCoordinates;
}) => {
  return {
    type: "item_dragging",
    payload: {
      isDragging: bool,
      itemId: itemId,
      itemRectCoords,
    },
  };
};

export const unsetItemDragging = () => {
  return {
    type: "item_dragging_unset",
    payload: null,
  };
};
